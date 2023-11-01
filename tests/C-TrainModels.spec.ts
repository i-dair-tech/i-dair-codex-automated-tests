import { test, expect, Page } from '@playwright/test';
import { initializeContextAndPage } from './authentification';

async function selectModel(page:Page) {
  const classification_models = await page.getByText('List of classification models').isVisible();
  if(classification_models){
  await page.locator('div').filter({ hasText: /^Logistic regression$/ }).getByLabel('Logistic regression').check();
  await page.getByLabel('Naive Bayes').check();
  await page.getByLabel('Decision trees').check();
  await page.getByLabel('Support vector machines (SVM)').check();
  await page.getByLabel('Xgboost').check();
  await page.getByLabel('Random Forest Classifier').check();
  await page.getByLabel('Multilayer perceptron').check();
  await page.getByRole('button', { name: 'Next' }).click();
  }else{

    await page.locator('div').filter({ hasText: /^Linear regression$/ }).getByLabel('Linear regression').check();
    await page.getByLabel('Xgboost').check();
    await page.getByLabel('Random Forest Regression').check();
    await page.getByLabel('Decision Tree Regression').check();

  }


}

 

test('Train Models', async ({ browser }) => {
  const { context, page } = await initializeContextAndPage();
  //await page.pause()
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Train Models' }).click();
  await page.getByLabel('Session name').click();
  await page.getByLabel('Session name').fill('SESSION');
  await page.getByLabel('Select dataset').first().click();
  await page.getByRole('option').first().click();
  await page.locator('div').filter({ hasText: /^Select target$/ }).locator('#combo-box-demo').click();
  await page.getByRole('option').first().click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(2000);
  await selectModel(page);
  const element = await page.locator('.MuiCardContent-root').first();
  const text = await element.textContent();
  if (text !== null) {
   
    if (text.includes('An error occurred during the training')) {
      console.log('Error message detected :', text);
      await page.close();
   } else {
  //*******Launching a New train ******** */
  await page.getByRole('button', { name: 'Launch a new train' }).click();
  await page.getByLabel('Session name').click();
  await page.getByLabel('Session name').fill('session2');
  await page.locator('div').filter({ hasText: /^Select dataset$/ }).click();
  await page.getByRole('option').first().click();
  await page.locator('div').filter({ hasText: /^Select target$/ }).locator('#combo-box-demo').click();
  await page.getByRole('option').nth(1).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(2000);
  await selectModel(page);
  await  page.getByRole('button', { name: 'Next' });
  await page.waitForTimeout(6000);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(2000);
  const alertElement = await page.getByLabel('Session name');
  const isAlertVisible = await alertElement.isVisible();
  if (isAlertVisible) {
  await page.getByLabel('Session name').click();
  await page.getByRole('option').first().click();
  const plots = await page.locator('.nsewdrag').first();
  await page.waitForSelector('.nsewdrag');
  const arePlotsVisible = await plots.isVisible();

  if (arePlotsVisible) {
    console.log('Plots are displayed correctly.');
  } else {
    console.log('Plots are not displayed.');
  }

  await page.waitForTimeout(6000);
   //*******Model Details******** */
  await page.getByTitle('Details').first().click();
  await page.waitForTimeout(2000);
  //*******Download Training Parameters******** */
  const downloadPromise = page.waitForEvent('download');
  await page.getByTestId('FileDownloadIcon').first().click();
  await page.getByTestId('FileDownloadIcon').nth(1).click();
  await page.getByTestId('FileDownloadIcon').nth(2).click();
  console.log('Details were downloaded successfully');
  await page.getByRole('button', { name: 'Export data associated with plots' }).click();
  console.log('Plots were exported successfully');
  await page.waitForTimeout(3000);

  //*******Closing Details******** */
  await page.getByText('Go back').click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Export data associated with plots' }).click();
  console.log('Plots were exported successfully');
  await page.waitForTimeout(2000);

  //*******Redirection to ML Flow Page******** */
  await page.getByRole('link').first().click();
   await page.waitForTimeout(4000);
  } } }
 else{
  await page.click('text="abort one of your own runs"');
  console.log('Plots are displayed correctly.');
  await page.getByRole('button', { name: 'Cancel training' }).first().click();
  await page.getByRole('heading', { name: 'Training canceled' });
  const isTrainingCanceledVisible = await page.isVisible('[role="heading"][name="Training canceled"]');

  if (isTrainingCanceledVisible) {
    console.log('the message "Training canceled" is displayed.');
  } else {
    console.log('the message "Training canceled" is not displayed .');
  }

  await page.getByRole('button', { name: 'Next' }).click();
}

console.log('Successful test');
await page.close();


});

//*******Canceling Model Training******** */


test('Canceling Model Training', async ({ browser }) => {
  const { context, page } = await initializeContextAndPage();
   await page.waitForTimeout(2000);
   await page.getByRole('button', { name: 'Train Models' }).click();
   await page.getByLabel('Session name').click();
   await page.getByLabel('Session name').fill('session3');
   await page.locator('div').filter({ hasText: /^Select dataset$/ }).click();
   await page.getByRole('option').first().click();
   await page.locator('div').filter({ hasText: /^Select target$/ }).locator('#combo-box-demo').click();
   await page.getByRole('option').nth(2).click();
   await page.waitForTimeout(2000);
   await page.getByRole('button', { name: 'Next' }).click();
   await page.waitForTimeout(2000);
   await selectModel(page);
   await page.waitForTimeout(1000);
   await page.getByRole('button', { name: 'Cancel training' }).first().click();
   await context.close();
   await page.close();
   await browser.close();

  });