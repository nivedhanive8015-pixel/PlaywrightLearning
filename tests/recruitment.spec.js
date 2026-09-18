import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/loginpage';
import { group } from 'node:console';
import { nextTick } from 'node:process';
test.use({ locale: 'en-US' });
test('Validating recruitment', async ({page}) =>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
        {waitUntil: 'domcontentloaded',timeout: 60000});
    const loginPage = new LoginPage(page);
    await loginPage.login('Admin','admin123');
    await page.getByRole('link',{name:"Recruitment"}).click();
    await expect(page.getByRole('heading',{name:"Recruitment"})).toBeVisible();
    await page.getByRole('link',{name:"Candidates"}).click();
    await expect(page.getByRole('heading',{name:'Candidates'})).toBeVisible();
     
    //job title//
    const jobTitle =page.locator('label:has-text("Job Title")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
    .locator('.oxd-select-text');
    await jobTitle.click();
    await page.getByRole('option',{name :"Finance Manager"}).click();
    await expect(jobTitle).toContainText("Finance Manager");
    

    const candidateVacancy = page.locator('label:has-text("Vacancy")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
    .locator('.oxd-select-text');
    await candidateVacancy.click();
    await page.getByRole('option',{name : "Sales Representative"}).click();
    await expect(candidateVacancy).toContainText("Sales Representative");
    

    const hiringManager =page.locator('label:has-text("Hiring Manager")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
    .locator('.oxd-select-text');
    await hiringManager.click();
    await page.getByRole('option',{name : "Rahul Patil"}).click();
    await expect(hiringManager).toContainText("Rahul Patil");
    

    const status =page.locator('label:has-text("Status")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
    .locator('.oxd-select-text');
    await status.click();
    await page.getByRole('option',{name :"Shortlisted"}).click();
    await expect(status).toContainText("Shortlisted");

    const candidatesName =page.getByPlaceholder("Type for hints...");
    await candidatesName.first().fill("Manu");
    const candidateSuggestion =page.getByRole('option', { name: "Manu K M" }).first();
    await expect(candidateSuggestion).toBeVisible();
    await candidateSuggestion.click();
    await expect(candidatesName).toHaveValue("Manu K M");

    const keywords =page.getByPlaceholder("Enter comma seperated words...");
    await keywords.fill("test,test");
    await expect(keywords).toHaveValue("test,test");
    
    
    const dateOfApplication=page.getByPlaceholder("From")
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
    .locator('.oxd-date-input')
    await dateOfApplication.click();
    const calendar = page.locator('.oxd-calendar-wrapper:visible').first();
    console.log("Calendar:", await calendar.count());
    console.log( "Month:",await calendar.locator('.oxd-calendar-selector-month-selected').count());
    const fromMonth =calendar.locator('.oxd-calendar-selector-month-selected');
    const fromYear =calendar.locator('.oxd-calendar-selector-year-selected');
    const nextButton =calendar.locator('button:has(.bi-chevron-right)');
    const previousButton=calendar.locator('button:has(.bi-chevron-left)');
    const targetMonth = 'April';
    const targetYear = '2026';
    let current_Month = await fromMonth.textContent();
    let current_year =await fromYear.textContent();
    const fromDateMonths= {
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

    while(current_year!==targetYear|| current_Month!==targetMonth){
         if(Number(current_year)<Number(targetYear)){
            await nextButton.click();
            await expect(fromMonth).not.toHaveText(current_Month);
        }
        else if(Number(current_year)>Number(targetYear)){
            await previousButton.click();
            await expect(fromMonth).not.toHaveText(current_Month);
        }
        else{
            if(fromDateMonths[current_Month]<fromDateMonths[targetMonth]){
                await nextButton.click();
                await expect(fromMonth).not.toHaveText(current_Month);
            }
            else{
                await expect(previousButton).toBeVisible();
                await expect(previousButton).toBeEnabled();
                await previousButton.click();
                await expect(fromMonth).not.toHaveText(current_Month);
    }
}

        current_year =await fromYear.textContent();
        current_Month =await fromMonth.textContent();
       

    }
    await page.locator('.oxd-calendar-date').filter({hasText :"15"}).click();

    const todate =page.getByPlaceholder("To")
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
    .locator('.oxd-input');
    await todate.click();
    const toCalendar = page.locator('.oxd-calendar-wrapper:visible').last();

    const toDate_Month =toCalendar.locator('.oxd-calendar-selector-month-selected');

    const toDate_Year =toCalendar.locator('.oxd-calendar-selector-year-selected');

    const toDateNextButton =toCalendar.locator('button:has(.bi-chevron-right)');

    const toDatePreviousButton =toCalendar.locator('button:has(.bi-chevron-left)');
    const toDateTargMonth = "January";
    const toDateTargetYear ="2027";
    let toDateCurrentMonth = await toDate_Month.textContent();
    let toDateCurrentYear = await toDate_Year.textContent();
    const toDateMonths={
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
    while(toDateCurrentYear!==toDateTargetYear||toDateCurrentMonth!==toDateTargMonth){
        if(Number(toDateCurrentYear)<Number(toDateTargetYear)){
            await toDateNextButton.click();
            await expect(toDate_Month).not.toHaveText(toDateCurrentMonth);
        }
        else if(Number(toDateCurrentYear)>Number(toDateTargetYear)){
            await toDatePreviousButton.click();
             await expect(toDate_Month).not.toHaveText(toDateCurrentMonth);
        }
        else{
            if(toDateMonths[toDateCurrentMonth]<toDateMonths[toDateTargMonth]){
                await toDateNextButton.click();
                 await expect(toDate_Month).not.toHaveText(toDateCurrentMonth);
            }
            else{
                await toDatePreviousButton.click();
                 await expect(toDate_Month).not.toHaveText(toDateCurrentMonth);
            }
        }
        toDateCurrentMonth = await toDate_Month.textContent();
        toDateCurrentYear = await toDate_Year.textContent();
    }
    await page.locator('.oxd-calendar-date').filter({hasText : "13"}).click();

    const methodOfApplication = page.locator('label:has-text("Method of Application")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
    .locator('.oxd-select-text')
    await methodOfApplication.click();
    await page.getByRole('option',{name :"Manual"}).click();
    await expect(methodOfApplication).toContainText("Manual");

    await page.getByRole('button',{name :"Search"}).click();
    const recordFound = page.locator('.orangehrm-horizontal-padding').getByText(/^\(\d+\)\s*Records Found$/);
    if(await recordFound.isVisible()){
        console.log('Record Found');
    }
    else
    {
        console.log('No records found');
    }


   await page.getByRole('link', { name: "Vacancies" }).click();
   const vacancies =page.getByRole('heading',{name : "Vacancies"});
   await expect(vacancies).toBeVisible();
   const jobtitle = page.locator('label:has-text("Job Title")')
   .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
   .locator('.oxd-select-text');
   await jobtitle.click();
   await page.getByRole('option',{name:"Accountant"}).click();
   await expect(jobtitle).toContainText("Accountant");

   const vacancy =page.locator('label:has-text("Vacancy")')
   .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
   .locator('.oxd-select-text');
   await vacancy.click();
   await page.getByRole('option',{name:"Payroll Administrator"}).click();
   await expect(vacancy).toContainText("Payroll Administrator");

    const hiring_Manager =page.locator('label:has-text("Hiring Manager")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
    .locator('.oxd-select-text');
    await hiring_Manager.click();
    await page.getByRole('option',{name:"Rahul Patil"}).click();
    await expect(hiring_Manager).toContainText("Rahul Patil");

    const vacancyStatus = page.locator('label:has-text("Status")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
    .locator('.oxd-select-text');
    await vacancyStatus.click();
    await page.getByRole('option',{name:"Active"}).click();
    await expect(vacancyStatus).toContainText("Active");

    const vacancy_Search = page.getByRole('button', { name: "Search" });
    await vacancy_Search.click();
    const recordsFound = page.locator('.orangehrm-horizontal-padding').getByText(/^\(\d+\)\s*Records Found$/);
    if(await recordsFound.isVisible() ){
        console.log("Records Found");
    }
    else{
        console.log("No Records Found");
    }
});