// what is api
// types of api requests
    // Get ->get or request data from Api
    // Post -> send data to a api to create/update a resource
    //Put - >send data to a Api to create/update a resource
    //Delete -> removes specified resource
//Typical Api request
//Api url -> https url yo api . usally called api end-point
//header -> usually its content-type or authorization token
// method -> get/post/put/delete
//body -> json object with requested data ( for post or put)
//HTTP resoponse status codes
//2xx -> success
//3xx -> Redirection
//4xx ->client Error
//5xx ->server error
//web-browser(client) <--> APi(server)
//-> request
//<- reponse
//functional end-to-end testing(playwright)
//Mocking api testing (playwright)(increse speed,stability )(disadv breaking actuall integeration )
//Modify Api response
//Direct Api calls
import{test,expect} from '@playwright/test'
import tags from '../Data/mocking.json'
import { request } from 'http'
test.beforeEach('pre-setup',async({page})=>{
    //new mock config -> help playwright to know which api is to interscepted
    await page.route('*/**/api/tags',async route =>{
        //// set mocking before url so that it load before url open 
        await route.fulfill({
        body:JSON.stringify(tags)
    })
    })
/// modifiying api
    // await page.route('*/**/api/articles*',async route =>{
    //     const response = await route.fetch();
    //     const responseBody =  await response.json();
    //     responseBody.articles[0].title= "first modification"
    //     responseBody.articles[0].description = "in detail"
    //     await route.fulfill({
    //         body: JSON.stringify(responseBody)
    //     });
    // })
    await page.goto('https://conduit.bondaracademy.com/')
    //https://conduit-api.bondaracademy.com
})

test.describe('Api',()=>{
    test.skip('Mocking - Modifinging code',async ({page})=>{
        const pageName = await page.locator('.navbar-brand').getByText('conduit').textContent();
        expect(pageName).toEqual('conduit');
        await expect(page.locator('.navbar-brand').getByText('conduit')).toHaveText('conduit')
        const articlePreview = await page.locator('app-article-list');
        await expect(page.locator('app-article-list h1').nth(0)).toContainText('first modification');
        await expect(page.locator('app-article-list p').nth(0)).toContainText('in detail')
    })

    test('creating - deleting',({page,request})=>{
        await request.post('')
    })
})