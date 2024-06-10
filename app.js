const { By, Builder, Browser} = require('selenium-webdriver');
const {Options} = require('selenium-webdriver/chrome');
//const { ChromeOptions } = require('/Users/mahitnamburu/Downloads/chromedriver-mac-arm64/chromedriver')
const assert = require('assert');
const {onCLS, onFCP, onLCP} = require('web-vitals');

(async function initalTest() {
    let driver;
    let options;

    try {
        options = await new Options().addExtensions("/Users/mahitnamburu/Desktop/webdrivertest/webextensions-selenium-example.crx")
        driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
        await driver.get('https://www.google.com/');
        //let currObject = await driver.executeScript('const observer = new PerformanceObserver((list) => {let perfEntries = list.getEntries();let currEntry = perfEntries[perfEntries.length - 1];console.log(currEntry);return currEntry});observer.observe({type: "largest-contentful-paint", buffered: true});console.log("script ran");');
        let currObject1 = await driver.executeScript(() => {const observer = new PerformanceObserver((list) => {let perfEntries = list.getEntries();let currEntry = perfEntries[perfEntries.length - 1];console.log(currEntry); return currEntry.duration;});observer.observe({type: "largest-contentful-paint", buffered: true});console.log("script ran");});
        let currObject2 = await driver.executeScript(() => {const observer = new PerformanceObserver((list) => {let perfEntries = list.getEntries();let currEntry = perfEntries[perfEntries.length - 1];console.log(currEntry); return currEntry;});observer.observe({type: "layout-shift", buffered: true});console.log("script ran"); return 11;});
        /* let currObject3 = driver.executeAsyncScript(() => {const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    console.log("LayoutShift value:", entry.value);
                    console.log(entry);
                    if (entry.sources) {
                        for (const {node, currentRect, previousRect} of entry.sources)
                            console.log("LayoutShift source:", node, {
                                currentRect,
                                previousRect,
                              });
                    }
                }
            }
        });observer.observe({type: "layout-shift", buffered: true});console.log("script ran"); return 11;});
 */
        //never receiving the currObject and is timing out, not exactly, got to look at what the conditions for it is
        //await driver.executeScript(() => {console.log(5)});
        //await currObject1.then((message) => {console.log(message)}).catch()
        await console.log(currObject2);
    }
    catch (e) {
        console.log(e)
    }
    finally {
        //await driver.quit();
    }
}())