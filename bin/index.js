#!/usr/bin/env node

// Necessary imports
import { program } from "commander";
import puppeteer from 'puppeteer';
import requestCLSMetrics from '../library/features/cls.js';
import requestINPMetrics from '../library/features/inp.js';
import requestTBTMetrics from '../library/features/tbt.js';
import requestLCPMetrics from '../library/features/lcp.js';
import wsConnection from '../library/features/socket.js';
import report from '../library/features/report.js';
import exit from "../library/features/exit.js";
import packageJson from '../package.json' assert {type: "json"}; //change assert to with & update node
import fs from 'fs';
import os from "os";
import path from "path";

let pathToExtension;
let testingURL;
let profile_dir_extension = "";
let profile_dir_normal = "";
const normalMetricsDict = {
  cls: 0,
  lcp: 0,
  inp: -1,
  tbt: 0
};
const extensionMetricsDict = {
  cls: 0,
  lcp: 0,
  inp: -1,
  tbt: 0
};
const metricToFunction = {
  'cls': requestCLSMetrics,
  'lcp': requestLCPMetrics,
  'inp': requestINPMetrics,
  'tbt': requestTBTMetrics
}

const metricToPrint = {
  'cls': "Cumulative Layout Shift (CLS): ",
  'lcp': "Largest Contentful Paint (LCP): ",
  'inp': "Interaction to Next Paint (INP): ",
  'tbt': "Total Blocking Time (TBT): "
}
let currPageNormalURL;
let currPageExtensionURL;
let extension_args = [];
let normal_args = [];

// Establishing basic CLI functionality with Commander
program
  .version(packageJson.version)
  .description("A CLI (Command Line Interface) that lets you test the performance effect on a webpage based by a specified extension. Performance discrepancies are tracked mainly by Core Web Vitals and other relevant metrics (use -h to see all options).") // include a more detailed description on what this does in terms of tracking web performance , etc.
  .requiredOption("-u, --url <type>", "Add your testing URL") // require url and extension // handle when url is not valid URL.parsewors
  .requiredOption("-e, --extension <type>", "Add your extension filepath")
  .option("-o, --extension-only", "Only test Chrome with the extension", false)
  .option("-l, --lcp", "Activate LCP Metric", false)
  .option("-c, --cls", "Activate CLS Metric", false)
  .option("-i, --inp", "Activate INP Metric", false)
  .option("-t, --tbt", "Activate TBT Metric", false)
  .option("-a, --all-metrics", "Activate all metric tracking", false)
  .option("-r, --resources", "Activate resource (Memory & CPU Consumption) tracking", false) //specify what resources is
  .option("-p, --profile <type>", "Configure custom Chrome Profile")
  .option("-n, --num-runs <number>", "Configure how many tests are to be done", 1)
  .addHelpText('after', `
    
    Example usage (all available metrics are tracked):
      $ perf --extension=/path/to/extensionfile --url=https://www.google.com -a
      
    `)
  .action((options) => {
    if (options.allMetrics) {
      for (let key in metricToFunction) {
        options[key] = true;
      }
      options.resources = true;
    }
  });

// Clean exit (final report) when CTRL+C is pressed
process.on('SIGINT', (code) => {
  exit(normalMetricsDict, extensionMetricsDict, metricToPrint, options);
});

// Parse and store the arguments passed in
program.parse(process.argv);
const options = program.opts();

// Brief report on options selected by user
report(options);

// Check if extension path exists and is a directory
if (fs.existsSync(options.extension)) {
  if (fs.lstatSync(options.extension).isDirectory()) {
    pathToExtension = options.extension;
    extension_args.push(`--disable-extensions-except=${pathToExtension}`);
    extension_args.push(`--load-extension=${pathToExtension}`);
  } else {
    console.log("This is not a valid directory. You may have to download this extension as a .zip and extract the extension directory.");
  }
} else {
  console.log("This is not a valid path.")
} 

// Check if profile path (if specified) exists
if (options.profile != undefined && fs.existsSync(options.profile)) {
  // Create 2 temp directories for Chrome profile
  let tempDir = `${os.tmpdir()}${path.sep}Chrome Profiles`;
  profile_dir_extension = fs.mkdtempSync(tempDir);
  fs.cpSync(options.profile, profile_dir_extension, {recursive: true});
  profile_dir_normal = fs.mkdtempSync(tempDir);
  fs.cpSync(options.profile, profile_dir_normal, {recursive: true});
  extension_args.push(`--user-data-dir=${profile_dir_extension}`);
  normal_args.push(`--user-data-dir=${profile_dir_normal}`);
}

// Store URL to be tested
testingURL = options.url;

// Function to handle testing of each indicated metric
async function coreWebVitalsTest(page, dict) {

  await page.exposeFunction('print', (msg) => console.log(msg));
  //iterate through the options rather than hardcoding the functions
  for (let key in options) {
    if (metricToFunction[key] != undefined && options[key] == true) {
      await metricToFunction[key](page, dict);
    }
  }
}

// Set up browsers with and without extension
const browserExtension = await puppeteer.launch({
product: 'chrome',
headless: false,
args: extension_args
});

// Go to specified URL
const pageExtension = await browserExtension.newPage();
await pageExtension.goto(testingURL);
currPageExtensionURL = testingURL;

if (!options.extensionOnly) {
  const browserNormal = await puppeteer.launch({
    produce: 'chrome',
    headless: false,
    args: normal_args
  });

  // Ensures both browsers close when either one gets disconnected
  browserNormal.on('disconnected', () => {browserExtension.close();}); 
  browserExtension.on('disconnected', () => {browserNormal.close();});
  
  const pageNormal = await browserNormal.newPage();
  await pageNormal.goto(testingURL);
  currPageNormalURL = testingURL;

  // Matching navigations on both testing pages
  pageNormal.on('framenavigated', (frame) => {
    if (pageNormal.url() != currPageNormalURL) {
      currPageNormalURL = pageNormal.url();
      currPageExtensionURL = currPageNormalURL;
      pageExtension.goto(currPageNormalURL);
    }
  });

  pageExtension.on('framenavigated', (frame) => {
    if (pageExtension.url() != currPageExtensionURL) {
      currPageExtensionURL = pageExtension.url();
      currPageNormalURL = currPageExtensionURL;
      pageNormal.goto(currPageExtensionURL);
    }
  });

  // Responsible for running tests on web pages
  await coreWebVitalsTest(pageNormal, normalMetricsDict);

  // Report normal metrics
  console.log(`\nWeb Vital Metrics (Normal)`);

  for (let key in options) {
    if (metricToPrint[key] != undefined && options[key] == true) {
      console.log(`${metricToPrint[key]}${normalMetricsDict[key]}`)
    }
  }

  // Track resources used (normal)
  if (options.resources) {
    const normalResources = wsConnection(browserNormal);
  }

}

// Track resources used (extension)
if (options.resources) {
  const extensionResources = wsConnection(browserExtension);
}

await coreWebVitalsTest(pageExtension, extensionMetricsDict);

// Report extension metrics
console.log("\n------------------------");
console.log(`\nWeb Vital Metrics (Extension)`);

for (let key in options) {
  if (metricToPrint[key] != undefined && options[key] == true) {
    console.log(`${metricToPrint[key]}${extensionMetricsDict[key]}`)
  }
}

// Provides a final report before user exits
process.on('beforeExit', () => {
  exit(normalMetricsDict, extensionMetricsDict, metricToPrint, options);
});