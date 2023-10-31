import { test, expect } from '@playwright/test';
import { initializeContextAndPage } from './authentification';
test('Trained Models', async ({ browser }) => {
  const { context, page } = await initializeContextAndPage();
  //await page.pause()
  await page.getByRole('button', { name: 'Trained models' }).click();
  await page.getByLabel('Select dataset').click();
  await page.getByRole('listbox', { name: 'Select dataset' });
  const listboxText = await page.getByRole('listbox', { name: 'Select dataset' }).textContent();

  if (listboxText !== null && listboxText.trim() !== '') {
    console.log('Success: A list of imported datasets is shown. ');
    await page.getByRole('option').first().click();
  } else {
    console.log('Error: The displayed list of imported datasets is missing');
    await page.close()
  }

  await page.locator('div').filter({ hasText: /^Select target$/ }).locator('#combo-box-demo').click();
  await page.getByRole('option').first().click();
  await page.locator('div').filter({ hasText: /^Session name$/ }).click();
  await page.getByRole('option').first().click();
  const plots = await page.locator('.nsewdrag').first();
  await page.waitForSelector('.nsewdrag');
  const arePlotsVisible = await plots.isVisible();

  if (arePlotsVisible) {
    console.log('Plots are displayed correctly.');
  } else {
    console.log('Plots are not displayed.');
  }
  await page.waitForTimeout(3000);
  //await page.pause()
  await page.getByRole('button', { name: 'Predict' }).click();
  await page.getByLabel('models').click();
  await page.getByRole('option').first().getByRole('checkbox').check();
  await page.keyboard.press('Escape');
  //await page.pause()
  await page.getByLabel('File upload').check();
  await page.getByRole('button', { name: 'Select dataset' }).setInputFiles(process.env.INPUT_PREDICTION_PATH as string);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(5000)
  const downloadPromise = page.waitForEvent('download');
  await page.locator('.MuiTableCell-root > .MuiButtonBase-root').first().click();
  const download = await downloadPromise;
  console.log('Successful test');
  await browser.close();









});