// 1. Import Playwright's test tools and our HomePage class
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

// 2. Before every test runs, open the Dashboard! (Skipping login thanks to auth.json!)
test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
});

// TEST 1: Verify Auth Caching works
test('Test 1: Verify Dashboard access without typing credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.pageTitle).toHaveText('Products');
});

// TEST 2: Add Bike Light and verify cart badge shows 1
test('Test 2: Add Bike Light to cart and verify cart badge is 1', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.addProductToCart('Sauce Labs Bike Light');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

// TEST 3: Add Fleece Jacket and verify cart badge shows 1
test('Test 3: Add Fleece Jacket to cart and verify cart badge is 1', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.addProductToCart('Sauce Labs Fleece Jacket');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

// TEST 4: Add 3 different items and verify cart badge calculates 3 total items
test('Test 4: Add 3 different items and verify cart badge calculates 3', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.addProductToCart('Sauce Labs Bike Light');
    await homePage.addProductToCart('Sauce Labs Fleece Jacket');
    await homePage.addProductToCart('Sauce Labs Bolt T-Shirt');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
});

// TEST 5: Open shopping cart and verify URL changes to /cart.html
test('Test 5: Open shopping cart and verify URL navigates to cart.html', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openCart();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
});

// TEST 6: Add Backpack, open cart, and verify item name exists inside cart list
test('Test 6: Verify added item appears inside the shopping cart list', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.addProductToCart('Sauce Labs Backpack');
    await homePage.openCart();
    // Verify that the text "Sauce Labs Backpack" is visible inside the cart page!
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
});

// TEST 7: Add item, click Remove, and verify cart badge disappears!
test('Test 7: Remove item from Dashboard and verify cart badge disappears', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.addProductToCart('Sauce Labs Backpack');
    // First verify it was added (badge says 1)
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    // Now click Remove!
    await homePage.removeItem('Sauce Labs Backpack');
    // Verify the badge is completely gone from the screen!
    await expect(page.locator('.shopping_cart_badge')).toBeHidden();
});

// TEST 8: Test Filter Dropdown: Sort by "Price (low to high)" and verify cheapest item ($7.99) is first
test('Test 8: Sort products by price Low to High and verify first price is $7.99', async ({ page }) => {
    const homePage = new HomePage(page);
    // On Saucedemo, 'lohi' is the dropdown code for Price: Low to High
    await homePage.sortProducts('lohi');
    const firstPrice = await homePage.getFirstItemPrice();
    expect(firstPrice).toBe('$7.99');
});

// TEST 9: Test Filter Dropdown: Sort by "Price (high to low)" and verify expensive item ($49.99) is first
test('Test 9: Sort products by price High to Low and verify first price is $49.99', async ({ page }) => {
    const homePage = new HomePage(page);
    // On Saucedemo, 'hilo' is the dropdown code for Price: High to Low
    await homePage.sortProducts('hilo');
    const firstPrice = await homePage.getFirstItemPrice();
    expect(firstPrice).toBe('$49.99');
});

// TEST 10: Click "Continue Shopping" from inside the cart and verify return to Dashboard
test('Test 10: Click Continue Shopping from cart and verify return to Dashboard', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openCart();
    // Click the "Continue Shopping" button on the cart page
    await page.locator('#continue-shopping').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});