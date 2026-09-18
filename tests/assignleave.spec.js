

import { test,expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { AssignLeave } from '../pages/assignleave';
import fs from 'fs';

import data from '../test-data/assignleavedata.json' with { type: 'json' };


test("assign leave using POM",async({page})=>{
     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    const loginPage = new LoginPage(page);
    await loginPage.login("Admin", "admin123");

    await expect(page.getByRole('heading', { name: 'Dashboard', exact: true })).toBeVisible();

    const months = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12"
};


    for(let testData of data){

    const assignLeave = new AssignLeave(page);
    await assignLeave.openLeaveLink();
    await assignLeave.openAssignLeave();
    await assignLeave.enterEmployeeName(testData.employeeName);
    await assignLeave.selectLeaveTypeDropDown(testData.leaveType);
    await assignLeave.selectFromDate(testData.fromDate.month,testData.fromDate.year,testData.fromDate.date);
    await assignLeave.verifyLeaveErrorMessage();
    const expectedToDate =`${testData.fromDate.date.padStart(2, "0")}-${months[testData.fromDate.month]}-${testData.fromDate.year}`;
    await assignLeave.verifyToDate(expectedToDate);
    await assignLeave.selectLeaveToDate(testData.toDate.month,testData.toDate.year,testData.toDate.date);
    await assignLeave.selectPartialDays(testData["Partial Days"]);
    if (testData["Partial Days"] === "Start Day Only") {
    await assignLeave.selectStartDay(testData["Start Day"]);
    }
    else{
        await assignLeave.selectDuration(testData.Duration);
        await assignLeave.selectFromTime(testData.fromTime.hour,testData.fromTime.minute,testData.fromTime.period);
        await assignLeave.selectToTime(testData.toTime.hour,testData.toTime.minute,testData.toTime.period);
        await assignLeave.verifyLeaveDuration();

    }
    
    await assignLeave.enterComment(testData.comment);
    await assignLeave.clickAssignButton();
    await assignLeave.verifyLeaveAssignmentPopup();

    await assignLeave.cancelLeaveAssignment();

    }

});