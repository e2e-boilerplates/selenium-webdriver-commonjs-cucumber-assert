const {
  Given,
  When,
  Then,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
} = require("cucumber");
const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { strictEqual } = require("assert");

require("chromedriver");

setDefaultTimeout(4 * 5000);
let browser;
const options = new chrome.Options();
const chromeOptions = process.env.GITHUB_ACTIONS ? options.headless() : options;

BeforeAll("start", async () => {
  browser = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();
});

AfterAll("end", async () => {
  await browser.quit();
});

Given(/^Navigate to the sandbox$/, async () => {
  await browser.get("https://e2e-boilerplate.github.io/sandbox/");
});

When(/^I am on the sandbox page$/, async () => {
  const title = await browser.getTitle();
  strictEqual(title, "Sandbox");
});

Then(/^The page header should be "([^"]*)"$/, async (expectedHeader) => {
  const header = await browser.findElement(By.css("h1"));
  strictEqual(await header.getText(), expectedHeader);
});
