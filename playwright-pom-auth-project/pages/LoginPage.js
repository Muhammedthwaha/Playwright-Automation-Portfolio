class LoginPage {
    // 1. Constructor: This runs when our test creates the login page.
    // We store all our button and text box locators here in ONE place!
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }   

     // 2. Action Method: Open the website URL in the browser
    async goto() {
        //this is used to navigate to the website URL
        await this.page.goto('https://www.saucedemo.com/');
    }

     // 3. Action Method: Type the username, type the password, and click Login!
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

// 4. Export our class so our tests can import and borrow it!
module.exports = { LoginPage };