// 1. Import Playwright's test tools and our two Page Objects!
// Notice: We rename "test" to "setup" so Playwright knows this is a preparation script!
const { test: setup, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');

// 2. Define the file path where our VIP login cookies will be saved
const authFile = 'auth.json';

// 3. Our Setup Script: Log in once and export the cookies!
setup('authenticate as admin user and save cookies', async ({ page }) => {

    // Step A: Initialize our Page Objects so we can use their clean methods
  const loginPage = new LoginPage(page); 
  const homePage = new HomePage(page);

    // Step B: Go to the login page and type our credentials
    console.log('[AuthSetup] 🔐 Navigating to login page...');
    await loginPage.goto();

    console.log('[AuthSetup] 🔑 Typing credentials and logging in...');
    await loginPage.login('standard_user', 'secret_sauce');

    // Step C: Verify that login actually succeeded by checking if the "Products" title appeared!
    await expect(homePage.pageTitle).toHaveText('Products');
    console.log('[AuthSetup] ✅ Successfully logged in! We are on the Dashboard.');

    // Step D: THE MAGIC LINE! Save our browser security cookies into the auth.json file!
    // page.context() means that have access to the browser context, which is where cookies are stored. 
    // We call storageState() to save the cookies to a file.
    await page.context().storageState({ path: authFile });
    console.log(`[AuthSetup] 💾 VIP wristband (login cookies) saved to: ${authFile}!`);
});