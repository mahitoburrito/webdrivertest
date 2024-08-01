#!/usr/bin/env node

import { program } from "commander";
import puppeteer from 'puppeteer';
import path from 'path';
import requestCLSMetrics from '../library/features/cls.js';
import requestINPMetrics from '../library/features/inp.js';
import requestTBTMetrics from '../library/features/tbt.js';
import requestLCPMetrics from '../library/features/lcp.js';
import wsConnection from '../library/features/socket.js';
//import pidusage from 'pidusage';
//import os from 'os';

let pathToExtension;
let URL;
const normalMetricsDict = Object();
normalMetricsDict.cls = 0;
normalMetricsDict.lcp = 0;
normalMetricsDict.inp = -1;
normalMetricsDict.tbt = 0;

const extensionMetricsDict = Object();
extensionMetricsDict.cls = 0;
extensionMetricsDict.lcp = 0;
extensionMetricsDict.inp = -1;
extensionMetricsDict.tbt = 0;


program
  .version("1.0.0")
  .description("CLI for chromeextension development")
  .option("-u, --url <type>", "add your testing URL", "https://www.example.com")
  .option("-e, --extension <type>", "Add your extension filepath")
  .option("-l, --no-lcp, ", "Deactivate LCP Metric")
  .option("-c, --no-cls", "Deactivate CLS Metric")
  .option("-i, --no-inp", "Deactivate INP Metric")
  .option("-t, --no-tbt", "Deactivate TBT Metric")
  .option("-r, --no-resources", "Deactivate resource tracking")
  .action((options) => {
    pathToExtension = options.extension;
  });

program.parse(process.argv);

const options = program.opts();
console.log(`Extension Filepath: ${options.extension}`);
console.log(`Testing URL: ${options.url}`);
console.log(`Tracking Resources: ${options.resources}`);
console.log(`Tracking CLS: ${options.cls}`);
console.log(`Tracking LCP: ${options.lcp}`);
console.log(`Tracking TBT: ${options.tbt}`);
console.log(`Tracking INP: ${options.inp}`);

pathToExtension = options.extension;
URL = options.url;


async function coreWebVitalsTest(page, dict) {

  await page.exposeFunction('print', (msg) => console.log(msg));
  if (options.cls) {
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
}

// Set up browsers with and without extension
const browserExtension = await puppeteer.launch({
product: 'chrome',
headless: false,
args: [
  `--disable-extensions-except=${pathToExtension}`,
  `--load-extension=${pathToExtension}`,
]
});

const browserNormal = await puppeteer.launch({
  produce: 'chrome',
  headless: false
});

//setting up websocket connection
if (options.resources) {
  const normalResources = wsConnection(browserNormal);
  const extensionResources = wsConnection(browserExtension);
}

const pageExtension = await browserExtension.newPage();
const pageNormal = await browserNormal.newPage();

await pageExtension.goto(URL);
await coreWebVitalsTest(pageExtension, extensionMetricsDict);
//replace this part with more of a streaming value (ie. when the value gets changed, we are updated)
await new Promise((resolve) => setTimeout(resolve, 5000));
console.log(`\nWeb Vital Metrics (Extension)`);
if (options.cls) {
  console.log(`Cumulative Layout Shift (CLS): ${extensionMetricsDict.cls}`);
}
if (options.lcp) {
  console.log(`Largest Contentful Paint (LCP): ${extensionMetricsDict.lcp}`);
}
if (options.inp) {
  console.log(`Interaction to Next Paint (INP): ${extensionMetricsDict.inp}`);
}
if (options.tbt) {
  console.log(`Total Blocking Time (TBT): ${extensionMetricsDict.tbt}`);
}
console.log("\n------------------------\n");
//await page.close();

await pageNormal.goto(URL);
await coreWebVitalsTest(pageNormal, normalMetricsDict);
await new Promise((resolve) => setTimeout(resolve, 5000));
console.log(`Web Vital Metrics (Normal)`);
if (options.cls) {
  console.log(`Cumulative Layout Shift (CLS): ${normalMetricsDict.cls}`);
}
if (options.lcp) {
  console.log(`Largest Contentful Paint (LCP): ${normalMetricsDict.lcp}`);
}
if (options.inp) {
  console.log(`Interaction to Next Paint (INP): ${normalMetricsDict.inp}`);
}
if (options.tbt) {
  console.log(`Total Blocking Time (TBT): ${normalMetricsDict.tbt}`);
}

// add a lib folder, testing folder, feature folder, readme, go through comprehensive testing

//drop node_modules folder, git ignore file (node_modules, )
// pretend you are a PM for grammarly, install a tool for a google doc, 