class HomePage {
// 1. Constructor: Store all the locators for our Dashboard/Home page
    constructor(page) {
        this.page = page;
        // The title text at the top left that says "Products"
        this.pageTitle = page.locator('.title');
        // The shopping cart icon at the top right of the screen
        this.cartIcon = page.locator('.shopping_cart_link');
        // Locator for the sort filter dropdown at top right
        this.sortDropdown = page.locator('.product_sort_container');
        // Locator for all product prices on the screen
        this.itemPrices = page.locator('.inventory_item_price');
    }

    // 2. GENERALIZED ACTION METHOD: Add ANY product to the cart by its name!
    // Notice: We pass "productName" into the function as a variable!
    async addProductToCart(productName) {
        // Step A: Find all product cards (.inventory_item), then FILTER to find only the one with our product's name!
        const productCard = this.page.locator('.inventory_item').filter({ hasText: productName });
        // Step B: Inside that specific card, find and click the "Add to cart" button!
        // the 'button' locator is <button> tag
        await productCard.locator('button').click();
    }

    // 3: Remove ANY product by name (Clicks the "Remove" button inside that box)
    async removeItem(productName) {
        const productCard = this.page.locator('.inventory_item').filter({ hasText: productName });
        await productCard.locator('button:has-text("Remove")').click();
    }

    // 4: Select an option from the filter dropdown (e.g., 'low to high' or 'high to low')
    async sortProducts(sortOption) {
        await this.sortDropdown.selectOption(sortOption);
    }

    // 5: Get the text of the very first price on the screen (to verify sorting!)
    async getFirstItemPrice() {
        return await this.itemPrices.first().innerText();
    }

    // 6. Action Method: Click the shopping cart icon to view our items
    async openCart() {
        await this.cartIcon.click();
    }
}

// 7. Export our class so our tests can import it!
module.exports = { HomePage };