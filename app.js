const { By, Builder, Browser, WebDriver} = require('selenium-webdriver');
const {Options} = require('selenium-webdriver/chrome');
//const { ChromeOptions } = require('/Users/mahitnamburu/Downloads/chromedriver-mac-arm64/chromedriver')
const assert = require('assert');
const {onCLS, onFCP, onLCP} = require('web-vitals');

const URL = 'https://www.google.com/';
const EXTENSIONS = ["/Users/mahitnamburu/Desktop/webdrivertest/webextensions-selenium-example.crx"];
async function generalTest() {
    try {

    }
    catch (e) {
        console.log(e);
    }
    finally {

    }
}

(async function initalTest() {
    let driver;
    let options;

    try {
        options = await new Options();
        for (const extension of EXTENSIONS) {
            options.addExtensions(extension);
        }
        driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
        //can also add implicit and pageLoad to the JS object
        driver.manage().setTimeouts({script: 10000})
        //Navigate to designated URL
        await driver.get(URL);
        let currObject1 = await driver.executeAsyncScript((done) => {
            //check for if observer has already been instatiated
            const observer = new PerformanceObserver((list) => {
                let perfEntries = list.getEntries();
                let currEntry = perfEntries[perfEntries.length - 1];
                console.log(currEntry); 
                //return currEntry.duration; 
                done(currEntry);
            });
            observer.observe({type: "largest-contentful-paint", buffered: true});
            console.log("script ran for LCP");
        });
        
        let currObject2 = await driver.executeAsyncScript((done) => {
            //check for if observer has already been instatiated
            const observer = new PerformanceObserver((list) => {
                let perfEntries = list.getEntries();
                let currEntry = perfEntries[perfEntries.length - 1];
                console.log(currEntry);
                done(currEntry);
            });
            observer.observe({type: "layout-shift", buffered: true});
            console.log("script ran for CLS");
        });
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
        await console.log("LCP: ");
        await console.log(currObject1);
        await console.log("CLS: ");
        await console.log(currObject2);
    }
    catch (e) {
        console.log(e)
    }
    finally {
        //await driver.quit();
    }
}())

// TODO: figure out how to integrate TTBT
// TODO: run two tests sequentially with and without designated extensions
    // make a function that does all the testing, and feed it parameters