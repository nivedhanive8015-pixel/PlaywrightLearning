import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/loginpage';
test('Search_employee_information in PIM', async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const loginPage = new LoginPage(page);
    await loginPage.login("Admin","admin123");
    await expect(page.getByRole('heading',{name :"Dashboard"})).toBeVisible();
    await page.getByRole('link',{name : "PIM"}).click();
    await expect(page.getByRole('heading',{name :"PIM"})).toBeVisible();
    await expect(page.getByRole('heading',{name :"Employee Information"})).toBeVisible();
    const employeeNameTextbox = page.getByPlaceholder('Type for hints...').first();
    await employeeNameTextbox.fill("Jordan  Ferreira");
    await expect(employeeNameTextbox).toHaveValue("Jordan  Ferreira");
    await page.getByRole('button',{name : " Search "}).click();
    await expect(page.getByText('No Records Found').first()).toBeVisible();
});