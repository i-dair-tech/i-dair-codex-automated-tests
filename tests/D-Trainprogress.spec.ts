import { test, expect } from '@playwright/test';
import { initializeContextAndPage } from './authentification';
test('Train progress', async ({ browser }) => {
  const { context, page } = await initializeContextAndPage();
  await page.getByRole('button', { name: 'Group Training Progress' }).click();
  await page.waitForTimeout(6000);
  await page.close();
  await browser.close();
});