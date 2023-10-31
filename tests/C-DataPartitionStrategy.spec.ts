import { test, expect, Page } from '@playwright/test';
import { initializeContextAndPage } from './authentification';

test('DataPartitionStrategy', async ({ browser }) => {
  const { context, page } = await initializeContextAndPage();
  await page.getByRole('button', { name: 'Data Partition Strategy' }).click();
  await page.getByRole('button', { name: '​', exact: true }).click();
  await page.getByRole('option').first().click();
   await page.getByLabel('Random Seed').fill('-42');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(4000);
  await page.close();
  await browser.close()
  




});