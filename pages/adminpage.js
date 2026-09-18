export class AdminPage{
    constructor(page){
        this.page =page;
        this.usernameInput = page.locator('.oxd-input oxd-input--active').first();
        this.userRole = page.locator('.oxd-select-text-input');
        this.employeeName =page.getByPlaceholder('Type for hints...');
        this.status = page.locator('.oxd-select-text oxd-select-text--active');
        
    }

    async Admin(userName,userrole,employeeName,status){
        await this.usernameInput.fill(userName);
        await this.userRole.click();
        await this.page.getByText(userRole).click();
        await this.employeeName.fill(employeeName);
        await this.status.click();
        await this.page.getByText(status).click();

    }
}

/*export is used to  makes this class to use by other files 
 import is used to export the class to another file so it can be resued in the test script.
creating a special method called constructor and stored a parameter pages(page indicates browser tab without browser tab it allow us to interact with the element)
storing the properties (usernameInput) in the object .inside property i m storing the locators
create a method Admin() (perform the action) and method recive the parameters
if its dropdown first we click then the dropdown is text so using getbytext selecting role then click.
For a textbox, we use fill() to enter text.
For a custom dropdown, we first use click() to open the dropdown, then use getByText() to locate the required option by its visible text, and finally click() the option.
his structure follows the Page Object Model (POM), which helps reduce code duplication, improve readability, and make maintenance easier when the application changes./*