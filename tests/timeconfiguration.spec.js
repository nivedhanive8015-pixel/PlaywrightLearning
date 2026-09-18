import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/loginpage';
import { type } from 'node:os';
test('Validate configuration', async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const loginPage = new LoginPage(page);
    await loginPage.login("Admin","admin123");
    await expect(page.getByRole('heading',{name :"Dashboard"})).toBeVisible();
    
    await page.getByRole('link',{name:"Time"}).click();
    const topbar_Attendance = page.locator('li.oxd-topbar-body-nav-tab').filter({hasText : "Attendance"});
    await topbar_Attendance.click();
    await page.getByRole('menuitem',{name : "Configuration"}).click();
    
    const configOne = page.getByText( "Employee can change current time when punching in/out", { exact: true });

    const configTwo = page.getByText("Employee can edit/delete own attendance records",{ exact: true });

    const configThree = page.getByText( "Supervisor can add/edit/delete attendance records of subordinates", { exact: true });

const configOneRow = configOne.locator('xpath=ancestor::div[contains(@class,"orangehrm-attendance-field-row")]')
.locator('.oxd-switch-wrapper');

const configTwoRow =configTwo.locator('xpath=ancestor::div[contains(@class,"orangehrm-attendance-field-row")]')
.locator('.oxd-switch-wrapper');

const configThreeRow= configThree.locator('xpath=ancestor::div[contains(@class,"orangehrm-attendance-field-row")]')
.locator('.oxd-switch-wrapper');

const configOneToggle = configOneRow.locator('input[type="checkbox"]');
const configTwoToggle = configTwoRow.locator('input[type = "checkbox"]');
const configThreeToggle =configThreeRow.locator('input[type ="checkbox"]');

const configOneLabel = configOneRow.locator('label');
const configTwoLabel = configTwoRow.locator('label');
const configThreeLabel = configThreeRow.locator('label');

if(!(await configOneToggle.isChecked())){
    await configOneLabel.click();
}
else{
    console.log("configonetoggle is already on");
}

if(!(await configTwoToggle.isChecked())){
    await configTwoLabel.click();
}
else{
    console.log("configtwotoggle is already on");
}

if(!(await configThreeToggle.isChecked())){
    await configThreeLabel.click();
}
else{
    console.log("configthree is already on");
}



});