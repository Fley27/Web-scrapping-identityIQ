const puppeteer = require("puppeteer");
const scrollPageToBottom = require("puppeteer-autoscroll-down");
const C = require("./connection");
const USERNAME_SELECTOR = "#txtUsername";
const PASSWORD_SELECTOR = "#txtPassword";
const CTA_SELECTOR = "#imgBtnLogin";
const CODE_SELECTOR = "#FBfbforcechangesecurityanswer_txtSecurityAnswer";
const SUBMIT_SELECTOR = "#FBfbforcechangesecurityanswer_ibtSubmit";

const scrapper = async ({ username, password, last4 }) => {
  // Create an instance of the chrome browser
  // But disable headless mode !
  let dbObj = {};
  const browser = await puppeteer.launch({
    headless: true,
    width: 2500,
    height: 2500,
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

    await page.goto("https://www.identityiq.com/CreditReport.aspx", {
      waitUntil: "load",
      timeout: 0,
    });
    //Bureau EquiFax

    await autoScroll(page);
    const html = await page.content();
    await page.waitForSelector(
      `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat`
    );
    let creditReport = await page.evaluate(() => {
      let credits = document.querySelectorAll(
        `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat`
      );
      let creditItems = [];
      let i = 0;
      credits.forEach((creditElement) => {
        i++;
        let item = {};
        let Account = [],
          AccountStatus = [],
          AccountType = [],
          Detail = [],
          BureauCode = [],
          Payment = [],
          DateOpened = [],
          Balance = [],
          Terms = [],
          HighCredit = [],
          CreditLimit = [],
          PastDue = [],
          PaymentStatus = [],
          LastReported = [],
          DateLastActive = [],
          DateOfLastPayment = [];
        try {
          item.title = document.querySelector(
            `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat:nth-child(${i}) > ng-include > table > tbody > tr > td > ng-include > div`
          ).innerText;
          for (let a = 2; a < 5; a++) {
            try {
              Account.push(
                document.querySelector(
                  `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat:nth-child(${i}) > ng-include > table > tbody > tr > td > ng-include > table > tbody > tr:nth-child(2) > td:nth-child(${a}) > ng-repeat`
                ).innerText
              );
              AccountType.push(
                document.querySelector(
                  `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat:nth-child(${i}) > ng-include > table > tbody > tr > td > ng-include > table > tbody > tr:nth-child(3) > td:nth-child(${a}) > ng-repeat`
                ).innerText
              );
              Detail.push(
                document.querySelector(
                  `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat:nth-child(${i}) > ng-include > table > tbody > tr > td > ng-include > table > tbody > tr:nth-child(4) > td:nth-child(${a}) > ng-repeat > ng`
                ).innerText
              );
              BureauCode.push(
                document.querySelector(
                  `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat:nth-child(${i}) > ng-include > table > tbody > tr > td > ng-include > table > tbody > tr:nth-child(5) > td:nth-child(${a}) > ng-repeat`
                ).innerText
              );
              AccountStatus.push(
                document.querySelector(
                  `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat:nth-child(${i}) > ng-include > table > tbody > tr > td > ng-include > table > tbody > tr:nth-child(6) > td:nth-child(${a}) > ng-repeat`
                ).innerText
              );
              Payment.push(
                document.querySelector(
                  `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat:nth-child(${i}) > ng-include > table > tbody > tr > td > ng-include > table > tbody > tr:nth-child(7) > td:nth-child(${a}) > ng-repeat`
                ).innerText
              );
              DateOpened.push(
                document.querySelector(
                  `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat:nth-child(${i}) > ng-include > table > tbody > tr > td > ng-include > table > tbody > tr:nth-child(8) > td:nth-child(${a}) > ng-repeat`
                ).innerText
              );
              Balance.push(
                document.querySelector(
                  `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat:nth-child(${i}) > ng-include > table > tbody > tr > td > ng-include > table > tbody > tr:nth-child(9) > td:nth-child(${a}) > ng-repeat`
                ).innerText
              );
              Terms.push(
                document.querySelector(
                  `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat:nth-child(${i}) > ng-include > table > tbody > tr > td > ng-include > table > tbody > tr:nth-child(10) > td:nth-child(${a}) > ng-repeat`
                ).innerText
              );
              HighCredit.push(
                document.querySelector(
                  `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat:nth-child(${i}) > ng-include > table > tbody > tr > td > ng-include > table > tbody > tr:nth-child(11) > td:nth-child(${a}) > ng-repeat`
                ).innerText
              );
              CreditLimit.push(
                document.querySelector(
                  `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat:nth-child(${i}) > ng-include > table > tbody > tr > td > ng-include > table > tbody > tr:nth-child(12) > td:nth-child(${a}) > ng-repeat`
                ).innerText
              );
              PastDue.push(
                document.querySelector(
                  `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat:nth-child(${i}) > ng-include > table > tbody > tr > td > ng-include > table > tbody > tr:nth-child(13) > td:nth-child(${a}) > ng-repeat`
                ).innerText
              );
              PaymentStatus.push(
                document.querySelector(
                  `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat:nth-child(${i}) > ng-include > table > tbody > tr > td > ng-include > table > tbody > tr:nth-child(14) > td:nth-child(${a}) > ng-repeat`
                ).innerText
              );
              LastReported.push(
                document.querySelector(
                  `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat:nth-child(${i}) > ng-include > table > tbody > tr > td > ng-include > table > tbody > tr:nth-child(15) > td:nth-child(${a}) > ng-repeat`
                ).innerText
              );
              DateLastActive.push(
                document.querySelector(
                  `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat:nth-child(${i}) > ng-include > table > tbody > tr > td > ng-include > table > tbody > tr:nth-child(16) > td:nth-child(${a}) > ng-repeat`
                ).innerText
              );
              DateOfLastPayment.push(
                document.querySelector(
                  `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat:nth-child(${i}) > ng-include > table > tbody > tr > td > ng-include > table > tbody > tr:nth-child(17) > td:nth-child(${a}) > ng-repeat`
                ).innerText
              );
            } catch (error) {
              console.log(error);
            }
          }

          item.Account = Account;
          item.AccountStatus = AccountStatus;
          item.AccountType = AccountType;
          item.Detail = Detail;
          item.BureauCode = BureauCode;
          item.Payment = Payment;
          item.DateOpened = DateOpened;
          item.Balance = Balance;
          item.Terms = Terms;
          item.HighCredit = HighCredit;
          item.CreditLimit = CreditLimit;
          item.PastDue = PastDue;
          item.PaymentStatus = PaymentStatus;
          item.LastReported = LastReported;
          item.DateLastActive = DateLastActive;
          item.DateOfLastPayment = DateOfLastPayment;
        } catch (exception) {}
        creditItems.push(item);
      });
      return creditItems;
    });

    console.log(creditReport);
  } catch (error) {
    console.log(`${error}`);
  }
  await browser.close();
  return dbObj;
};

async function autoScroll(page) {
  try {
    await page.evaluate(async () => {
      try {
        await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
            var scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 500);
        });
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

scrapper("", "", "");
/*

              
              CreditLimit.push(
                creditElement.querySelector(
                  `#ctrlCreditReport > transunion-report > div.ng-binding.ng-scope > div:nth-child(15) > div:nth-child(3) > address-history > div > ng-repeat:nth-child(${i}) > ng-include > table > tbody > tr > td > ng-include > table > tbody > tr:nth-child(12) > td:nth-child(${a}) > ng-repeat`
                )
              );

              
*/
