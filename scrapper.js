const puppeteer = require("puppeteer");
const C = require("./connection");
const USERNAME_SELECTOR = "#txtUsername";
const PASSWORD_SELECTOR = "#txtPassword";
const CTA_SELECTOR = "#imgBtnLogin";
const CODE_SELECTOR = "#FBfbforcechangesecurityanswer_txtSecurityAnswer";
const SUBMIT_SELECTOR = "#FBfbforcechangesecurityanswer_ibtSubmit";
const NEXTDATE = "#Fbscore_lblNextRefDate";

const webScraping = async (scraper) => {
  // Create an instance of the chrome browser
  // But disable headless mode !
  let name = null;
  let dbObj = {};
  const browser = await puppeteer.launch({
    headless: true,
  });

  // Create a new page
  const page = await browser.newPage();
  try {
    // Configure the navigation timeout
    await page.setDefaultNavigationTimeout(0);
    // Configure the navigation timeout
    await page.goto("https://www.identityiq.com/login.aspx", {
      waitUntil: "load",
      timeout: 0,
    });

    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(C.username);
    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(C.password);
    await page.click(CTA_SELECTOR);
    await page.waitForNavigation();

    await page.click(CODE_SELECTOR);
    await page.keyboard.type(C.code);
    await page.click(SUBMIT_SELECTOR);

    await page.goto("https://www.identityiq.com/Dashboard.aspx", {
      waitUntil: "load",
      timeout: 0,
    });
    const [elementHandle] = await page.$x(
      "/html/body/form/div[6]/div[2]/div[3]/div/div[1]/div[1]/div[5]/span"
    );
    const propertyHandle = await elementHandle.getProperty("textContent");
    const propertyValue = await propertyHandle.jsonValue();
    console.log(`REFRESH DATE (Next available) : ${propertyValue}`);
  } catch (error) {
    console.log(`${error}`);
  }
  await browser.close();
  return dbObj;
};

webScraping();
/*const newDom = await page.evaluate => 
      const el = document.getElementById"#Fbscore_lblNextRefDate".innerText;
      return el;
    ;

    dbObj.item = newDom;*/
