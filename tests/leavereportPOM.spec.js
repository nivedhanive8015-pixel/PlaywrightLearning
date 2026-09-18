import { test,expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { LeaveReports } from '../pages/LeaveReports.js';

test ("leave report using POM",async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const loginPage = new LoginPage(page);
    await loginPage.login("Admin","admin123");
    await expect(page.getByRole('heading',{name :"Dashboard"})).toBeVisible();

    const leaveEntitlement = new LeaveReports(page);
    await leaveEntitlement.openLeaveEntitlementReport();
    await leaveEntitlement.selectLeaveTypeRadio();
    await leaveEntitlement.selectLeaveType("CAN - Personal");
    await leaveEntitlement.selectLeavePeriod("2021-01-01 - 2021-31-12");
    await leaveEntitlement.selectLocation("New York Sales Office");
    await leaveEntitlement.selectSubUnit("Development");
    await leaveEntitlement.selectJobTitle("Chief Executive Officer");
    await leaveEntitlement.enableIncludePastEmployees();
    await leaveEntitlement.generate();

});