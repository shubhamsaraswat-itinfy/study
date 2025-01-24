const{test} = require('@playwright/test');

test('test 1',async ({page})=>{
  await page.goto('');
})

test.describe.skip('suite 1',async ()=>{
  test('suite 1 test 1', async({page})=>{
    await page.goto('https://www.youtube.com/');
  })

  test('suite 2 test 2', async({page})=>{
    await page.goto('https://www.facebook.com/');
  })
})

test.describe.skip('suite 2',async ()=>{
  test.slow();
  test('suite 2 test 1', async({page})=>{
    await page.goto('https://www.youtube.com/');
  })

  test('suite 2 test 2', async({page})=>{
    await page.goto('https://www.facebook.com/');
  })
})