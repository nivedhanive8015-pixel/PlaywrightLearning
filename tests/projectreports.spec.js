import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/loginpage';
test('Validate Project Reports', async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const loginPage = new LoginPage(page);
    await loginPage.login("Admin","admin123");
    await expect(page.getByRole('heading',{name :"Dashboard"})).toBeVisible();
    
    await page.getByRole('link',{name:"Time"}).click();
    const reportsTab = page.locator('.oxd-topbar-body-nav-tab').filter({ hasText: "Reports" });
    await reportsTab.click();
await page.getByRole('menuitem',{name : "Project Reports"}).click();
await expect(page.getByRole('heading',{name :"Project Report"})).toBeVisible();
const projectName = page.locator('label:has-text("Project Name")')
.locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
.locator('.oxd-autocomplete-text-input');
const enterProjectName=  page.getByPlaceholder("Type for hints...");
await enterProjectName.fill("Internal");
const projectNameSuggestion = page.getByText("Internal - Training and Development",{exact :true});
await expect(projectNameSuggestion).toBeVisible();
await projectNameSuggestion.click();
await expect(enterProjectName).toHaveValue("Internal - Training and Development");
const projectDateRange = page.locator('label:has-text("Project Date Range")')
.locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
.locator('.oxd-date-input');


const count = await projectDateRange.count();
console.log("PROJECT DATE COUNT =", count);
const fromDate = page.getByPlaceholder("From")
.locator('xpath=ancestor::div[contains(@class,"oxd-date-input")]');
const reportCalendar = fromDate.locator('.oxd-icon.bi-calendar.oxd-date-input-icon')
await reportCalendar.click();
const reportCalendarPopUp =page.locator('.oxd-date-input-calendar');
console.log("Calendar popup  count:",await reportCalendarPopUp.count());
const reportMonth = reportCalendarPopUp.locator('.oxd-calendar-selector-month-selected');
const reportYear =reportCalendarPopUp.locator('.oxd-calendar-selector-year-selected');
const reportNextButton = reportCalendarPopUp.locator('button:has(.bi-chevron-right)');
const reportPreviousButton = reportCalendarPopUp.locator('button:has(.bi-chevron-left)');
const reportTargetMonth = "June";
const reportTargetYear = "2026";
let reportCurrentMonth = await reportMonth.textContent();
let reportCurrentYear = await reportYear.textContent();

const reportMonths={
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

while(reportCurrentYear!==reportTargetYear||reportCurrentMonth!==reportTargetMonth){
    if(Number(reportCurrentYear)<Number(reportTargetYear)){
        await reportNextButton.click();
    }
    else if(Number(reportCurrentYear)>Number(reportTargetYear)){
        await reportPreviousButton.click();
    }
    else{
        if(reportMonths[reportCurrentMonth]<reportMonths[reportTargetMonth]){
            await reportNextButton.click();
        }
        else if(reportMonths[reportCurrentMonth]>reportMonths[reportTargetMonth]){
            await reportPreviousButton.click();
        
        }
        }
        reportCurrentMonth = await reportMonth.textContent();
        reportCurrentYear = await reportYear.textContent();
    } 


await page.locator('.oxd-calendar-date') .filter({ hasText: /^1$/ }).click();

const reportTo = page.getByPlaceholder("To")
.locator('xpath=ancestor::div[contains(@class,"oxd-date-wrapper")]');
const reportToCalendar = reportTo.locator('.oxd-icon.bi-calendar.oxd-date-input-icon');
await reportToCalendar.click();
const reportToPopUp = reportTo.locator('.oxd-date-input-calendar');
const reportToMonth = reportToPopUp.locator('.oxd-calendar-selector-month-selected');
const reportToYear =reportToPopUp.locator('.oxd-calendar-selector-year-selected');
const reportToNextButton =reportToPopUp.locator('button:has(.bi-chevron-right)');
const reportToPreviousButton =reportToPopUp.locator('button:has(.bi-chevron-left)');
let reportCurrentToMonth = await reportToMonth.textContent();
let reportCurrentToYear = await reportToYear.textContent();
const targetToMonth = "July";
const targetToYear = "2026";

const toMonths ={
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
while(reportCurrentToYear!==targetToYear||reportCurrentToMonth!==targetToMonth){
    if(Number(reportCurrentToYear)<Number(targetToYear)){
        await reportToNextButton.click();
    }
    else if(Number(reportCurrentToYear)>Number(targetToYear)){
        await reportToPreviousButton.click();
    }
    else{
        if(toMonths[reportCurrentToMonth]<toMonths[targetToMonth]){
            await reportToNextButton.click();
        }
        else if(toMonths[reportCurrentToMonth]>toMonths[targetToMonth]){
            await reportToPreviousButton.click();
        }
    }
    reportCurrentToMonth = await reportToMonth.textContent();
    reportCurrentToYear = await reportToYear.textContent();
}

await reportToPopUp.locator('.oxd-calendar-date').filter({hasText :/^31$/}).click();

const reportToggleText = page.getByText("Only Include Approved Timesheets",{exact : true});
await expect(reportToggleText).toBeVisible();
const reportToggleGrid =reportToggleText.locator('xpath=ancestor::div[contains(@class,"orangehrm-switch-filter")]');
const reportToggleType = reportToggleGrid.locator('input[type = "checkbox"]');
const reportToggleLabel =reportToggleGrid.locator('label');


if((await reportToggleType.isChecked())){
    console.log("its already turned on");
}else {
    await reportToggleLabel.click();
}

});