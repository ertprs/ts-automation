import { config as dotenv } from 'dotenv'
import puppeteer from 'puppeteer'

const start = async () => {
    dotenv()
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--disable-notifications'],

    });

    const page = await browser.newPage()

    await page.goto(process.env.DASHBOARD_SITE as string)

    await page.type("[data-bi=sign-email]", process.env.USER_EMAIL as string)
    await page.type("[data-bi=sign-password]", process.env.USER_PASS as string)

    await page.click("[data-bi=sign-submit]")

    await page.waitForNavigation()

    const [h2] = await page.$x("//h2[contains(., 'Correção de redação')]");

    if (!h2) console.error("Err")
    await h2.click()
    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    /// get the theme

    const element = await page.$("#redacao-da-semana");
    const text = await page.evaluate(element => element.textContent, element);


    //get all old themes

    const red = await page.$$eval('.EssaysListWrapper', x => x.map(x=> x.textContent))


    console.log(text)

    browser.close()

}
start()