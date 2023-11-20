import { test, chromium, BrowserContext, Page } from '@playwright/test';
require('dotenv').config({
  path : '.env',

});
export async function initializeContextAndPage() :Promise<{ context: BrowserContext, page: Page }> {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(process.env.URL as string);
    //await page.pause()
    const auth = await page.getByRole('button', { name: 'Sign in with Google' }).isVisible();
    if (auth){
   const page1Promise = page.waitForEvent('popup');
     await page.getByRole('button', { name: 'Sign in with Google' }).click();
    const page1 = await page1Promise;
    await page1.getByRole('link', { name: 'Use another account' }).click();
    await page1.getByLabel('Email or phone').fill(process.env.USERNAME as string);
    await page1.getByRole('button', { name: 'Next' }).click();
    await page1.getByLabel('Enter your password').fill(process.env.PWD as string);
    await page1.getByRole('button', { name: 'Next' }).click()
  }
     
    return { context, page };
  }
  
  module.exports = { initializeContextAndPage };

