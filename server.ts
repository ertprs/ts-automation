import puppeteer from 'puppeteer';
import {config as dotenv} from 'dotenv';


const start = async() => {
    dotenv()
    const browser = await puppeteer.launch({
        headless: false,
        args : ['--disable-notifications'],

    });

    const page = await browser.newPage()

    await page.goto(process.env.DASHBOARD_SITE as string)

    await page.type("[data-bi=sign-email]", process.env.USER_EMAIL as string)
    await page.type("[data-bi=sign-password]", process.env.USER_PASS as string)

    await page.click("[data-bi=sign-submit]")

    await page.waitForNavigation()

    const options = await page.$$eval('div > a', options => 
        options.map(option =>
            option.textContent))


    console.log(options)
    console.log("sucess")

    browser.close()

}
start()