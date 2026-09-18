import { test,expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { AttendanceSummaryPage } from '../pages/attendancesummary';

test ('Attendance summary using POM' , async ({page}) => {
await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const loginPage = new LoginPage(page);
    await loginPage.login("Admin","admin123");
    await expect(page.getByRole('heading',{name :"Dashboard"})).toBeVisible();
    
    const attendancesummary = new AttendanceSummaryPage(page);
    await attendancesummary.openAttendanceSummary();
    await attendancesummary.enterEmployeeName("Peter","Peter TestGen");
    await attendancesummary.selectJobTitle("Chief Executive Officer");
    await attendancesummary.selectSubUnit("Development");
    await attendancesummary.selectEmploymentStatus("Full-Time Permanent");
    await attendancesummary.selectFromDate("November","2026",10);
    await attendancesummary.selectToDate("May","2026",1);
    
});