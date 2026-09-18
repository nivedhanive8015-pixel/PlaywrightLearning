import {test , expect } from '@playwright/test';
test('verify the login functionality' , async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page).toHaveTitle(/OrangeHRM/);
    await expect (page.getByRole('heading' , {name : "Login"})).toBeVisible();
    await expect (page.getByText ("Username : Admin")).toBeVisible();
    await expect (page.getByText ("Password : admin123")).toBeVisible();
    await page.getByRole('textbox' ,{name: "Username"}).fill("Admin");
    await expect(page.getByRole('textbox' ,{name: "Username"})).toHaveValue("Admin");
    await page.getByRole('textbox' ,{name : "Password"}).fill("admin123");
    await expect (page.getByRole('textbox' ,{name: "Password"})).toHaveValue("admin123");
    await page.getByRole('button',{name: "Login"}).click();
    await expect(page.getByRole("heading" , {name : "Dashboard"})).toBeVisible();
    await page.pause();
    
   
});


/*to perform this validation i need to import the test and expect functions from playwrightpackage.
 * creating a test script name ,to run the script i need the browser tab(page represent the browser tab) and this validation involved asynchronous operation hence await.
 * using page playwright object and goto playwright method to launch the application 
 * after launching verified the actual result matches with expected result (so using playwright assertion (expect))
 * using the locators to identify the web element based on the accessible role
 * then compare the actual result against expect result
 * until then await waits to complete the line before moving to next line
 * the locator is passed directly to expect() instead of storing it in a separate variable making code shorter and easier to read
 * if the entered password is incorrect you should use getbytext to see the error message assertion is tobevisible
 * Navigated to the Admin page.
*Stored the dropdown in a variable.
*Clicked the dropdown.
*Selected the Admin option.
*Verified the dropdown text with toContainText().*/