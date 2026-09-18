import { expect } from '@playwright/test';
export class AttendanceSummaryPage{
    constructor(page){
        this.page =page;
        this.timelink=page.getByRole('link',{name:"Time"})  ;
        this.reportsTab=page.locator('.oxd-topbar-body-nav-tab').filter({ hasText: "Reports" });
        this.attendanceSummaryMenu =page.getByRole('menuitem',{name:"Attendance Summary",exact : true});
        this.attendanceSummaryHeading=page.getByRole('heading',{name:"Attendance Total Summary Report"})

        this.attendanceEmployeeName =page.getByText("Employee Name")
        .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]')
        .locator('.oxd-autocomplete-text-input');
       this.employeeNameInput =this.attendanceEmployeeName.getByPlaceholder("Type for hints...");
       
   
    this.attendanceJobTitle =page.getByText("Job Title")
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
    this.jobTitleWrapper=this.attendanceJobTitle.locator('.oxd-select-wrapper');
    this.jobTitleSelect=this.jobTitleWrapper.locator('.oxd-select-text');
    
    
    this.subUnit =page.getByText("Sub Unit")
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
    this.subUnitWrapper=this.subUnit.locator('.oxd-select-wrapper');
    this.subUnitSelectText =this.subUnitWrapper.locator('.oxd-select-text');
    
    this.employmentStatus =page.getByText("Employment Status")
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
    this.employmentWrapper = this.employmentStatus.locator('.oxd-select-wrapper');
    this.employmentSelectText =this.employmentWrapper.locator('.oxd-select-text');
    

    this.fromDateRange = page.getByText('Date Range')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
    this.fromdateWrapper=this.fromDateRange.locator('.oxd-date-wrapper');
    this.fromField=this.fromdateWrapper.getByPlaceholder('From');
    this.fromCalendarIcon=this.fromdateWrapper.locator('.oxd-icon.bi-calendar.oxd-date-input-icon');
    this.fromCalendarpop=this.fromdateWrapper.locator('.oxd-date-input-calendar');
    this.attendanceFromMonth=this.fromCalendarpop.locator('.oxd-calendar-selector-month-selected');
    this.attendanceFromYear=this.fromCalendarpop.locator('.oxd-calendar-selector-year-selected');
    this.attendanceNextButton=this.fromCalendarpop.locator('button:has(.bi-chevron-right)');
    this.attendancePreviousButton=this.fromCalendarpop.locator('button:has(.bi-chevron-left)');

    this.toDateRange = page.getByPlaceholder('To')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
    this.toWrapper = this.toDateRange.locator('.oxd-date-wrapper');
    this.toInput =this.toWrapper.locator('.oxd-input');
    this.toCalendarIcon = this.toWrapper.locator('.oxd-icon.bi-calendar.oxd-date-input-icon');
    this.toCalendarPop =this.toWrapper.locator('.oxd-date-input-calendar');
    this.toMonth = this.toCalendarPop.locator('.oxd-calendar-selector-month-selected');
    this.toYear =this.toCalendarPop.locator('.oxd-calendar-selector-year-selected');
    this.toNextButton=this.toCalendarPop.locator('button:has(.bi-chevron-right)');
    this.toPreviousButton=this.toCalendarPop.locator('button:has(.bi-chevron-left)');
    }

    async openAttendanceSummary(){
        await this.timelink.click();
        await this.reportsTab.click();
        await this.attendanceSummaryMenu.click();
        await expect(this.attendanceSummaryHeading).toBeVisible();
    }

    async enterEmployeeName(name,fullName){
        await this.employeeNameInput.fill(name);
        await this.page.getByText(fullName, { exact: true }).click();
    }

    async selectJobTitle(dropdownoption){
        await  this.jobTitleSelect.click();
        await this.page.getByRole('option',{name :"dropdownoption",exact :true}).click();
    }
    
    async selectSubUnit(dropdownoption){
        await this.subUnitSelectText.click();
        await  this.page.getByRole('option',{name :"dropdownoption",exact :true}).click();
        
    }

    async selectEmploymentStatus(dropdownoption){
        await this.employmentSelectText.click();
        await this.page.getByRole('option',{name : "dropdownoption",exact :true}).click();
        
    }

    async selectFromDate(targetFromMonth,targetFromYear,targetFromDate){
        await this.fromCalendarIcon.click();
        let currentFromMonth =await this.attendanceFromMonth.textContent();
        let currentFromYear =await this.attendanceFromYear.textContent();
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
            await this.attendanceNextButton.click();
        }
        else if(Number(currentFromYear)>Number(targetFromYear)){
            await this.attendancePreviousButton.click();
        }
        else{
            if(fromMonths[currentFromMonth]<fromMonths[targetFromMonth]){
                await this.attendanceNextButton.click();
            }
            else if(fromMonths[currentFromMonth]>fromMonths[targetFromMonth]){
                await this.attendancePreviousButton.click()
            }
        }

        currentFromYear = await this.attendanceFromYear.textContent();
        currentFromMonth = await this.attendanceFromMonth.textContent();
    
    }
    await this.fromCalendarpop.locator('.oxd-calendar-date').filter({hasText: new RegExp(`^${targetFromDate}$`)}).click();

}
    async selectToDate(targetToMonth,targetToYear,targetToDate){
        await this.toCalendarIcon.click();
        let currentToYear = await this.toYear.textContent();
        let currentToMonth = await this.toMonth.textContent();
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
            await this.toNextButton.click();
        }
        else if(Number(currentToYear)>Number(targetToYear)){
            await this.toPreviousButton.click();
        }else{
            if(monthTo[currentToMonth]<monthTo[targetToMonth]){
                await this.toNextButton.click();
            }
            else if(monthTo[currentToMonth]>monthTo[targetToMonth]){
                await this.toPreviousButton.click();
            }
        }
        currentToYear = await this.toYear.textContent();    
        currentToMonth = await this.toMonth.textContent();
        
    }

await this.toCalendarPop.locator('.oxd-calendar-date').filter({hasText :new RegExp(`^${targetToDate}$`)}).click();
    }
}