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
    await page.getByRole('menuitem',{name:"Attendance Summary",exact : true}).click();
    await expect(page.getByRole('heading',{name:"Attendance Total Summary Report"})).toBeVisible();
    
    const attendanceEmployeeName = page.getByText("Employee Name")
    .locator('xpath=ancestot::div[contains(@class,"oxd-input-group")]')
    .locator('.oxd-autocomplete-text-input');
    const enterEmployeeName = page.getByPlaceholder("Type for hints...");
    await enterEmployeeName.fill("Peter")
    const employeeNameSuggestion = page.getByText("Peter Mac Anderson",{exact : true})
    await employeeNameSuggestion.click();

    const attendanceJobTitle =page.getByText("Job Title")
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
    const jobTitleWrapper = attendanceJobTitle.locator('.oxd-select-wrapper');
    const jobTitleSelect = jobTitleWrapper.locator('.oxd-select-text');
    await jobTitleSelect.click();
    await page.getByRole('option',{name:"Chief Executive Officer",exact :true}).click();
    

    const subUnit = page.getByText("Sub Unit")
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
    const subUnitWrapper = subUnit.locator('.oxd-select-wrapper');
    const subUnitSelectText =subUnitWrapper.locator('.oxd-select-text');
    await subUnitSelectText.click();
    await subUnitWrapper.getByRole('option',{name :"Development",exact :true}).click();

    const employmentStatus = page.getByText("Employment Status")
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
    const employmentWrapper = employmentStatus.locator('.oxd-select-wrapper');
    const employmentSelectText = employmentWrapper.locator('.oxd-select-text');
    await employmentSelectText.click();
    await employmentWrapper.getByRole('option',{name : "Full-Time Permanent",exact :true}).click();

    const fromDateRange = page.getByText('Date Range')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
    const fromdateWrapper =fromDateRange.locator('.oxd-date-wrapper');
    const fromField =fromdateWrapper.getByPlaceholder('From');
    const fromCalendarIcon = fromdateWrapper.locator('.oxd-icon.bi-calendar.oxd-date-input-icon');
    await fromCalendarIcon.click();
    const fromCalendarpop = fromdateWrapper.locator('.oxd-date-input-calendar');
    const attendanceFromMonth =fromCalendarpop.locator('.oxd-calendar-selector-month-selected');
    const attendanceFromYear = fromCalendarpop.locator('.oxd-calendar-selector-year-selected');
    const attendanceNextButton = fromCalendarpop.locator('button:has(.bi-chevron-right)');
    const attendancePreviousButton = fromCalendarpop.locator('button:has(.bi-chevron-left)');
    
    const targetFromMonth = "December"
    const targetFromYear = "2026"

    let currentFromYear = await attendanceFromMonth.textContent();
    let currentFromMonth = await attendanceFromYear.textContent();

    const fromMonths = {

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
            await attendanceNextButton.click();
        }
        else if(Number(currentFromYear)>Number(targetFromYear)){
            await attendancePreviousButton.click();
        }
        else{
            if(fromMonths[currentFromMonth]<fromMonths[targetFromMonth]){
                await attendanceNextButton.click();
            }
            else if(fromMonths[currentFromMonth]>fromMonths[targetFromMonth]){
                await attendancePreviousButton.click()
            }
        }

        currentFromYear = await attendanceFromYear.textContent();
        currentFromMonth = await attendanceFromMonth.textContent();
    }

    await fromCalendarpop.locator('.oxd-calendar-date').filter({hasText:/^10$/}).click();

    const toDateRange = page.getByPlaceholder('To')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
    const toWrapper = toDateRange.locator('.oxd-date-wrapper');
    const toInput =toWrapper.locator('.oxd-input');
    const toCalendarIcon = toWrapper.locator('.oxd-icon.bi-calendar.oxd-date-input-icon');
    await toCalendarIcon.click();
    const toCalendarPop =toWrapper.locator('.oxd-date-input-calendar');
    const toMonth = toCalendarPop.locator('.oxd-calendar-selector-month-selected');
    const toYear =toCalendarPop.locator('.oxd-calendar-selector-year-selected');
    const toNextButton=toCalendarPop.locator('button:has(.bi-chevron-right)');
    const toPreviousButton=toCalendarPop.locator('button:has(.bi-chevron-left)');
    const targetToMonth = 'January';
    const targetToYear = '2027';

    let currentToYear = await toYear.textContent();
    let currentToMonth = await toMonth.textContent();
    

    const monthTo ={
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

    while(currentToYear!==targetToYear||currentToMonth!==targetToMonth){
        if(Number(currentToYear)<Number(targetToYear)){
            await toNextButton.click();
        }
        else if(Number(currentToYear)>Number(targetToYear)){
            await toPreviousButton.click();
        }else{
            if(monthTo[currentToMonth]<monthTo[targetToMonth]){
                await toNextButton.click();
            }
            else if(monthTo[currentToMonth]>monthTo[targetToMonth]){
                await toPreviousButton.click();
            }
        }
        currentToYear = await toYear.textContent();    
        currentToMonth = await toMonth.textContent();
        
    }

    await toCalendarPop.locator('.oxd-calendar-date').filter({hasText :/^10$/}).click();
    

});