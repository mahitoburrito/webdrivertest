#!/usr/bin/env node

import { program } from "commander";
import puppeteer from 'puppeteer';
//const {puppeteer} = require('puppeteer');
import path from 'path';
//import pidusage from 'pidusage';
//import os from 'os';
import WebSocket from 'ws';

let pathToExtension;
let URL = "https://www.google.com";
let CLS = 0;
let LCP = 0;
let TBT = 0;
//let pathToExtension = path.join(process.cwd(), 'webextensions-selenium-example');

program
  .version("1.0.0")
  .description("CLI for Chrome Extension development testing.")
  .option("-e, --extension <type>", "Add your extension filepath")
  .action((options) => {
    console.log(`Extension Filepath: '${options.extension}'`);
    pathToExtension = options.extension;
  });

program.parse(process.argv);

function SEND(ws, command) {
    ws.send(JSON.stringify(command));
    return new Promise(resolve => {
      ws.on('message', function(text) {
        const response = JSON.parse(text);
        if (response.id === command.id) {
          //ws.removeListener('message', arguments.callee);
          resolve(response);
        }
      });
    });
  }

async function wsConnection(browser) {
    const wsNormal = new WebSocket(browser.wsEndpoint(), {perMessageDeflate: false});
    await new Promise(resolve => wsNormal.once('open', resolve));
    console.log('Acquiring targets...');
    const targetList = await SEND(wsNormal, {
    id: 1,
    method: 'Target.getTargets',
    });
    // Ensure we are grabbing the right page here
    await console.log('Attaching to page targets...');
    const targetDetails = await SEND(wsNormal, {
    id: 2,
    method: 'Target.attachToTarget',
    params: {
        targetId: targetList.result.targetInfos[0].targetId, 
        flatten: true
    }
    });

    // Grab session ID
    const sessionID = await targetDetails.result.sessionId;
    await SEND(wsNormal, {
    sessionId: sessionID,
    id: 1, 
    method: 'Page.navigate',
    params: {
        url: URL,
    },
    });
    
    await SEND(wsNormal, {
    sessionId: sessionID,
    id: 2, 
    method: 'Performance.enable',
    });
    
    const perfResults = (await SEND(wsNormal, {
    sessionId: sessionID,
    id: 3,
    method: 'Performance.getMetrics',
    })).result;
    console.log('Performance metrics using DevTools Protocol');
    console.log(perfResults);
}

async function coreWebVitalsTest(page) {

    await page.exposeFunction('print', (msg) => console.log(msg));
    // do something with these expose functions such that if after all 3 have been updated, the timeout moves on, but defaults to 2 seconds otherwise
    await page.exposeFunction('updateCLS', (metric) => {CLS = metric;console.log("updated value cls^");});
    await page.exposeFunction('updateLCP', (metric) => {LCP = metric;console.log("updated value lcp^");});
    await page.exposeFunction('updateTBT', (metric) => {TBT = metric;console.log("updated value tbt^");});
        
    await page.evaluate(() => {
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
    await page.evaluate(() => {
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


await coreWebVitalsTest(page);
//replace this part with more of a streaming value (ie. when the value gets changed, we are updated)
await new Promise((resolve, reject) => setTimeout(resolve, 2000));
await console.log(TBT);
await console.log(CLS);
await console.log(LCP);
await console.log("------------");
//await page.close();
await coreWebVitalsTest(pageNormal);
await new Promise((resolve, reject) => setTimeout(resolve, 2000));
await console.log(TBT);
await console.log(CLS);
await console.log(LCP);