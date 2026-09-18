import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/loginpage';
test.use({ locale: 'en-US' });
test('Validating leave list', async ({page}) =>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
        {waitUntil: 'domcontentloaded',timeout: 60000});
    const loginPage = new LoginPage(page);
    await loginPage.login('Admin','admin123');
    await page.getByRole('link' , {name :'Leave'}).click();
    await expect(page.getByRole('heading' , {name :'Leave List'})).toBeVisible();
    const fromDate = page.locator('label:has-text("From Date")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
    .locator('input');
    await fromDate.click();
    const month = page.locator('.oxd-calendar-selector-month-selected');
    const year = page.locator('.oxd-calendar-selector-year-selected');
    const nextButton = page.locator('button:has(.bi-chevron-right)');
    const previousButton =page.locator('button:has(.bi-chevron-left)');
    let currentMonth = await month.textContent();
    let currentYear = await year.textContent();
    const targetMonth = "November"
    const targetYear = '2026'
    const months = {
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
    while (currentMonth !== targetMonth || currentYear !== targetYear) {

    if (Number(currentYear) < Number(targetYear)) {
        await nextButton.click();

    } else if (Number(currentYear) > Number(targetYear)) {
        await previousButton.click();

    } else {

        if (months[currentMonth] < months[targetMonth]) {
            await nextButton.click();

        } else if (months[currentMonth] > months[targetMonth]) {
            await previousButton.click();
        }
    }

    currentMonth = await month.textContent();
    currentYear = await year.textContent();
}
  await page.locator('.oxd-calendar-date', { hasText: '15' }).click();
  const todate = page.locator('label:has-text("To Date")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
    .locator('input');
  await todate.click();
  const toDate_Month = page.locator('.oxd-calendar-selector-month-selected').last();
  const toDate_Year = page.locator('.oxd-calendar-selector-year-selected').last();
  const toDate_Next =page.locator('button:has(.bi-chevron-right)').last();
  const toDate_Previous =page.locator('button:has(.bi-chevron-left)').last();
  const toDateTargetMonth = "February";
  const toDateTargetYear = "2027" ;
  console.log(await toDate_Month.textContent());
  console.log(await toDate_Year.textContent());
  let toDate_CurrentMonth = (await toDate_Month.textContent()).trim();
  let toDate_CurrentYear = (await toDate_Year.textContent()).trim();
  const todate_Months ={
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

  while(toDate_CurrentYear !==toDateTargetYear||
  toDate_CurrentMonth!==toDateTargetMonth)
  {
    console.log("Month:", toDate_CurrentMonth, "Year:", toDate_CurrentYear);
    if(Number(toDate_CurrentYear)<Number(toDateTargetYear)){
        await toDate_Next.click();
    }
    else if(Number(toDate_CurrentYear)>Number(toDateTargetYear)){
        await toDate_Previous.click();
    }
    else{
        if(todate_Months[toDate_CurrentMonth]<todate_Months[toDateTargetMonth]){
            await toDate_Next.click();
        }
        else{
            await toDate_Previous.click();
        }
    }
    toDate_CurrentMonth=(await toDate_Month.textContent()).trim();
    toDate_CurrentYear=(await toDate_Year.textContent()).trim();
    console.log('After update:', toDate_CurrentMonth, toDate_CurrentYear);
  }
    await page.locator('.oxd-calendar-date',{hasText : "20"}).click();
    

                  //leave status//
    const dropdownLeaveStatus = page.locator('label:has-text("Show Leave with Status")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
    .locator('.oxd-select-text');
    await dropdownLeaveStatus.click();
    await page.getByRole('option',{name :"Taken"}).click();
    await expect(page.locator('.oxd-multiselect-chips-selected').filter({hasText:"Taken"})).toBeVisible();
    const leaveType =page.locator('label:has-text("Leave Type")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
    .locator('.oxd-select-text');
    await leaveType.click();
    await page.getByRole('option',{name:"CAN - Bereavement"}).click();
    await expect(leaveType).toContainText('CAN - Bereavement');
    

    

         //Employee Name//
    const employeeName = page.getByPlaceholder('Type for hints...');
    await employeeName.fill('Nivedha');
    await expect(employeeName).toHaveValue('Nivedha');

         //subunit//

    const dropDownSubUnit = page.locator('label:has-text("Sub Unit")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
    .locator('.oxd-select-text');
    await dropDownSubUnit.click();
    await page.getByRole('option',{name:"Engineering"}).click();
    await expect(dropDownSubUnit).toContainText("Engineering");
    
     //include past employees//
     const includePastEmployees = page.getByText('Include Past Employees')
     .locator('xpath=ancestor::div[contains(@class,"oxd-grid-item")]')
     .locator('.oxd-switch-input');

     if(!(await includePastEmployees.isChecked())){
     await includePastEmployees.click();
     console.log("Turned on");
     }
     else
     {
        console.log("Its already On");
     }

     await page.getByRole('button',{name:"Search"}).click();
     const noRecords = page.locator('.orangehrm-horizontal-padding').getByText('No Records Found');
     if(await noRecords.isVisible()){
        console.log("No records Found");
     }
     else{
        console.log("Records found"); 
     }


});

