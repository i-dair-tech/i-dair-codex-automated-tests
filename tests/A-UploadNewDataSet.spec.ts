import { test,Page} from '@playwright/test';
import { initializeContextAndPage } from './authentification';

async function initializePage() {
  const { context, page } = await initializeContextAndPage();
  //await Page2.goto('http://localhost:8087/');
  await page.getByLabel('Study name *').click();
  await page.getByLabel('Study name *').fill('HEART DATA');
  await page.getByLabel('Country *').click();
  await page.getByLabel('Country *').fill('Tunisia');
  return page;
}



async function checkErrorMessage(page:Page, expectedMessage: string) {
  const messageElement = await page.waitForSelector('[role="alert"]');
  const messageText = await messageElement.textContent();

  if (messageText === expectedMessage) {
    console.log('error : the error message is not displayed correctly');
  } else {
    console.log('Success : the error message "There is an issue with your dataset" is displayed correctly');
  }
}

async function checkSuccessMessage(page:Page, expectedMessage:string) {

const messageElement2 = await page.getByText('File uploaded successfully');
const messageText2 = await messageElement2.textContent();
if (messageText2 === 'File uploaded successfully') {
console.log('Success: The file is successfully uploaded, and a confirmation message is displayed correctly');
} else {
console.log('Error : the confirmation message is not displayed correctly ', messageText2);
}
const messageElement = await page.getByRole('heading', { name: 'The descriptive statistics generated successfully' });
const messageText = await messageElement.textContent();
if (messageText === 'The descriptive statistics generated successfully') {
console.log('Success: the descriptive statistics are generated successfully');
} else {
console.log('Error : The upload failed to complete. ', messageText);
}

}


 //*******Valid file Upload******** */

  

test('file Upload', async ({browser}) => {
  const page = await initializePage();
  await page.getByRole('button', { name: 'Select dataset' }).setInputFiles(process.env.INPUT_FILE_PATH as string);
  //variable d'environnemnnn instad 
  await page.getByRole('main').getByRole('button', { name: 'Upload Dataset' }).click();
  await page.waitForTimeout(2000);
  checkSuccessMessage(page, 'File uploaded successfully');
  await page.getByRole('button', { name: 'ok' }).click();
  await page.waitForTimeout(2000);
  await page.close();

  
 
 
 });

  //*******required fields******** */
 
  test.only('required fields', async ({browser}) => {
    const Page1 = await initializePage();
    //await Page1.goto('http://localhost:8087/');
  await Page1.goto('https://qa1.i-dair.africa/');
  await Page1.waitForTimeout(5000);
  await Page1.getByRole('main').getByRole('button', { name: 'Upload Dataset' }).click();
  await Page1.waitForTimeout(6000);
  const messageElementA = await Page1.getByText('The file is required');
  const messageTextA = await messageElementA.textContent();
  if (messageTextA === 'The file is required') {
    console.log('Successful test: the application correctly identifies missing required fields');
  } else {
    console.log('Test failed: The application does not correctly indicate missing required fields');
  }
  
  await Page1.close();

 });

 //*******File name with special characters******** */


test('File name with special characters', async () => {
  const Page2 = await initializePage();
  await Page2.getByRole('button', { name: 'Select dataset' }).setInputFiles(process.env.INPUT_FILE_with_SC_PATH as string);
  await Page2.waitForTimeout(1000);
  await Page2.getByRole('main').getByRole('button', { name: 'Upload Dataset' }).click();
  checkSuccessMessage(Page2, 'The File uploaded successfully');
  await Page2.waitForTimeout(6000);
  await Page2.getByRole('button', { name: 'ok' }).click();
  await Page2.waitForTimeout(6000);
  await Page2.close();



});

 //*******Small File Size******** */


test('File size  ', async () => {
  const Page3 = await initializePage();
  await Page3.getByRole('button', { name: 'Select dataset' }).setInputFiles(process.env.INPUT_FILE_SIZE_PATH as string);
  await Page3.getByRole('main').getByRole('button', { name: 'Upload Dataset' }).click();
  await Page3.waitForTimeout(1000);
  await checkSuccessMessage(Page3, 'File uploaded successfully');
  await Page3.waitForTimeout(6000);
  await Page3.getByRole('button', { name: 'ok' }).click();
  await Page3.waitForTimeout(6000);
  await Page3.close();


});


//*******Empty file upload******** */


test('Empty file ', async () => {
  const Page4 = await initializePage();
  await Page4.getByRole('button', { name: 'Select dataset' }).setInputFiles(process.env.INPUT_FILE_Empty_PATH as string);
  await Page4.getByRole('main').getByRole('button', { name: 'Upload Dataset' }).click();
  checkErrorMessage(Page4, 'Oops! It seems there\'s an issue with your dataset.')
  await Page4.waitForTimeout(2000);
  await Page4.close();
  
  
 
  });




   //*******Invalid file format******** */


   test('Invalid file format', async () => {
    const Page5 = await initializePage();
    await Page5.getByRole('button', { name: 'Select dataset' }).setInputFiles(process.env.INPUT_FILE_PDF_PATH as string);
    await Page5.getByRole('main').getByRole('button', { name: 'Upload Dataset' }).click();
    checkErrorMessage(Page5, 'Oops! It seems there\'s an issue with your dataset.')
    await Page5.waitForTimeout(12000);
    await Page5.getByLabel('Study name *').click();
    await Page5.getByLabel('Study name *').fill('Test Invalid file format');
    await Page5.getByLabel('Country *').click();
    await Page5.getByLabel('Country *').fill('Tunisia');
    await Page5.getByRole('button', { name: 'Select dataset' }).setInputFiles(process.env.INPUT_FILE_PNG_PATH as string);
    await Page5.getByRole('main').getByRole('button', { name: 'Upload Dataset' }).click();
    checkErrorMessage(Page5, 'Oops! It seems there\'s an issue with your dataset.')
    await Page5.waitForTimeout(3000);
    await Page5.close();
    
    

  });


   






 


