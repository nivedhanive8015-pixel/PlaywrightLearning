import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/loginpage';
test('Validate time punch', async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const loginPage = new LoginPage(page);
    await loginPage.login("Admin","admin123");
    await expect(page.getByRole('heading',{name :"Dashboard"})).toBeVisible();
    
    await page.getByRole('link',{name:"Time"}).click();
    const topbar_Attendance = page.locator('li.oxd-topbar-body-nav-tab').filter({hasText : "Attendance"});
    await topbar_Attendance.click();
    await page.getByRole('menuitem',{name :"Punch In/Out",exact: true}).click();
    await expect(page.getByRole('heading',{name:"Punch Out"})).toBeVisible();
    const punchOutDate = page.locator('label:has-text("Date")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
    .locator('.oxd-date-input');
    await punchOutDate.click();
    const punchCalendar = page.locator('.oxd-calendar:visible');
    const punchMonth = punchCalendar.locator('.oxd-calendar-selector-month-selected');
    const punchYear =punchCalendar.locator('.oxd-calendar-selector-year-selected');
    const punchNextButton = page.locator('button:has(.bi-chevron-right)');
    const punchPreviousButton = page.locator('button:has(.bi-chevron-left)');
    const punchTargetMonth = 'February';
    const punchTargetYear = '2027';
    let punchCurrentMonth = await punchMonth.textContent();
    let punchCurrentYear = await punchYear.textContent();

    const punchMonths ={
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

    while (punchCurrentYear!==punchTargetYear||punchCurrentMonth!==punchTargetMonth){
        if(Number(punchCurrentYear<Number(punchTargetYear)))
        {
            await punchNextButton.click();
        }
else if(Number(punchCurrentYear>Number(punchTargetYear))){
    await punchPreviousButton.click();

}else
{
    if(punchMonth[punchCurrentMonth]<punchMonth[punchTargetMonth]){
        await punchNextButton.click();
    }
    else{
        await punchPreviousButton.click();
    }
}
    
    punchCurrentMonth = await punchMonth.textContent();
    punchCurrentYear = await punchYear.textContent();
    }
    await page.locator('.oxd-calendar-date').filter({hasText :"1"}).click();

     const punchTime = page.locator('label:has-text("Time")')
     .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
     .locator('.oxd-time-input');
     await punchTime.click();
     async function setTime(targetHour,targetminute,targetPeriod){
     const hourUp = page.locator('.oxd-time-hour-input-up');
     const hourDown = page.locator('.oxd-time-hour-input-down');
     const minuteUp =page.locator('.oxd-time-minute-input-up');
     const minuteDown = page.locator('.oxd-time-minute-input-down')
     const hourInput = page.locator('.oxd-time-hour-input-text');
     const minuteInput =page.locator('.oxd-time-minute-input-text');
     let currentHour = await hourInput.inputValue();
     let currentMinute =await minuteInput.inputValue();

     currentHour =Number(currentHour);
     currentMinute=Number(currentMinute);

   

     if(targetHour>currentHour){
        const hourDifference = targetHour-currentHour;
        for(let i=0; i<hourDifference; i++){
            await hourUp.click();
        }
     }
     else if(targetHour<currentHour){
        const hourDifference=currentHour-targetHour;
        for( i=0; i<hourDifference ;i++){
            await hourDown.click();
        }
     }
     
    if(targetminute>currentMinute){
    const minuteDifference = targetminute-currentMinute;
    for(i=0;i<minuteDifference; i++){
        await minuteUp.click();
    }
}
    else if (targetminute<currentMinute){
        const minuteDifference = currentMinute-targetminute;
        for (i=0;i<minuteDifference;i++){
            await minuteDown.click();
        }
    }

    await page.getByRole('radio',{name: targetPeriod}).click();
}
    await setTime(9,30,"PM");

    const noteLabel = page.locator('label:has-text("Note")');
    await expect(noteLabel).toBeVisible();
    await page.getByPlaceholder('Type here').fill('My attendance note');
    await page.getByRole('button',{name:"In"}).click();
    await expect(page.getByText('Successfully Saved')).toBeVisible();
});