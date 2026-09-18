import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/loginpage';
test('Validate timesheetdropdown', async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const loginPage = new LoginPage(page);
    await loginPage.login("Admin","admin123");
    await expect(page.getByRole('heading',{name :"Dashboard"})).toBeVisible();
    
    await page.getByRole('link',{name:"Time"}).click();
    const timeTimesheets=page.getByRole('heading',{name:"Timesheets"}).nth(0);
    await expect(timeTimesheets).toBeVisible();
    const topBar_Timesheets = page.locator('li.oxd-topbar-body-nav-tab').filter({hasText:"Timesheets"});
    await topBar_Timesheets.click();
    const myTimesheet=await page.getByRole('menuitem',{name : "My Timesheets"});
    await expect(myTimesheet).toBeVisible();
    await myTimesheet.click();
    await expect(page.getByRole("heading",{name :"My Timesheet"})).toBeVisible();
    const timeSheets_NoRecords = page.getByText("No Records Found",{exact :true}).first();
    await expect(timeSheets_NoRecords).toBeVisible();
    const timesheets_Status =page.getByText("Status: Not Submitted",{exact : true}).first();
    await expect(timesheets_Status).toBeVisible();
    
});
