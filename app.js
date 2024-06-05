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
        await driver.get('https://www.example.com/');
        await driver.executeScript('const observer = new PerformanceObserver((list) => {let perfEntries = list.getEntries();let currEntry = perfEntries[perfEntries.length - 1];console.log(currEntry);return currEntry});observer.observe({entryTypes: ["largest-contentful-paint", "layout-shift"]});console.log("script ran");');
        await driver.executeScript('console.log(5);');
    }
    catch (e) {
        console.log(e)
    }
    finally {
        //await driver.quit();
    }
}())