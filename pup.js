import puppeteer from 'puppeteer';
//const {puppeteer} = require('puppeteer');
import path from 'path';
//import pidusage from 'pidusage';
//import os from 'os';
//import WebSocket from 'ws';
//import SEND from './SEND.js';
//import Plotly from 'plotly.js-dist-min'
import requestCLSMetrics from './cls.js';
import requestINPMetrics from './inp.js';
import requestTBTMetrics from './tbt.js';
import requestLCPMetrics from './lcp.js';
import wsConnection from './socket.js';

let URL = "https://www.google.com";
let CLS = 0;
let LCP = 0;
let TBT = 0;
let INP = -1;
let pathToExtension = path.join(process.cwd(), 'webextensions-selenium-example');
const normalMetricsDict = Object();
const extensionMetricsDict = Object();

async function coreWebVitalsTest(page, dict) {

    await page.exposeFunction('print', (msg) => console.log(msg));
    
    await requestCLSMetrics(page, dict);
    await requestINPMetrics(page, dict);
    await requestLCPMetrics(page, dict);
    await requestTBTMetrics(page, dict);
    /* await page.evaluate(() => {
        //check for if observer has already been instatiated
        
        const observer = new PerformanceObserver((list) => {
            var cls = 0;
            let perfEntries = list.getEntries();
            perfEntries.forEach((entry) => {
                if (!entry.hadRecentInput) {
                    cls += entry.value;
                }
            });
            //let currEntry = perfEntries[perfEntries.length - 1];
            //print(currEntry);
            //console.log(cls) 
            //print(cls);
            updateCLS(cls);
        });
        observer.observe({type: "layout-shift", buffered: true});
        //print("script ran for CLS");
    });
    */ 
    /* await page.evaluate(() => {
        const observer = new PerformanceObserver((list) => {
            var tbt = 0;
            let perfEntries = list.getEntries();
            perfEntries.forEach((entry) => {
                tbt += entry.duration - 50;
            });
            //print(tbt);
            updateTBT(tbt);
        });
        observer.observe({type: "longtask", buffered: true});
        //print("script ran for total blocking time");
    });
    await console.log("after TBT");

    await page.evaluate(() => {
        const observer = new PerformanceObserver((list) => {
            let perfEntries = list.getEntries();
            let currEntry = perfEntries[perfEntries.length - 1];
            console.log(currEntry);
            //print(currEntry.startTime);
            updateLCP(currEntry.startTime);
        });
        observer.observe({type: "largest-contentful-paint", buffered: true});
        //print("script ran for NEW LCP");
    });

    await page.evaluate(() => {
        const observer = new PerformanceObserver((list) => {
            var inp = -1;
            console.log(list);
            list.getEntries().forEach((entry) => {
                if (!entry.interactionId) {
                    return;
                }
                if (entry.duration > inp) {
                    console.log(inp);
                    console.log('INP UPDATED');
                    updateINP(inp);
                }
            })
        });
        observer.observe({type: "event", buffered: true, durationThreshold: 0});
    }); */
}

/* async function trackResources(pid) {
    try {
        const statistics = await pidusage(pid);
        console.log(statistics.cpu);
    }
    catch (e) {
        console.log(e);
    }
}

setInterval(() => {
    trackResources(pid);
}, 500) */


//let pathToExtension = "/Users/mahitnamburu/Desktop/webdrivertest/webextensions-selenium-example.crx"

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
