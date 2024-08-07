#!/usr/bin/env node

import { program } from "commander";
import puppeteer from 'puppeteer';
import requestCLSMetrics from '../library/features/cls.js';
import requestINPMetrics from '../library/features/inp.js';
import requestTBTMetrics from '../library/features/tbt.js';
import requestLCPMetrics from '../library/features/lcp.js';
import wsConnection from '../library/features/socket.js';
import report from '../library/features/report.js';
import packageJson from '../package.json' assert {type: "json"}; //change assert to with & update node
import fs from 'fs';

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

program
  .version(packageJson.version)
  .description("A CLI (Command Line Interface) that lets you test the performance effect on a webpage based by a specified extension. Performance discrepancies are tracked mainly by Core Web Vitals and other relevant metrics (use -h to see all options).") // include a more detailed description on what this does in terms of tracking web performance , etc.
  .requiredOption("-u, --url <type>", "Add your testing URL") // require url and extension // handle when url is not valid URL.parsewors
  .requiredOption("-e, --extension <type>", "Add your extension filepath")
  .option("-o, --extension-only", "Only test Chrome with the extension")
  .option("-l, --lcp", "Activate LCP Metric", false)
  .option("-c, --cls", "Activate CLS Metric", false)
  .option("-i, --inp", "Activate INP Metric", false)
  .option("-t, --tbt", "Activate TBT Metric", false)
  .option("-a, --all-metrics", "Activate all metric tracking", false)
  .option("-r, --resources", "Activate resource (Memory & CPU Consumption) tracking", false) //specify what resources is
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

if (options.profile != undefined && fs.existsSync(options.profile)) {
  console.log("got here");
  profile_dir_extension = fs.mkdtempSync('Chrome Profiles');
  fs.cpSync(options.profile, profile_dir_extension, {recursive: true});
  profile_dir_normal  = fs.mkdtempSync('Chrome Profiles');
  fs.cpSync(options.profile, profile_dir_normal, {recursive: true});
  // look at the profile directory, grab the filepaths of both profiles, set as extension profile, and normal profile
}

//existing global, dont use that name
testingURL = options.url;


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
//add a listener that listens for the page to crash or quit and quit each one, have some kind of final report
const browserExtension = await puppeteer.launch({
product: 'chrome',
headless: false,
args: [
  `--disable-extensions-except=${pathToExtension}`,
  `--load-extension=${pathToExtension}`,
  `--user-data-dir=${profile_dir_extension}`
]
});

if (!options.extensionOnly) {
  const browserNormal = await puppeteer.launch({
    produce: 'chrome',
    headless: false,
    args: [
      `--user-data-dir=${profile_dir_normal}`
    ]
  });
  browserNormal.on('disconnected', () => {browserExtension.close();}); 
  browserExtension.on('disconnected', () => {browserNormal.close();});
  const pageNormal = await browserNormal.newPage();
  pageNormal.on('framenavigated', (frame) => {console.log(frame)});
  await pageNormal.goto(testingURL);
  //pageNormal.on('framenavigated', (frame) => pageExtension.goto(frame))
  await coreWebVitalsTest(pageNormal, normalMetricsDict);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(`\nWeb Vital Metrics (Normal)`);

  for (let key in options) {
    if (metricToPrint[key] != undefined && options[key] == true) {
      console.log(`${metricToPrint[key]}${normalMetricsDict[key]}`)
    }
  }
  if (options.resources) {
    const normalResources = wsConnection(browserNormal);
  }

}


//setting up websocket connection
if (options.resources) {
  const extensionResources = wsConnection(browserExtension);
}

//have a flag to match navigations on both browsers, maybe track everything?
//add a splitscreen between the two
const pageExtension = await browserExtension.newPage();

await pageExtension.goto(testingURL);
await coreWebVitalsTest(pageExtension, extensionMetricsDict);
//replace this part with more of a streaming value (ie. when the value gets changed, we are updated)
await new Promise((resolve) => setTimeout(resolve, 5000));

//dont hard code, include final report, create some sort of mapping between the flags and the metrics
console.log("\n------------------------");
console.log(`\nWeb Vital Metrics (Extension)`);

for (let key in options) {
  if (metricToPrint[key] != undefined && options[key] == true) {
    console.log(`${metricToPrint[key]}${extensionMetricsDict[key]}`)
  }
}
//await page.close();


//print when theres a update or when we quit the program, on Process..onBeforeExit

//hook onto document.onload and then begin running the script
//look into queuemicrotask
//sig int
process.on('SIGINT', () => {
  console.log('Process beforeExit event with code: ')});
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

//issues --> cannot get the process.on('BeforeExit) or the Chrome profiles to load
//navigation listener in the puppeteer docs
//clone the profile before we pass it in, always create 2 for both //fs.cpSync(src, dest, {recursive: true}); //fs.makedtemp