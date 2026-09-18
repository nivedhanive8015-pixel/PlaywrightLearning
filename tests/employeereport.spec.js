import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/loginpage';
test('Validate Employee Reports', async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const loginPage = new LoginPage(page);
    await loginPage.login("Admin","admin123");
    await expect(page.getByRole('heading',{name :"Dashboard"})).toBeVisible();
    
    await page.getByRole('link',{name:"Time"}).click();
    const reportsTab = page.locator('.oxd-topbar-body-nav-tab').filter({ hasText: "Reports" });
    await reportsTab.click();
    await page.getByRole('menuitem',{name :"Employee Reports",exact :true}).click();
    await expect(page.getByRole('heading',{name :"Employee Report"})).toBeVisible();
    const employeeName = page.getByText("Employee Name",{exact : true})
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
    .locator('.oxd-autocomplete-text-input');
    const employeeNameInput = employeeName.getByPlaceholder("Type for hints...");
    await employeeNameInput.fill("Rebe");
    const nameSuggestion = page.getByText("Rebecca Harmony",{exact :true});
    await expect(nameSuggestion).toBeVisible();
    await nameSuggestion.click();

    const projectName = page.getByText("Project Name",{exact :true})
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
    .locator('.oxd-autocomplete-text-input');
    const projectNameInput = projectName.getByPlaceholder("Type for hints...");
    await projectNameInput.fill("Internal");
    const projectName_Suggestion = page.getByText("Internal - General HR Tasks",{exact :true});
    await expect(projectName_Suggestion).toBeVisible();
    await projectName_Suggestion.click();

    const activityName = page.getByText("Activity Name",{exact :true})
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
    .locator('.oxd-select-text');
    await activityName.click();

   const selectDropDown = page.getByRole("option",{name :"Payroll Administration",exact:true });
   await expect(selectDropDown).toBeVisible();
   await selectDropDown.click();

   const projectDateRange = page.getByText("Project Date Range",{exact:true})
   .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
   .locator('.oxd-date-wrapper');
   const fromDateInput =projectDateRange.locator('.oxd-date-input');

   const fromProject= fromDateInput.getByPlaceholder("From");
   const calendarIcon = fromDateInput.locator('.oxd-icon.bi-calendar.oxd-date-input-icon');
   await calendarIcon.click();
   const fromCalendarPopUp = page.locator('.oxd-calendar-wrapper');
   const fromMonth = fromCalendarPopUp.locator('.oxd-calendar-selector-month-selected');
   const fromYear = fromCalendarPopUp.locator('.oxd-calendar-selector-year-selected');
   const fromNextButton = fromCalendarPopUp.locator('button:has(.bi-chevron-right)');
   const fromPreviousButton = fromCalendarPopUp.locator('button:has(.bi-chevron-left)');
   const targetFromMonth = "October";
   const targetFromYear = "2026";

   let currentFromMonth = await fromMonth.textContent();
   let currentFromYear = await fromYear.textContent();

   const employeeMonths =
    {
        January :1,
        February :2,
        March :3,
        April :4,
        May :5,
        June :6,
        July :7,
        August :8,
        September :9,
        October :10,
        November :11,
        December :12
}
   

   while(currentFromYear!==targetFromYear||currentFromMonth!==targetFromMonth){
    if(Number(currentFromYear)<Number(targetFromYear)){
        await fromNextButton.click();
    }
    else if (Number(currentFromYear)>Number(targetFromYear)){
        await fromPreviousButton.click();
    }
    else{

    if(employeeMonths[currentFromMonth]<employeeMonths[targetFromMonth]){
        await fromNextButton.click();
    }

    else if (employeeMonths[currentFromMonth]>employeeMonths[targetFromMonth]){
        await fromPreviousButton.click();
    }
   }
   currentFromMonth = await fromMonth.textContent();
   currentFromYear = await fromYear.textContent();

}
await page.locator('.oxd-calendar-date').filter({hasText : /^10$/}).click();

const reportTo=page.getByPlaceholder("To");
const reportToWrapper =reportTo.locator('xpath=ancestor::div[contains(@class,"oxd-date-wrapper")]');

const reportToInput =reportToWrapper.locator('.oxd-date-input');
const reporToCalendarIcon =reportToWrapper.locator('.oxd-icon.bi-calendar.oxd-date-input-icon');
const reportToCalendarPopUp = reportToWrapper.locator('.oxd-calendar-wrapper');
await reporToCalendarIcon.click();
const reportToMonth = reportToCalendarPopUp.locator('.oxd-calendar-selector-month-selected');
const reportToYear = reportToCalendarPopUp.locator('.oxd-calendar-selector-year-selected');
const reportToNextButton =reportToCalendarPopUp.locator('button:has(.bi-chevron-right)');
const reportToPreviousButton = reportToCalendarPopUp.locator('button:has(.bi-chevron-left)');
const targetReportToMonth = 'April';
const targetReportToYear = '2026';

let currentReportToMonth = await reportToMonth.textContent();
let currentReportToYear =await reportToYear.textContent();

const toMonths = {
    January :1,
        February :2,
        March :3,
        April :4,
        May :5,
        June :6,
        July :7,
        August :8,
        September :9,
        October :10,
        November :11,
        December :12
}
    
while(currentReportToYear!==targetReportToYear||currentReportToMonth!==targetReportToMonth){
    if(Number(currentReportToYear)<Number(targetReportToYear)){
        await reportToNextButton.click();
    }
    else if (Number(currentReportToYear)>Number(targetReportToYear)){
        await reportToPreviousButton.click();
    }
    else{
        if(toMonths[currentReportToMonth]<toMonths[targetReportToMonth]){
            await reportToNextButton.click();
        }
        else if (toMonths[currentReportToMonth]>toMonths[targetReportToMonth]){
            await reportToPreviousButton.click();
        }
    }
    currentReportToMonth = await reportToMonth.textContent();
    currentReportToYear = await reportToYear.textContent();
}
await reportToCalendarPopUp.locator('.oxd-calendar-date').filter({hasText:/^1$/}).click();

const employeeToggleText= page.getByText("Only Include Approved Timesheets",{exact:true});
await expect(employeeToggleText).toBeVisible();
const employeeToggleGrid = employeeToggleText.locator('xpath=ancestor::div[contains(@class,"orangehrm-switch-filter")]');
const employeeToggleWrapper =employeeToggleGrid.locator('.oxd-switch-wrapper');
const employeecheckbox=employeeToggleWrapper.locator('input[type = "checkbox"]');
const employeeToggleLabel =employeeToggleWrapper.locator('label');
if(await employeecheckbox.isChecked()){
    console.log("its already turned on");
}
else{
    await employeeToggleLabel.click();
}

await page.getByRole('button',{name : "View"}).click();


});