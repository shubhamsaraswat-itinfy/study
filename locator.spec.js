const{test,expect} = require('@playwright/test')

// test.beforeEach('pre-code',async({page})=>{
//   test.slow()
//   await page.goto('http://localhost:4200/pages/iot-dashboard');
//   await page.getByTitle('Forms').click();
//   await page.getByText('Form Layouts').click();
// })

test.describe.skip('Suit 1',()=>{
  test('locator',({page})=>{
    test.slow();
    //by input
    page.locator('input').first().click();


    //by id
    page.locator('#inputEmail')

    //by class value
    //page.locator('.shape-rectangle').click();

    //by attribute
    page.locator('[placeholder="Email"]');

    //class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]').click();
    
    //combine different locator
    page.locator('input[placeholder="Email"][nbinput]');

    //by xpath(not recommended)
    page.locator('//*[@id""]');

    //by partial text match
    page.locator(':text("Using")')

    //by exect text match
    page.locator(':text-is("Using the Grid")');

    
  })
})

  test.describe.skip('using facing locator',()=>{
   test('locator',async({page})=>{
      await page.getByText('textbox',{name: 'Email'}).click();
      await page.getByRole('button',{name: 'Sign in'}).click();
      await page.getByLabel('Email').click();
      await page.getByPlaceholder('Jane Doe').click();
      await page.getByTitle('playwright-test-admin Demo Application').click();
      await page.getByTestId('Sign in').click();
      //await page.getByAltText().click();

    }) 
  })

  test.describe.skip('Child locator',()=>{
    test('loactor',async ({page})=>{
      await page.locator('nb-card nb-radio :text("Option1")').click();
      await page.locator('nb-card').locator('nb-radio').locator(':text("Option2")').click();
      await page.locator('nb-card').getByRole('Button').locator(':text-is"Sign in"').click();
      await page.locator('nb-card').nth(3).getByRole('button',{name: "Submit"}).click();

    })
  })

  test.describe.skip('Parent locator',()=>{
    test('locator',({page})=>{

    })
  })

  test.describe.skip('reusing the locator',()=>{
    test('locator' , async ({page})=>{
      const basicform = page.locator('nb-card').filter({hasText: 'Basic form'});
      const  email =  basicform.getByRole('textbox',{name: "Email"});
      const pass =  basicform.getByPlaceholder('Password');
      const checkbox =  page.locator('nb-card').filter({has: page.locator('nb-checkbox')});
      const signin =  basicform.getByRole('button',{name: "Submit"});
      await signin.click();
      await checkbox.click();
      await pass.fill('asdaa');
      await email.fill('shubham');
    })
  })

    test.describe.skip('extracting values',()=>{
      test('extracting value',async({page})=>{
        const  formWithoutLabels = page .locator('nb-card').filter({hastext: 'Form without labels'});
        const buttontext = await  formWithoutLabels.getByRole('button',{name: 'Send'}).textContent();
        await expect(buttontext).toEqual('Send');
        //all values
        const  usingGrid = page .locator('nb-card').filter({hastext: 'Using the Grid '});
        const allTextvalue = await usingGrid.locator('nb-radio').allTextContents();
        expect(allTextvalue).toContain('Option 1');

        // inputValue
         const inlineform = page.locator('nb-card').filter({hastext: 'Inline form'});
         const name = inlineform.getByRole('textbox',{name: 'Jane Doe'})
         await name.fill('shubham');
         const input = await name.inputValue();
         expect(input).toEqual('shubham')

         // value of an attribute
         const placeholdervalue =  await  name.getAttribute('placeholder');
         expect(placeholdervalue).toEqual('Jane Doe');
      })
      
    })

    test.describe.skip('gernal assertion',()=>{
      test(' gernal assertion',async({page})=>{
      //gernal assertion did not wait
        const value = 5
      expect(value).toEqual(5);
      const  formWithoutLabels = page .locator('nb-card').filter({hastext: 'Form without labels'});
        const buttontext = await  formWithoutLabels.getByRole('button',{name: 'Send'}).textContent();
        await expect(buttontext).toEqual('Send');

      
      })

      test('locator assertion',async({page})=>{
       // locator assertion wait for 5 sec
      const  formWithoutLabels = page .locator('nb-card').filter({hastext: 'Form without labels'});
      const buttontext = await  formWithoutLabels.getByRole('button',{name: 'Send'});  
      await expect(buttontext).toHaveText('Send');
      })

      test('soft assertion',async({page})=>{
        //soft assertion allow execution after it got failed
         const  formWithoutLabels = page .locator('nb-card').filter({hastext: 'Form without labels'});
      const buttontext = await  formWithoutLabels.getByRole('button',{name: 'Send'});  
      await expect.soft(buttontext).toHaveText('Send');
      await buttontext.click();
      })
    })

    test.describe('Auto-Waiting',()=>{
      test.beforeEach('uitesting',async({page})=>{
        await page.goto('http://uitestingplayground.com/ajax');
        await page.locator('#ajaxButton').click();
        // we can change the default timeout from 30 sec to any value by going  playwright.config file and in defaul defineconfigure
       

      })
      test('auto - wait',async({page})=>{
        //action on which  wait works-> atteched ,visible,stable ,receives events ,enabled,editable
         const success = page.locator('.bg-success')
         await success.click();
         const textout  = await success.textContent();
        expect(textout).toEqual('Data loaded with AJAX get request.');
        await success.waitFor({state: "attached"})
        const alltextout = await success.allTextContents();
        expect(alltextout).toContain('Data loaded with AJAX get request.');
        
      })
    })
  
