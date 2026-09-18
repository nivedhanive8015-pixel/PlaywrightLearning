import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/loginpage';
test('Validate timesheet', async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const loginPage = new LoginPage(page);
    await loginPage.login("Admin","admin123");
    await expect(page.getByRole('heading',{name :"Dashboard"})).toBeVisible();
    
    await page.getByRole('link',{name:"Time"}).click();
    const timeTimesheets=page.getByRole('heading',{name:"Timesheets"}).nth(0);
    await expect(timeTimesheets).toBeVisible();
    await expect(page.getByRole('heading',{name :"Select Employee"})).toBeVisible();
    const employeeName = await page.getByPlaceholder('Type for hints...');
    await employeeName.fill("Ranga");
    const suggestion = page.getByText("Ranga Akunuri", { exact: true }).first();
    await expect(suggestion).toBeVisible();
    await suggestion.click();
    const timeSheet_View = page.locator('button.orangehrm-left-space').filter({ hasText: "View" });
    await timeSheet_View.click();
    await expect(page.getByRole('heading',{name :"Timesheet for Ranga Akunuri"})).toBeVisible();
    const noTimesheetFound = page.getByText("No Timesheets Found", { exact: true });
    const timesheetsFound = page.getByText(/^\(\d+\)\s*Timesheets Found$/);
    if(await noTimesheetFound.isVisible()){
        console.log("No Timesheets Found");
    }
    else if (await timesheetsFound.isVisible()) {
    console.log("Timesheets Found");
    }
    await page.getByRole('button',{name :" Edit "}).click();
    await expect(page.getByRole('heading',{name : "Edit Timesheet for Ranga Akunuri"})).toBeVisible();
    const projectHeader = page.locator('th.orangehrm-timesheet-table-header-cell').filter({hasText:"Project"});
    await expect(projectHeader).toBeVisible();
    const projectInput =page.getByPlaceholder("Type for hints...");
    await projectInput.fill("ACME");
    await page.pause();
    const inputSuggestion = page.getByText("ACME Ltd - ACME Ltd", { exact: true });
    await expect(inputSuggestion).toBeVisible();
    await inputSuggestion.first().click();
    const activity = page.locator('th.orangehrm-timesheet-table-header-cell').filter({hasText :"Activity"});
    await expect(activity).toBeVisible();
    const dropdownActivity = page.locator('tr.orangehrm-timesheet-table-body-row').first()
    .locator('td').nth(1)
    .locator('.oxd-select-text-input');
    await dropdownActivity.click();
    await page.getByText("Customizations", { exact: true });
    await expect(dropdownActivity).toContainText("Customizations");
    const monHeader = page.getByRole('columnheader',{name : /Mon/});
    await expect(monHeader).toBeVisible();
    const tueHeader =page.getByRole('columnheader',{name : /Tue/});
    await expect(tueHeader).toBeVisible();
    const wedHeader=page.getByRole('columnheader',{name : /Wed/});
    await expect(wedHeader).toBeVisible();
    const thuHeader =page.getByRole('columnheader',{name : /Thu/});
    await expect(thuHeader).toBeVisible();
    const friHeader =page.getByRole('columnheader',{name : /Fri/});
    await expect(friHeader).toBeVisible();
    const satHeader =page.getByRole('columnheader',{name : /Sat/});
    await expect(satHeader).toBeVisible();
    const sunHeader =page.getByRole('columnheader',{name : /Sun/});
    await expect(sunHeader).toBeVisible();
    const monday = page.locator('tr.orangehrm-timesheet-table-body-row').first()
    .locator('td').nth(2)
    .locator('input');
    await monday.fill("8");
    await expect(monday).toHaveValue("8");
    const tuesday = page.locator ('tr.orangehrm-timesheet-table-body-row').first()
    .locator('td').nth(3)
    .locator('input');
    await tuesday.fill("8");
    await expect(tuesday).toHaveValue("8");
    const wednesday = page.locator ('tr.orangehrm-timesheet-table-body-row').first()
    .locator('td').nth(4)
    .locator('input');
    await wednesday.fill("8");
    await expect(wednesday).toHaveValue("8");
    const thursday = page.locator ('tr.orangehrm-timesheet-table-body-row').first()
    .locator('td').nth(5)
    .locator('input');
    await thursday.fill("8");
    await expect(thursday).toHaveValue("8");
    const friday = page.locator ('tr.orangehrm-timesheet-table-body-row').first()
    .locator('td').nth(6)
    .locator('input');
    await friday.fill("8");
    await expect(friday).toHaveValue("8");
    const saturday = page.locator ('tr.orangehrm-timesheet-table-body-row').first()
    .locator('td').nth(7)
    .locator('input');
    await saturday.fill("0");
    await expect(saturday).toHaveValue("0");
    const sunday = page.locator ('tr.orangehrm-timesheet-table-body-row').first()
    .locator('td').nth(8)
    .locator('input');
    await sunday.fill("0");
    await expect(sunday).toHaveValue("0");
    await page.getByRole('button',{name :"Save"}).click();

    await page.pause();





    
    
  

    
});