const { By, Builder, Browser} = require('selenium-webdriver');
const {Options} = require('selenium-webdriver/chrome');
//const { ChromeOptions } = require('/Users/mahitnamburu/Downloads/chromedriver-mac-arm64/chromedriver')
const assert = require('assert');
const {onCLS, onFCP, onLCP} = require('web-vitals');


(async function initalTest() {
    let options = await new Options().addExtensions("/Users/mahitnamburu/Desktop/webdrivertest/webextensions-selenium-example.crx")
   let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();


  try {
    await driver.get('https://example.com');

    // Execute JavaScript to show an alert with message 'hello'
    await driver.executeScript('alert("hello");');
  } finally {
   // await driver.quit();
  }


}())