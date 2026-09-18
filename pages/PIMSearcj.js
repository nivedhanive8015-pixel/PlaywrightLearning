export class PIMSearch{
    constructor(page){
        this.page =page;
        this.employeeName = page.getByPlaceholder("Type for hints...");
        this.employeeId =page.locator('label:has-text("Employee Id")')
        .locator('..')
        .locator('.oxd-input.oxd-input--active');
        this.employmentStatus=page.locator('label:has-text("Employment Status")')
        .locator('..')
        .locator('.oxd-select-text.oxd-select-text--active');
        this.include=page.locator('label:has-text("Include")')
        .locator('..')
        .locator('.oxd-select-text-input');
        this.superVisorName =page.locator('label:has-text("Supervisor Name")')
        .locator('..')
        .getByPlaceholder('Type for hints...');
         this.jobtitle =page.locator('label:has-text("Job Title")')
         .locator('..')
         .locator('.oxd-select-text.oxd-select-text--active');
         this.subUnit=page.locator('label:has-text("Sub Unit")')
         .locator('..')
         .locator('.oxd-select-text-input');
         this.search=page.getByRole('button',{name:'Search'});
    }
         
         async pim(employeename,employeeid,employeementstatus,include,supervisorname,jobtitle,subunit){
            await this.employeeName.fill(employeename);
            await this.employeeId.fill(employeeid);
            await this.employmentStatus.click();
            await this.page.getByText(employeementstatus).click();
            await this.include.click();
            await this.page.getByText(include).click();
            await this.superVisorName.fill(supervisorname);
            await this.jobtitle.click();
            await this.page.getByText(jobtitle).click();
            await this.subUnit.click();
            await this.page.getByText(subunit).click();
            await this.search.click();
         }
        
    }
