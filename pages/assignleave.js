import { expect } from '@playwright/test';
import { text } from 'node:stream/consumers';

export class AssignLeave{
    constructor(page){
        this.page = page;
        this.leaveLink = page.getByRole('link',{name :"Leave",exact :true});
        this.leaveHeading = page.getByRole('heading',{name :"Leave",exact:true});
        this.assignLeaveTopBar = page.getByRole('link',{name:"Assign Leave",exact:true});
        this.assignLeaveHeading =page.getByRole('heading',{name:"Assign Leave",exact:true});

        this.employeeNameLabel=page.getByText("Employee Name",{exact:true});
        this.employeeInput =page.getByPlaceholder("Type for hints...");
        

        this.leaveTypeGroup =page.getByText("Leave Type",{exact:true})
            .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
        this.leaveTypeWrapper =this.leaveTypeGroup.locator('.oxd-select-wrapper');
        this.leaveTypeSelect=this.leaveTypeWrapper.locator('.oxd-select-text');

        this.leaveBalanceGroup = page.getByText("Leave Balance",{exact:true})
        .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
        this.leaveBalanceDays = this.leaveBalanceGroup.locator('.orangehrm-leave-balance-text');
        this.LeaveBalanceError =this.leaveBalanceGroup.locator('.orangehrm-leave-balance-text.--error');

        this.leaveFromGroup = page.getByText("From Date",{exact:true})
        .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
        this.leaveFromWrapper=this.leaveFromGroup.locator('.oxd-date-wrapper');
        this.leaveFromInput = this.leaveFromWrapper.locator('.oxd-date-input');
        this.leaveFromCalendarIcon =this.leaveFromWrapper.locator('.oxd-icon.bi-calendar.oxd-date-input-icon');
        this.leaveFromCalendarPopup=this.leaveFromGroup.locator('.oxd-date-input-calendar');
        this.leaveFromMonth =this.leaveFromCalendarPopup.locator('.oxd-calendar-selector-month');
        this.leaveFromYear =this.leaveFromCalendarPopup.locator('.oxd-calendar-selector-year');
        this.leaveFromNextButton=this.leaveFromCalendarPopup.locator('button:has(.bi-chevron-right)');
        this.leaveFromPreviousButton =this.leaveFromCalendarPopup.locator('button:has(.bi-chevron-left)');

        this.leaveToDateGroup = page.getByText("To Date",{exact:true})
        .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
        this.leaveToDateWrapper = this.leaveToDateGroup.locator('.oxd-date-wrapper');
        this.leaveToDateInput=this.leaveToDateWrapper.locator('input');
        this.leaveToDateCalendarIcon =this.leaveToDateWrapper.locator('.oxd-icon.bi-calendar.oxd-date-input-icon');
        this.leaveToDateCalendarPopup =this.leaveToDateGroup.locator('.oxd-date-input-calendar');
        this.leaveToDateMonth = this.leaveToDateCalendarPopup.locator('.oxd-calendar-selector-month-selected');
        this.leaveToDateYear =this.leaveToDateCalendarPopup.locator('.oxd-calendar-selector-year-selected');
        this.leaveToNextButton=this.leaveToDateCalendarPopup.locator('button:has(.bi-chevron-right)');
        this.leaveToPreviousButton=this.leaveToDateCalendarPopup.locator('button:has(.bi-chevron-left)');

        this.partialDays = page.getByText("Partial Days",{exact:true})
        .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
        this.partialDaysWrapper =this.partialDays.locator('.oxd-select-wrapper');
        this.partialDaysSelect=this.partialDaysWrapper.locator('.oxd-select-text');

        this.startDay = page.getByText("Start Day",{exact :true})
        .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
        this.startDayWrapper = this.startDay.locator('.oxd-select-wrapper');
        this.startDaySelect = this.startDayWrapper.locator('.oxd-select-text');

        
        this.duration=page.getByText("Duration",{exact:true})
        .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
        this.durationWrapper=this.duration.locator('.oxd-select-wrapper');
        this.durationSelect =this.durationWrapper.locator('.oxd-select-text');

        this.durationFromTime =page.getByText("From",{exact:true})
        .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
        this.durationFromWrapper=this.durationFromTime.locator('.oxd-time-wrapper');
        this.durationFromInput=this.durationFromWrapper.locator('.oxd-time-input');
        this.durationFromClockIcon=this.durationFromInput.locator('.bi-clock')
        this.fromTimePicker=this.durationFromWrapper.locator('.oxd-time-picker');
        this.fromTimeHour=this.fromTimePicker.locator('.oxd-time-hour-input-text');
        this.fromTimeMinute=this.fromTimePicker.locator('.oxd-time-minute-input-text');
        this.fromtimeHourUp=this.fromTimePicker.locator('.oxd-icon.bi-chevron-up.oxd-icon-button__icon.oxd-time-hour-input-up');
        this.fromtimeMinuteUp=this.fromTimePicker.locator('.oxd-icon.bi-chevron-up.oxd-icon-button__icon.oxd-time-minute-input-up');
        this.fromtimeHourDown =this.fromTimePicker.locator('.oxd-icon.bi-chevron-down.oxd-icon-button__icon.oxd-time-hour-input-down');
        this.fromtimeMinuteDown=this.fromTimePicker.locator('.oxd-icon.bi-chevron-down.oxd-icon-button__icon.oxd-time-minute-input-down')
        this.fromtimeAM =this.fromTimePicker.locator('input[type="radio"][value="AM"]');
        this.fromtimePM=this.fromTimePicker.locator('input[type="radio"][value="PM"]');

        this.durationToTime=page.getByText("To",{exact:true})
        .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
        this.durationToWrapper=this.durationToTime.locator('.oxd-time-wrapper');
        this.durationToInput=this.durationToWrapper.locator('.oxd-time-input');
        this.durationToClockIcon=this.durationToWrapper.locator('.bi-clock');
        this.toTimePicker=this.durationToWrapper.locator('.oxd-time-picker');
        this.toTimeHour=this.toTimePicker.locator('.oxd-time-hour-input-text');
        this.toTimeMinute=this.toTimePicker.locator('.oxd-time-minute-input-text');
        this.toHourUp=this.toTimePicker.locator('.oxd-icon.bi-chevron-up.oxd-icon-button__icon.oxd-time-hour-input-up');
        this.toHourDown=this.toTimePicker.locator('.oxd-icon.bi-chevron-down.oxd-icon-button__icon.oxd-time-hour-input-down');
        this.toMinuteUp=this.toTimePicker.locator('.oxd-icon.bi-chevron-up.oxd-icon-button__icon.oxd-time-minute-input-up');
        this.toMinuteDown=this.toTimePicker.locator('.oxd-icon.bi-chevron-down.oxd-icon-button__icon.oxd-time-minute-input-down')
        this.toTimeAM=this.toTimePicker.locator('input[type="radio"][value="AM"]');
        this.toTimePM=this.toTimePicker.locator('input[type="radio"][value="PM"]');
        
       this.leaveDuration = page.locator('.orangehrm-leave-duration');
       this.durationGroup = this.leaveDuration.locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
       this.durationLabel =this.durationGroup.getByText("Duration", { exact: true });

        
        this.leaveCommentGroup = page.getByText("Comments",{exact:true})
        .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
        this.leaveCommentTextarea =this.leaveCommentGroup.locator('.oxd-textarea');

        
        this.assignButton = page.getByRole('button',{name:"Assign",exact :true}); 

        this.confirmLeavePopup = page.locator('.oxd-dialog-sheet[role="document"]');
        this.confirmHeading = page.getByText("Confirm Leave Assignment",{exact:true});
        this.confirmMessage = page.getByText("Employee does not have sufficient leave balance for leave request. Click OK to confirm leave assignment.",{exact:true});
        this.confirmCancel =this.confirmLeavePopup.getByRole('button',{name :" Cancel ",exact:true});
        this.confirmOk =this.confirmLeavePopup.getByRole('button',{name :"Ok",exact:true});

        }

