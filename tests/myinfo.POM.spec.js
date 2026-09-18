import { test,expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { MyInfo } from '../pages/myinfo';

test( "Myinfo using POM",async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const loginPage = new LoginPage(page);
    await loginPage.login("Admin","admin123");
    await expect(page.getByRole('heading',{name :"Dashboard"})).toBeVisible();

    const myEmployeeInfo = new MyInfo(page);
    await myEmployeeInfo.openMyInfo();
    await myEmployeeInfo.openAddAttachment();
    await myEmployeeInfo.uploadFiles("C:/Users/ravir/OneDrive/Desktop/javascript.txt"); 
    await myEmployeeInfo.addComments    ("Uploaded Files");
    await myEmployeeInfo.saveInfo();
});