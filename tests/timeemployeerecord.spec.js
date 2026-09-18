import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/loginpage';
test('Validate employee records', async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const loginPage = new LoginPage(page);
    await loginPage.login("Admin","admin123");
    await expect(page.getByRole('heading',{name :"Dashboard"})).toBeVisible();
    
    await page.getByRole('link',{name:"Time"}).click();
    const topbar_Attendance = page.locator('li.oxd-topbar-body-nav-tab').filter({hasText : "Attendance"});
    await topbar_Attendance.click();
    await page.getByRole('menuitem',{name :"Employee Records",exact : true}).click();
    await expect(page.getByText("Employee Attendance Records")).toBeVisible();
    const employeeName =page.locator('label,has-text("Employee Name")')
    .locator('xpath=ancestor[contains(@class,"oxd-input-group")]')
    .locator('.oxd-autocomplete-text-input');
    

    const enterEmployeeName = page.getByPlaceholder("Type for hints...");
    await enterEmployeeName.fill("John");
    const johnSuggestion=page.getByText("John123  Doe456", { exact: true }).nth(1);
    await johnSuggestion.click();


    const employeeRecordDate = page.locator('label:has-text("Date")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');

   const employeeNameCalendar =
    employeeRecordDate.locator('.oxd-date-input-icon');

   await employeeNameCalendar.click();

    const employeeCalendar = page.locator('.oxd-calendar:visible');
    const employeeNameMonth =employeeCalendar.locator('.oxd-calendar-selector-month-selected');

    const employeeNameYear =employeeCalendar.locator('.oxd-calendar-selector-year p');

    const employeeNameNextButton =employeeCalendar.locator('button:has(.bi-chevron-right)');

    const employeeNamePrevious =employeeCalendar.locator('button:has(.bi-chevron-left)');

    console.log("Month:",await employeeNameMonth.textContent());

    console.log("Year:",await employeeNameYear.textContent());

    let employeeCurrentMonth =await employeeNameMonth.textContent();

    let employeeCurrentYear =await employeeNameYear.textContent();

    const employeeTargetYear = '2026';
    const employeetargetMonth = 'May';

    const employeeMonths ={
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
    while(employeeCurrentYear!==employeeTargetYear||employeeCurrentMonth!==employeetargetMonth){
        if(Number(employeeCurrentYear<Number(employeeTargetYear))){
            await employeeNameNextButton.click()
        }
        else if(Number(employeeCurrentYear>Number(employeeTargetYear))){
            await employeeNamePrevious.click();

        }
        else{
            if(employeeMonths[employeeCurrentMonth]<employeeMonths[employeetargetMonth]){
                await employeeNameNextButton.click();
            }

            else if (employeeMonths[employeeCurrentMonth]>employeeMonths[employeetargetMonth]){
                await employeeNamePrevious.click();
            }
        }

        employeeCurrentMonth = await employeeNameMonth.textContent();
        employeeCurrentYear = await employeeNameYear.textContent();
    }

   await page.locator('.oxd-calendar-date').filter({hasText : "11"}).click();
   await page.getByRole('button',{name : " View "}).click();
   const noRecordFound = page.getByText("No Records Found",{exact : true});
   await expect(noRecordFound).toBeVisible();

})