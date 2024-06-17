import puppeteer from 'puppeteer';
//const {puppeteer} = require('puppeteer');


const browser = await puppeteer.launch({
  product: 'chrome',
  headless: false,
});

const page = await browser.newPage();
await page.goto('https://www.google.com');

await page.exposeFunction('tezt', (msg) => console.log(`got msg: ${msg}`));
await page.exposeFunction('checkLCP', () => {console.log("hello");const observer = new PerformanceObserver((list) => {
    let perfEntries = list.getEntries();
    let currEntry = perfEntries[perfEntries.length - 1];
    console.log(currEntry);
    console.log("HELOOOOO");
    return currEntry.duration; 
    //done(currEntry);
});
observer.observe({type: "largest-contentful-paint", buffered: true});
console.log("script ran for LCP");
});

await page.exposeFunction('checkLCP2', () => {return new Promise(resolve => {
    const observer = new PerformanceObserver((list) => {
        let perfEntries = list.getEntries();
        let currEntry = perfEntries[perfEntries.length - 1];
        console.log(currEntry);
        resolve(currEntry);
    });
    observer.observe({type: "largest-contentful-paint", buffered: true});
    console.log("script ran for NEW LCP");
})});

await page.exposeFunction('perfCallback', (list) => {
    let perfEntries = list.getEntries();
    let currEntry = perfEntries[perfEntries.length - 1];
    console.log(currEntry);
    console.log("something happened");
    //resolve(currEntry)
});

let perf = await page.evaluate(() => {return new Promise(resolve => {
    const observer = new PerformanceObserver((list) => {
        let perfEntries = list.getEntries();
        let currEntry = perfEntries[perfEntries.length - 1];
        console.log(currEntry);
        resolve(currEntry);
    });
    observer.observe({type: "layout-shift", buffered: true});
    console.log("script ran for NEW LCP");
})});

//trying to use expose function
let perf2 = await page.evaluate(() => {return new Promise(resolve => {
    const observer = new PerformanceObserver(window.perfCallback);
    observer.observe({type: "largest-contentful-paint", buffered: true});
    console.log("script ran for NEW LCP");
})});

let perf4 = await page.evaluate(() => {
    const observer = new PerformanceObserver(window.perfCallback);
    observer.observe({type: "largest-contentful-paint", buffered: true});
    console.log("script ran for NEW LCP");
    return "completed";
})


await console.log("here is perf");
await console.log(perf4);
//await page.evaluate("tezt('hello')");
//await page.evaluate("checkLCP('wrong param')");
//let guess = await page.evaluate("checkLCP2()");

//make the callback function into an exposed function, then call it using a page.evaluate