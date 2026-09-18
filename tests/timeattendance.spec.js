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
    const topbar_Attendance = page.locator('li.oxd-topbar-body-nav-tab').filter({hasText : "Attendance"});
    await topbar_Attendance.click();
    await page.getByRole('menuitem',{name :"My Records"}).click();
    await expect(page.getByRole('heading',{name : "My Attendance Records"})).toBeVisible();
    const attendanceDate = page.locator('label:has-text("Date")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
    .locator('input');
    await attendanceDate.click();
    const attendanceCalendar = page.locator('.oxd-date-wrapper');
    const attendanceMonth = attendanceCalendar.locator('.oxd-calendar-selector-month-selected').first();
    const attendanceYear = attendanceCalendar.locator('.oxd-calendar-selector-year-selected').first();
    const attendanceNextButton = attendanceCalendar.locator('button:has(.bi-chevron-right)').first();
    const attendancePreviousButton = attendanceCalendar.locator('button:has(.bi-chevron-left)').first();
    const targetMonth = "November";
    const targetyear = "2026";

    let currentMonth = await attendanceMonth.textContent();
    let currentyear = await attendanceYear.textContent();

    const month ={
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
while(currentyear!==targetyear||currentMonth!==targetMonth){

    if(Number(currentyear<targetyear)){
        await attendanceNextButton.click();
    }
    else if (Number(currentyear>targetyear)){
        await attendancePreviousButton.click();
    }
    else{
        if(month[currentMonth]<month[targetMonth]){
            await attendanceNextButton.click();
        }
        else{
            await attendancePreviousButton.click();
        }
    }
    currentyear = await attendanceYear.textContent();
    currentMonth =await attendanceMonth.textContent();

}
await page.locator('.oxd-calendar-date').filter({hasText :"20"}).click();
await page.getByRole('button',{name:"View"}).click();
const totalDuration = page.locator('.orangehrm-header-container').getByText("Total Duration (Hours): 0.00");
await expect(totalDuration).toBeVisible();
const attendanceNoRecordFound = page.getByText("No Records Found",{exact:true}).nth(2);
await expect(attendanceNoRecordFound).toBeVisible();

});