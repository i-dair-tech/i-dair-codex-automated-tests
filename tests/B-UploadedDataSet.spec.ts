import { test, expect } from '@playwright/test';
import { initializeContextAndPage } from './authentification';
test('uploaded DataSet', async ({ browser }) => {
const { context, page } = await initializeContextAndPage();


 try {

  await page.getByRole('button', { name: 'Uploaded Datasets' }).click();
  await page.waitForTimeout(2000);
const nodata = await page.getByText('No uploaded dataset yet ...');
 const isNodataVisible = await nodata.isVisible();

if (isNodataVisible) {
  console.log('Message: No uploaded dataset yet');
  await page.close();
} else { 
  await page.getByTitle('Details').first().click();
  await page.waitForTimeout(2000);
  const nextButton = await page.$('button:has-text("Next")');
  if (nextButton) {
    await nextButton.click();
  } else {
    console.log('Details were not displayed');
  }
  const previousButton = await page.$('button:has-text("Previous")');
  if (previousButton) {
    await previousButton.click();
  } else {
    console.log('Details were not displayed');
    // await page.close();
    // browser.close();
  }
  console.log('Details were displayed correctly');
  await page.getByRole('button', { name: 'Generate PDF' }).click();
  await page.waitForTimeout(12000);
  await page.getByRole('button', { name: 'Export Plots' }).click();
  //  await page.waitForTimeout(12000);
  await page.getByText('Go back').click();
  await page.getByTitle('Download').first().click();
  await page.waitForTimeout(2000);
  await page.getByTitle('Delete').first().click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'YES' }).click();
  const messageElement = await page.waitForSelector('div.MuiAlert-message.css-1xsto0d');
  const messageText = await messageElement.textContent();
  if (messageText === 'The dataset is successfully deleted') {
    console.log('Success: ' , messageText);
  } else {
    console.log('Error :  ', messageText);
  }
  await page.waitForTimeout(2000);
}
//await page.pause()

await page.getByTitle('Assign to group').first().click();
await page.getByLabel('Open').click();
const element = await page.getByText('No options').first().isVisible();

if (element) {


  
  console.log('There is no available group to assign this dataset to');
  await page.close();
 
    
   
 } else {
  await page.getByRole('option').first().click();
  await page.getByRole('button', { name: 'Submit' }).click();

console.log('The group has been assigned to the dataset correctly');
await page.getByLabel('My workspace').click();
await page.getByRole('option').nth(2).click();
await page.waitForTimeout(3000);
// const groupeElement= await page.getByRole('option').first();
// const affectedGroupElement= page.getByRole('cell').first();
// if (groupeElement && affectedGroupElement) {
//   const groupe = await groupeElement.textContent();
//   const affectedgroup = await affectedGroupElement.textContent();

//   if (groupe === affectedgroup) {
//     console.log('the data for the selected group is displayed correctly');
//   }
// }

}





} catch (error) {
  console.error( error);
}
finally {
  await page.close();
  await browser.close();

}


});