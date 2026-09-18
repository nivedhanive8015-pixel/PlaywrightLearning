import { expect } from '@playwright/test';
export class LeaveReports{
    constructor(page){
        this.page =page;
        this.leaveLink = page.getByRole('link',{name :"Leave"});
        this.reportTab =page.locator('.oxd-topbar-body-nav-tab').filter({hasText:"Reports"});

        this.leaveEntitlements =page.getByRole('menuitem',{name :"Leave Entitlements and Usage Report",exact :true});
        this.leaveEntitlementsHeading =page.getByRole('heading',{name :"Leave Entitlements and Usage Report",exact :true});

        this.generateFor =page.getByText("Generate For");
        this.leaveTypeRadio =page.getByRole("radio",{name : "Leave Type"});
        this.leaveTypeLabel = page.getByText("Leave Type")
        .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
        this.leaveTypeWrapper = this.leaveTypeLabel.locator('.oxd-select-wrapper');
        this.leaveTypeSelect = this.leaveTypeWrapper.locator('.oxd-select-text');

        this.leavePeriod = page.getByText("Leave Period")
        .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
        this.leavePeriodWrapper = this.leavePeriod.locator('.oxd-select-wrapper');
        this.leavePeriodSelect = this.leavePeriodWrapper.locator('.oxd-select-text');

        this.location = page.getByText("Location")
        .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
        this.locationWrapper=this.location.locator('.oxd-select-wrapper');
        this.locationSelect =this.locationWrapper.locator('.oxd-select-text');

        this.subUnit = page.getByText("Sub Unit",{exact:true})
        .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
        this.subUnitWrapper = this.subUnit.locator('.oxd-select-wrapper');
        this.subUnitSelect =this.subUnitWrapper.locator('.oxd-select-text');
        

        this.jobTitle = page.getByText("Job Title")
        .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]');
        this.jobTitleWrapper = this.jobTitle.locator('.oxd-select-wrapper');
        this.jobTitleSelect = this.jobTitleWrapper.locator('.oxd-select-text');

        this.leaveEntitlementsToggle =page.getByText("Include Past Employees",{exact:true});
        this.toggleGrid =this.leaveEntitlementsToggle.locator('xpath=ancestor::div[contains(@class,"orangehrm-leave-filter")]');
        this.toggleWrapper =this.toggleGrid.locator('.oxd-switch-wrapper');
        this.toggleCheckBox =this.toggleWrapper.locator('input[type ="checkbox"]');
        this.toggleLabel =this.toggleWrapper.locator('label');

        this.generateButton = page.getByRole('button',{name : " Generate",exact:true});

    }

    async openLeaveEntitlementReport(){
        await this.leaveLink.click();
        await this.reportTab.click();
        await this.leaveEntitlements.click();
        await expect(this.leaveEntitlementsHeading).toBeVisible();
    }

    async selectLeaveTypeRadio() {
    if (await this.leaveTypeRadio.isChecked()) {
        console.log("Already checked");
    } else {
        await this.leaveTypeRadio.check();
    }
}
    async selectLeaveType(dropdownoption){
        await this.leaveTypeSelect.click();
        await this.page.getByRole('option',{name : dropdownoption,exact :true}).click();
    }

    async selectLeavePeriod(dropdownoption){
        await this.leavePeriodSelect.click();
        await this.page.getByRole('option',{name :dropdownoption,exact:true}).click();
    }

    async selectLocation(dropdownoption){
        await this.locationSelect.click();
        await this.page.getByRole('option',{name :dropdownoption,exact:true}).click();
    }

    async selectSubUnit(dropdownoption){
        console.log(await this.subUnit.count());
        console.log(await this.subUnitSelect.count());
        await this.subUnitSelect.click();
        await this.page.getByRole('option',{name : dropdownoption,exact:true}).click();
    }
    async selectJobTitle(dropdownoption){
        await this.jobTitleSelect.click();
        await this.page.getByRole('option',{name :dropdownoption,exact:true}).click();

    }

    async enableIncludePastEmployees(){
       if (await this.toggleCheckBox.isChecked()){
        console.log("Already checked");
       }
       else{
        await this.toggleLabel.click();
       }
    }

    async generate(){
        await this.generateButton.click();
    }

}