import { test, expect } from '@playwright/test';
test.beforeEach('pre-code',async ({page})=>{
  test.slow()
  //await page.goto('http://localhost:4200/pages/iot-dashboard');
  await page.goto('https://globalsqa.com/demo-site/draganddrop/')
  
})

test.describe('Ui - component',()=>{
  test.skip('input',async({page})=>{
    await page.getByTitle('Forms').click();
  await page.getByTitle('Form Layouts').click();
  const usingGrid = page.locator('nb-card').filter({hasText:'Using the Grid'})
  const email = usingGrid.getByRole('textbox',{name:'email'});
  await email.fill('learning@gmail.com');
  //playwright don't allow->await email.fill('learning@gmail.com').clear();
  await email.clear();
  await email.pressSequentially('learning2@gmail.com',{delay:500});
  //input value 
   const inputValueEmail = await   email.inputValue();
  
  //gernal assertion 
    expect(inputValueEmail).toEqual('learning2@gmail.com');   
    //locator assertion
    await expect(email).toHaveText('learning2@gmail.com'); 
  })

  test.skip('radio -button',async ({page})=>{
    await page.getByTitle('Forms').click();
  await page.getByTitle('Form Layouts').click();
     const usingGrid = page.locator('nb-card').filter({hasText:'Using the Grid'});
    await usingGrid.getByLabel('Option 1').check({force:true});
    await usingGrid.getByRole('radio',{name:'Option 1'}).check({force: true});
//     { force: true } is an option that can be used to overcome certain challenges:
// Visibility: If the radio button is initially hidden or not visible on the screen, force: true might still allow you to interact with it.
// Interactability: If the radio button is initially disabled or not interactable, force: true might still allow you to check it.
    //assertion 1
    const radiostatus = await usingGrid.getByRole('radio',{name:'Option 1'}).isChecked();
    expect(radiostatus).toBeTruthy();
    //assertion 2
    await expect(usingGrid.getByRole('radio',{name:"Option 2"})).toBeChecked();

    //option 2
     await usingGrid.getByRole('radio',{name:'Option 2'}).check({force: true});
     const statusoption1 = usingGrid.getByRole('radio',{name:'Option 1'}).isChecked();
     expect(statusoption1).toBeFalsy();
     expect(usingGrid.getByRole('radio',{name:'Option 2'}).isChecked()).toBeTruthy();
  })
  test.skip('check-box',async({page})=>{
    await page.getByTitle('Modal & Overlays').click();
    await page.getByTitle('Toastr').click();
    await page.getByRole('checkbox',{name: 'Hide on click' }).click({force: true});
    //await page.getByRole('checkbox',{name: 'Hide on click' }).check({force: true});//check the box but for uncheck we need to right seperate command .therefore, by using check two type checkbok don't uncheck the
    //await page.getByRole('checkbox',{name: 'Hide on click' }).uncheck({force: true});

    //
    const allcheckbox =  await page.getByRole('checkbox') ;
    for(const box of await allcheckbox.all()  ){ //.all() used for iteration and make allcheckbox an array and .all() return promise so we use await
      await box.check({force: true});
      expect(box.isChecked()).toBeTruthy();

    }
  })
   test.skip('list',async({page})=>{
      const lists = page.locator('ngx-header  nb-select')
      await lists.click()
      page.getByRole('list')//when the list has a ul tag
      page.getByRole('listitem')//when the list has li tag
      const alllistItem = page.locator('nb-option-list nb-option');
      await expect(alllistItem).toHaveText(["Light","Dark","Cosmic","Corporate"]);
      await alllistItem.filter({hasText:"Dark"}).click()
      const colorchange = page.locator('nb-layout-header');
      await expect(colorchange).toHaveCSS('background-color',"rgb(34, 43, 69)");
      // each color change
      const colors ={
        "Light":"rgb(255, 255, 255)",
        "Dark":"rgb(34, 43, 69)",
        "Cosmic":"rgb(50, 50, 89)",
        "Corporate":"rgb(255, 255, 255)",
      }
       await lists.click()
       for(const color in colors){
          await alllistItem.filter({hasText:color}).click();
          const header = page.locator('nb-layout-header');
          await expect(header).toHaveCSS('background-color',colors[color]);
          if(color != 'Corporate')
            await lists.click();
       }
    })
    test.skip('dialog-box' , async({page})=>{
      await page.getByTitle('Tables & Data').click();
      await page.getByTitle('Smart Table').click();
        await page.on('dialog',dialog =>{
          expect(dialog.message()).toEqual('Are you sure you want to delete?')
          dialog.accept()
        })
      const table =  page.locator('ng2-smart-table table');
      const header = await table.locator('tr',{hasText: 'mdo@gmail.com'}).locator('.nb-trash')
      await header.click();
      //playwright automatic handle the dilog box and cancel it
      await expect(page.locator('table tr').first()).not.toHaveText( 'mdo@gmail.com');

    })
    test.skip('webtable 1',async ({page})=>{
       
      const row  = await page.getByRole('row',{name : 'ann@gmail.com'})
      await row.click()
      await row.locator('.nb-edit').click();
      await page.locator('input-editor').getByPlaceholder('Age').clear();
      await page.locator('input-editor').getByPlaceholder('Age').fill('55');
      await page.locator('.nb-checkmark').click();
    })

  test.skip('webtable 2',async ({page})=>{
      await page.getByTitle('Tables & Data').click();
      await page.getByText('Smart Table').click();
      await page.locator('[class ="ng2-smart-pagination-nav ng-star-inserted"]').getByText('2').click();
      const coloum= page.getByRole('row',{name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')});
      await coloum.locator('.nb-edit').click();
      await page.locator('input-editor').getByPlaceholder('E-mail').clear();
       await page.locator('input-editor').getByPlaceholder('E-mail').fill('shubhaam@gmail.com');
       await page.locator('.nb-checkmark').click();
    //error   expect(coloum.locator('td').nth(5)).toHaveText('shubhaam@gmail.com');
    })

    test.skip('webtable3',async ({page})=>{
      await page.getByTitle('Tables & Data').click();
      await page.getByText('Smart Table').click();
      const filterbox = page.locator('input-filter');
      
      const ages = ["20","30","500"];
      for(const age of ages){
        const filterage = await  filterbox.getByPlaceholder('Age');
        await filterage.fill(age);
        await page.waitForTimeout(500);
        //await page.locator('tbody').click()
        const rowsall =  page.locator('tbody tr');
        for(const row of await rowsall.all()){
            const ageColumn = await row.locator('td').last().textContent();
            await page.waitForTimeout(500);
            if(age=='500'){
              const outmessage = await page.locator('tbody').locator(' No data found ').textContent();
              console.log(' No data found ');
            }else{
                expect(ageColumn).toEqual(age)
            }
        }
      }
    })

    test.skip('date-picker page',async ({page})=>{
      await page.getByTitle('Forms').click();
      await page.getByTitle('Datepicker').click();
      await page.getByPlaceholder("Form Picker").click();
      
      //date object-handle dynamicly
      let date = new Date();
      date.setDate(date.getDate()+18)
      const expectedDate =date.getDate().toString();
      const expectedyear = date.getFullYear();
      const month = date.toLocaleString('En-US',{month: 'short'});

      const dateToAssert = `${month} ${expectedDate}, ${expectedyear}`
      // await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate,{exact: true}).click();
      // expect(page.getByPlaceholder("Form Picker")).toHaveValue(dateToAssert);

      //month switching and validate
      let monthslider = await page.locator('nb-calendar-view-mode').textContent();
      const monthlong = date.toLocaleString('En-US' , {month: 'long'})
    const dateToMove = ` ${monthlong} ${expectedyear}`
      console.log(dateToMove);
      while(!monthslider.includes(dateToMove)){
        await page.locator('nb-calendar-pageable-navigation ').locator('[data-name="chevron-right"]').click()
        monthslider = await page.locator('nb-calendar-view-mode').textContent();
      }
      await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate,{exact: true}).click();
      expect(page.getByPlaceholder("Form Picker")).toHaveValue(dateToAssert);
    })
    test.skip('scroller ',async({page})=>{
      //shortcut for draging
      const tempDragger = await page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');
      // await tempDragger.evaluate(node =>{
      //   node.setAttribute('cx','116.12');
      //   node.setAttribute('cy','11.193');
      // }) 
      await tempDragger.click()
      //simulate real mouse movement for dragger
      const Dragger = await page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
      await Dragger.scrollIntoViewIfNeeded();//scroll and make screen visible
      const box = await Dragger.boundingBox();// bounding box make a x-y axis
      const x = box.x + box.width/2//for center x axis
      const y = box.y +box.height/2;//for center y axis
      await page.mouse.move(x,y);
      await page.mouse.down();//grab the mouse
      await page.mouse.move(x+100,y)//simulate keyboar left arrow
      await page.mouse.move(x+100,y+100)//simulate keybord right
      await page.mouse.up();//release the mouse
      await  expect(Dragger).toContainText('30');
    })
    test('drag and drop',async({page})=>{
      //iframe
      const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
       await frame.locator('li',{hasText: 'High Tatras 2'}).dragTo(frame.locator('#trash'))

      //more presice control
      await frame.locator('li',{hasText: 'High Tatras 4'}).hover();
      await page.mouse.down()
      await frame.locator('#trash').hover()
      await page.mouse.up()

      await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2","High Tratras 4"]);

    })
})