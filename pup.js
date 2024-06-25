import puppeteer from 'puppeteer';
//const {puppeteer} = require('puppeteer');
import path from 'path';

let URL = "https://www.google.com";
let CLS = 0;
let LCP = 0;
let TBT = 0;
//let pathToExtension = "/Users/mahitnamburu/Desktop/webdrivertest/webextensions-selenium-example.crx"
let pathToExtension = path.join(process.cwd(), 'webextensions-selenium-example');
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

const page = await browserExtension.newPage();
const pageNormal = await browserNormal.newPage();

await page.goto(URL);

async function coreWebVitalsTest(page) {

await page.exposeFunction('print', (msg) => console.log(msg));
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

await coreWebVitalsTest(page);

//await page.goto("https://www.google.com");
//replace this part with more of a streaming value (ie. when the value gets changed, we are updated)
await new Promise((resolve, reject) => setTimeout(resolve, 2000));
await console.log(TBT);
await console.log(CLS);
await console.log(LCP);
await console.log("separating print");
//await page.close();
await pageNormal.goto(URL);
await coreWebVitalsTest(pageNormal);
await new Promise((resolve, reject) => setTimeout(resolve, 2000));
await console.log(TBT);
await console.log(CLS);
await console.log(LCP);

/* brainstorming
main task now, is to figure out how to isolate the running of the extension script
then carefully track the cpu consumption and memory consumption, and analyze which code blocks specifically are giving us the most trouble
this tool can be carefully adjusted to test the extension on the specific websites and pages that the extension developer wants (accounts for the varying degree of performance issues based on what website they are testing)
potentially start contributing to devtools in this aspect
*/