        async openLeaveLink(){
            await this.leaveLink.click();
            await expect(this.leaveHeading).toBeVisible();
        }

        async openAssignLeave(){
            await this.assignLeaveTopBar.click();
            await expect(this.assignLeaveHeading).toBeVisible();
        }

        async enterEmployeeName(fullname){
            await this.employeeInput.fill(fullname);
            await this.page.getByText(fullname,{exact:true}).click();
        }

        async selectLeaveTypeDropDown(dropdownoption){
            await this.leaveTypeSelect.click();
            await this.page.getByRole('option',{name :dropdownoption,exact:true}).click();                 
        }

        async verifyLeaveBalanceDays(){
            await expect (this.leaveBalanceDays).toBeVisible();
        }

        async verifyLeaveErrorMessage(){
            await expect( this.LeaveBalanceError).toBeVisible();

        }

        async selectFromDate(leaveTargetFromMonth,leaveTargetFromyear,leavetargetFromDate){
            await  this.leaveFromCalendarIcon.click();
            let currentLeaveFromMonth = await this.leaveFromMonth.textContent();
            let currentLeaveFromYear = await this.leaveFromYear.textContent();
            const leaveFrommonths ={
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
            while(currentLeaveFromMonth!==leaveTargetFromMonth||currentLeaveFromYear!==leaveTargetFromyear){

                if(Number(currentLeaveFromYear)<Number(leaveTargetFromyear)){
                    await this.leaveFromNextButton.click();
                }
                else if(Number(currentLeaveFromYear)>Number(leaveTargetFromyear)){
                    await this.leaveFromPreviousButton.click();
                }
                else{
                if(leaveFrommonths[currentLeaveFromMonth]<leaveFrommonths[leaveTargetFromMonth]){
                    await this.leaveFromNextButton.click();
                }
                else if(leaveFrommonths[currentLeaveFromMonth]>leaveFrommonths[leaveTargetFromMonth]){
                    await this.leaveFromPreviousButton.click();
                }     
            }
                
                
                 currentLeaveFromMonth = await this.leaveFromMonth.textContent();
                 currentLeaveFromYear = await this.leaveFromYear.textContent();
                
            }
                await this.leaveFromCalendarPopup.locator('.oxd-calendar-date').filter({hasText: new RegExp(`^${leavetargetFromDate}$`)}).click();

        }

               async verifyToDate(expectedDate){
                await expect(this.leaveToDateInput).toHaveValue(expectedDate);

               }
                async selectLeaveToDate(leaveTargetToDateMonth,leaveTargetToDateYear,leaveTargetToDate){
                    await this.leaveToDateCalendarIcon.click();
                    console.log(await this.page.locator('.oxd-calendar-selector-month').count());

                    console.log(await this.page.locator('.oxd-calendar-selector-year').count());
                   let leaveCurrentToDateMonth = (await this.leaveToDateMonth.textContent()).trim();;
                    let leaveCurrentToDateYear = (await this.leaveToDateYear.textContent()).trim();;
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

            while(leaveCurrentToDateYear!==leaveTargetToDateYear||leaveCurrentToDateMonth!==leaveTargetToDateMonth){
                if(Number(leaveCurrentToDateYear)<Number(leaveTargetToDateYear)){
                    await this.leaveToNextButton.click();
                }
                else if(Number(leaveCurrentToDateYear)>Number(leaveTargetToDateYear)){
                    await this.leaveToPreviousButton.click();

                }else{
                    if(toDateMonths[leaveCurrentToDateMonth]<toDateMonths[leaveTargetToDateMonth]){
                        await this.leaveToNextButton.click();
                    }
                    else if(toDateMonths[leaveCurrentToDateMonth]>toDateMonths[leaveTargetToDateMonth]){
                        await this.leaveToPreviousButton.click();
                    }
                }

                leaveCurrentToDateMonth = (await this.leaveToDateMonth.textContent()).trim();
                leaveCurrentToDateYear = (await this.leaveToDateYear.textContent()).trim();
            }

            await this.leaveToDateCalendarPopup.locator('.oxd-calendar-date').filter({hasText:new RegExp(`^${leaveTargetToDate}$`)}).click();

                    }

                    async selectPartialDays(dropdownoption){
                        await this.partialDaysSelect.click();
                        await this.page.getByRole('option',{name:dropdownoption,exact:true}).click();
                    }

                    async selectStartDay(dropdownoption){
                        await this.startDay.click();
                        await this.page.getByRole('option',{name :dropdownoption}).click();
                    }


                    async selectDuration(dropdownoption){
                        await this.durationSelect.click();
                        await this.page.getByRole('option',{name:dropdownoption,exact:true}).click();
                    }
                async selectFromTime(targetHour,targetMinute,targetPeriod){
                    await this.durationFromClockIcon.click();
                    let currentHour =Number(await this.fromTimeHour.inputValue());
                    let currentMinute=Number(await this.fromTimeMinute.inputValue());
                  
                    while(currentHour!==targetHour||currentMinute!==targetMinute){
                    if(currentHour<targetHour){
                        await this.fromtimeHourUp.click();
                    }
                    else if (currentHour > targetHour) {
                       await this.fromtimeHourDown.click();
                    }
                    else{
                          if(currentMinute<targetMinute){
                        await this.fromtimeMinuteUp.click();
                    }
                    else if(currentMinute>targetMinute){
                        await this.fromtimeMinuteDown.click();
                    }

                    }

                    currentHour=Number(await this.fromTimeHour.inputValue());
                    currentMinute=Number(await this.fromTimeMinute.inputValue()); 
                }
                if(targetPeriod === "AM"){
                        await this.fromtimeAM.check();
                    }
                    else if(targetPeriod === "PM"){
                        await this.fromtimePM.check();
                    }   

                
            }
            async selectToTime(targetToHour,targetToMinute,targetToPeriod){
                await this.durationToClockIcon.click();
                let currentToHour = Number(await this.toTimeHour.inputValue());
                let currentToMinute=Number(await this.toTimeMinute.inputValue());
                while(currentToHour!==targetToHour||currentToMinute!==targetToMinute){
                       if(currentToHour<targetToHour){
                    await this.toHourUp.click();
                }
                else if(currentToHour>targetToHour){
                    await this.toHourDown.click();
                }
                else{
                    if(currentToMinute<targetToMinute){
                        await this.toMinuteUp.click();
                    }
                    else if(currentToMinute>targetToMinute){
                        await this.toMinuteDown.click();
                    }
                }

                currentToHour = Number(await this.toTimeHour.inputValue());
                currentToMinute=Number(await this.toTimeMinute.inputValue());

                }
                if(targetToPeriod === "AM"){
                    await this.toTimeAM.check();
                }
                else if(targetToPeriod === "PM"){
                    await this.toTimePM.check();
                }

                }

               async verifyLeaveDuration(){
                await expect(this.durationLabel).toBeVisible();
                await expect(this.leaveDuration).toBeVisible();
               }

               async enterComment(text){
               await this.leaveCommentTextarea.fill(text);
               }

               async clickAssignButton(){
                 await this.assignButton.click();
        }       

         async verifyLeaveAssignmentPopup(){
          
            await expect(this.confirmLeavePopup).toBeVisible({ timeout: 15000 });
            await expect(this.confirmHeading ).toBeVisible({ timeout: 15000 });
            await expect (this.confirmMessage).toBeVisible({ timeout: 15000 });

        }
        async cancelLeaveAssignment(){
            await this.confirmCancel.click({ timeout: 15000 });
        }
        async confirmLeaveAssignment(){
            await this.confirmOk.click({ timeout: 15000 });
        }
    }

       // GitHub change practice
        








        





    

