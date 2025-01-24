//Is a pattern used in the test automation to organize source code, improve maintainability and reusability of the code.

//there is no industry implementd standard

// two principle
//--> DRY - don't repeat yourself
//-=> KISS - keep it simple stupid
//two useful practice
//Descritive name
//Avois tiny method

import{test,expect} from '@playwright/test'
import{NavigationPage} from '../page-objects/NavigationPage'
import{formLayoutPage} from '../page-objects/formLayoutPage'
test.beforeEach('Pre-Req',async ({page})=>{
  test.slow()
    await page.goto('http://localhost:4200/pages/iot-dashboard');
})
test('naviagte to from page',async({page})=>{
  const navigateTo = new NavigationPage(page)
  await navigateTo.forLayoutPage();
  await navigateTo.forToastr();
  await navigateTo.forTooltip();
})
test('usingTheGrid',async({page})=>{
  const navigateTo = new NavigationPage(page);
  const formPage = new formLayoutPage(page);
  await navigateTo.forLayoutPage();
  await formPage.usingTheGrid('shubham@gmail.com','qwe@123');
})