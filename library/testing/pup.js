import puppeteer from 'puppeteer';
import path from 'path';
import requestCLSMetrics from '../features/cls.js';
import requestINPMetrics from '../features/inp.js';
import requestTBTMetrics from '../../tbt.js';
import requestLCPMetrics from '../features/lcp.js';
import wsConnection from '../features/socket.js';
//import pidusage from 'pidusage';
//import os from 'os';
//import WebSocket from 'ws';
//import SEND from './SEND.js';
//import Plotly from 'plotly.js-dist-min'

let URL = "https://www.google.com";

let pathToExtension = path.join(process.cwd(), 'webextensions-selenium-example');
const normalMetricsDict = Object();
normalMetricsDict.cls = 0
normalMetricsDict.lcp = 0
normalMetricsDict.inp = -1
normalMetricsDict.tbt = 0

const extensionMetricsDict = Object();
extensionMetricsDict.cls = 0
extensionMetricsDict.lcp = 0
extensionMetricsDict.inp = -1
extensionMetricsDict.tbt = 0

async function coreWebVitalsTest(page, dict) {

    await page.exposeFunction('print', (msg) => console.log(msg));
    
    await requestCLSMetrics(page, dict);
    await requestINPMetrics(page, dict);
    await requestLCPMetrics(page, dict);
    await requestTBTMetrics(page, dict);
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
wsConnection(browserNormal);
wsConnection(browserExtension);

const page = await browserExtension.newPage();
const pageNormal = await browserNormal.newPage();

await page.goto(URL);
await pageNormal.goto(URL);


await coreWebVitalsTest(page, extensionMetricsDict);
//replace this part with more of a streaming value (ie. when the value gets changed, we are updated)
await new Promise((resolve, reject) => setTimeout(resolve, 5000));
await console.log(extensionMetricsDict.tbt);
await console.log(extensionMetricsDict.cls);
await console.log(extensionMetricsDict.lcp);
await console.log(extensionMetricsDict.inp);
await console.log("------------");
//await page.close();
await coreWebVitalsTest(pageNormal, normalMetricsDict);
await new Promise((resolve, reject) => setTimeout(resolve, 5000));
await console.log(normalMetricsDict.tbt);
await console.log(normalMetricsDict.cls);
await console.log(normalMetricsDict.lcp);
await console.log(normalMetricsDict.inp);





//await page.close()
//await pageNormal.close()
/* brainstorming
main task now, is to figure out how to isolate the running of the extension script
then carefully track the cpu consumption and memory consumption, and analyze which code blocks specifically are giving us the most trouble
this tool can be carefully adjusted to test the extension on the specific websites and pages that the extension developer wants (accounts for the varying degree of performance issues based on what website they are testing)
potentially start contributing to devtools in this aspect
standalone CLI tool to take a folder and gives back test results (w/ w/o extension)
figure out the async and sync layers
make a simple line graph for the cpu and memory consumption
better formatting for the data
diff functions for cli/flags

*/

// console.log(pathToExtension);
