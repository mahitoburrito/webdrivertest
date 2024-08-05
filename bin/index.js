#!/usr/bin/env node

import { program } from "commander";
import puppeteer from 'puppeteer';
import requestCLSMetrics from '../library/features/cls.js';
import requestINPMetrics from '../library/features/inp.js';
import requestTBTMetrics from '../library/features/tbt.js';
import requestLCPMetrics from '../library/features/lcp.js';
import wsConnection from '../library/features/socket.js';
import report from '../library/features/report.js';
import packageJson from '../package.json' assert {type: "json"};
import fs from 'fs';

let pathToExtension;
let testingURL;
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

program
  .version(packageJson.version)
  .description("A CLI (Command Line Interface) that lets you test the performance effect on a webpage based by a specified extension. Performance discrepancies are tracked mainly by Core Web Vitals and other relevant metrics (use -h to see all options).") // include a more detailed description on what this does in terms of tracking web performance , etc.
  .requiredOption("-u, --url <type>", "Add your testing URL") // require url and extension
  .requiredOption("-e, --extension <type>", "Add your extension filepath")
  .option("-l, --lcp", "Deactivate LCP Metric", false)
  .option("-c, --cls", "Deactivate CLS Metric", false)
  .option("-i, --inp", "Deactivate INP Metric", false)
  .option("-t, --tbt", "Deactivate TBT Metric", false)
  .option("-a, --all-metrics", "Activate all metric tracking", false)
  .option("-r, --resources", "Deactivate resource (Memory & CPU Consumption) tracking", false) //specify what resources is
  .option("-p, --profile <type>", "Configure custom Chrome Profile")
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
// have an example command and have some sort of help from commander describing what you can do etc. Examples should be in readme
// have a -a for all performances
// have more comments in the code
//make multiple tests possible
program.parse(process.argv);

const options = program.opts();
console.log(options);

//prints a report rather than having here (another folder, just pass options)
report(options);

//validate that pathToExtension actually exists (fi.stat)
//try to load an non-extension see what happens, and handle it
//make this into another file?
if (fs.existsSync(options.extension)) {
  if (fs.lstatSync(options.extension).isDirectory()) {
    pathToExtension = options.extension;
  } else {
    console.log("This is not a valid directory. You may have to download this extension as a .zip and extract the extension directory.");
  }
} else {
  console.log("This is not a valid path.")
} 

//existing global, dont use that name
testingURL = options.url;


async function coreWebVitalsTest(page, dict) {

  await page.exposeFunction('print', (msg) => console.log(msg));
  //iterate through the options rather than hardcoding the functions
  //console.log(metricToFunction[text](page, dict));
  for (let key in options) {
    if (metricToFunction[key] != undefined && options[key] == true) {
      await metricToFunction[key](page, dict);
    }
  }
  /* if (options.cls) {
    await requestCLSMetrics(page, dict);
  }
  if (options.inp) {
    await requestINPMetrics(page, dict);
  }
  if (options.lcp) {
    await requestLCPMetrics(page, dict);
  }
  if (options.tbt) {
    await requestTBTMetrics(page, dict);
  }
    */
}

// Set up browsers with and without extension
//add a listener that listens for the page to crash or quit and quit each one, have some kind of final report
const browserExtension = await puppeteer.launch({
product: 'chrome',
headless: false,
args: [
  `--disable-extensions-except=${pathToExtension}`,
  `--load-extension=${pathToExtension}`,
  `--user-data-dir=/Users/mahitnamburu/Library/Application Support/Google/Chrome/Profile 1`
]
});

const browserNormal = await puppeteer.launch({
  produce: 'chrome',
  headless: false,
  args: [
    `--user-data-dir=/Users/mahitnamburu/Library/Application Support/Google/Chrome/Default`
  ]
});

browserExtension.on('disconnected', () => {browserNormal.close();})
browserNormal.on('disconnected', () => {browserExtension.close();})

//setting up websocket connection
if (options.resources) {
  const normalResources = wsConnection(browserNormal);
  const extensionResources = wsConnection(browserExtension);
}

//have a flag to match navigations on both browsers, maybe track everything?
//add a splitscreen between the two
const pageExtension = await browserExtension.newPage();
const pageNormal = await browserNormal.newPage();

await pageExtension.goto(testingURL);
await coreWebVitalsTest(pageExtension, extensionMetricsDict);
//replace this part with more of a streaming value (ie. when the value gets changed, we are updated)
await new Promise((resolve) => setTimeout(resolve, 5000));

//dont hard code, include final report, create some sort of mapping between the flags and the metrics
console.log(`\nWeb Vital Metrics (Extension)`);

for (let key in options) {
  if (metricToPrint[key] != undefined && options[key] == true) {
    console.log(`${metricToPrint[key]}${extensionMetricsDict[key]}`)
  }
}
console.log("\n------------------------\n");
//await page.close();

await pageNormal.goto(testingURL);
await coreWebVitalsTest(pageNormal, normalMetricsDict);
await new Promise((resolve) => setTimeout(resolve, 5000));
console.log(`Web Vital Metrics (Normal)`);

for (let key in options) {
  if (metricToPrint[key] != undefined && options[key] == true) {
    console.log(`${metricToPrint[key]}${normalMetricsDict[key]}`)
  }
}

//print when theres a update or when we quit the program, on Process..onBeforeExit

//hook onto document.onload and then begin running the script
//look into queuemicrotask

process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});

//optionally add a chrome profile as a flag
//have a way to just launch the extension version (another flag)
//show a way to tell people that the program to close the program as a first run, and include in readme
//come up with some sort of metric that you are testing to give a warning/error if the metrics are above some values
//if difference is above something
//add in a way to test multiple runs
//pass an extension ID and then install that extension from a policy file
//create a policy to download those extensions by default
//look into the policy extension-settings https://chromeenterprise.google/policies/?policy=ExtensionSettings
//https://support.google.com/chrome/a/answer/9867568?hl=en
//https://github.com/GoogleChromeLabs/extension-update-testing-tool have a little wrapper function that takes the user input and outputs to a temporary file that is the policy file, and load that in
// test to see if profile loading works, then hard code a profile and load it in, then create temp file
// support local extension or an id


//drop node_modules folder, git ignore file (node_modules, package_lock)
// pretend you are a PM for grammarly, install a tool for a google doc, 
// I would want to have an example chrome profile already downloaded so I dont need to log in
// For some reason only certain profiles are able to log in
// I'd wanna make sure that the metric values are streamed everytime they update (shouldn't be too hard)