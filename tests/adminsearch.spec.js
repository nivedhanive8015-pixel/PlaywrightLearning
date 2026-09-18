import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/loginpage';
test('Search employee in Admin page', async ({ page }) => {
await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
const loginPage = new LoginPage(page);
await loginPage.login("Admin","admin123");
await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
await page.getByRole('link',{name : "Admin"}).click();
const userRoleDropdown = page.locator('.oxd-select-text-input').first();
await userRoleDropdown.click();
await page.getByRole('option', { name: 'Admin' }).click();
await expect(userRoleDropdown).toContainText('Admin');
const statusDropdown = page.locator('.oxd-select-text-input').nth(1);
await statusDropdown.click();
await page.getByRole('option' , {name : 'Enabled'}).click();
await expect(statusDropdown).toContainText('Enabled');
await page.getByRole('button',{name:'Search'}).click();
await expect (page.getByText(/Records Found/i)).toBeVisible();
});
    