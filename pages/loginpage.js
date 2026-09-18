export class LoginPage{
    constructor(page){
        this.page=page;
        this.Usernametext =page.getByRole('textbox',{name:"Username "});
        this.Passwordtext =page.getByRole('textbox',{name:"Password "});
        this.button =page.getByRole('button',{name :"Login"});
    }

    async login(Username,Password){
        await this.Usernametext.fill(Username);
        await this.Passwordtext.fill(Password);
        await this.button.click();
        await this.page.waitForURL('**/dashboard/index');
    }

    
}