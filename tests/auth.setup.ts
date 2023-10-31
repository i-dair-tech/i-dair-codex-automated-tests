import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('https://qa1.i-dair.africa/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Sign in with Google' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('link', { name: 'Use another account' }).click();
  await page1.getByLabel('Email or phone').fill('ichrak.rjab@i-dair.org');
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.getByLabel('Enter your password').fill('IchrakRjab2023*');
  await page1.getByRole('button', { name: 'Next' }).click()

  await page.context().storageState({ path: authFile });
});