const axios = require("axios");
const puppeteer = require("puppeteer");

const cheerio = require("cheerio");
const arr = [];
const URL = "https://movies4u.com.au/";
const linkk =
  "https://movies4u.com.au/pirates-of-the-caribbean-at-worlds-end-2007-dual-audio-hindi-org-english/";
//
//

async function fetchData() {
  var link = null;
  var articles = null;
  const post = await axios(URL);
  const $ = cheerio.load(post.data);

  // console.log($);

  articles = $("div.container").children("article.post").toArray();

  const articles10 = [];
  copy = copyArray(articles);
  articles10.push(copy);

  //
  //
  //

  // articles10.forEach((ele) => {
  //   for (i = 0; i < ele.length; i++) {
  //     const article = $(ele[i]);
  //     console.log(article.children("figure").children("a").attr("href"));
  //   }
  // });

  //
  //

  for (i = 0; i < articles.length; i++) {
    const article = $(articles[i]);
    // console.log(article.children("figure").children("a").attr("href"));
    link = article.children("figure").children("a").attr("href");
    // await  secondPage(link);
    // console.log(link);
  }
  console.log(link);
  // await secondPage(
  //   "https://movies4u.com.au/pirates-of-the-caribbean-at-worlds-end-2007-dual-audio-hindi-org-english/"
  // );
}

fetchData();

//
//

function copyArray(array) {
  const copy = [];
  array.forEach((ele) => {
    copy.push(ele);
  });
  return copy;
}

//
//

async function secondPage(link) {
  const browser = await puppeteer.launch({ headless: true }); // Set to false to see the browser window
  const page = await browser.newPage();

  // Navigate to the target URL
  await page.goto(link, { waitUntil: "networkidle2" });

  const content = await page.content();
  const $ = cheerio.load(content);
  console.log($("div#kGtPC2").html());
}

// const puppeteer = require('puppeteer');

const puppeteer1 = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer1.use(StealthPlugin());

(async () => {
    const browser = await puppeteer1.launch({ headless: true });
    const page = await browser.newPage();

    // Go to the URL
    const url = linkk;
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Try to locate the iframe in a more flexible way, e.g., based on part of the src attribute
    const iframeElement = await page.waitForSelector('iframe[src*="cloudflare"]', { timeout: 60000 });
    const iframe = await iframeElement.contentFrame();

    // Click the checkbox if it appears
    await iframe.waitForSelector('input[type="checkbox"]', { visible: true });
    await iframe.click('input[type="checkbox"]');
console.log("clicked");

    // Wait a few seconds to observe result (optional)
    await page.waitForTimeout(5000);
    // await browser.close();
})();
