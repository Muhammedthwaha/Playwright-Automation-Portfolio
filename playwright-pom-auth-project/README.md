# 🛍️ Enterprise Playwright E-Commerce Suite

A production-grade, 10-spec End-to-End (E2E) automation framework built with **Playwright** and **JavaScript (Node.js)**. This project tests a mock e-commerce platform (Saucedemo) and demonstrates advanced, industry-standard SDET architectural patterns.

## 🚀 Architectural Highlights

*   **Page Object Model (POM):** Clean separation of UI locators (`pages/`) and test assertions (`tests/`) to ensure the framework is highly scalable and DRY (Don't Repeat Yourself).
*   **Authentication State Caching (`storageState`):** Uses a dedicated `auth.setup.js` script to log in once, extract the session cookies to an `auth.json` file, and inject them into subsequent tests. This allows the 10-spec suite to completely bypass the login UI and execute instantly.
*   **Dynamic Locators:** Avoids fragile hardcoded CSS IDs by using Playwright's `.filter({ hasText: ... })` to dynamically interact with any product on the page.
*   **Fully Parallel Execution:** Configured via `playwright.config.js` to execute tests within the same file simultaneously across 4 CPU workers (`fullyParallel: true`).

## 📂 Project Structure

```text
playwright-pom-auth-project/
├── pages/
│   ├── LoginPage.js        # Locators and actions for authentication
│   └── HomePage.js         # Dynamic locators for inventory, sorting and cart management
├── tests/
│   ├── auth.setup.js       # Authentication setup (Exports browser cookies)
│   └── e-commerce.spec.js  # The 10 E2E tests (Runs in parallel, bypassing login)
├── playwright.config.js    # Playwright config (Project Dependencies & Workers)
└── auth.json               # (Auto-generated) Stored session cookies

🧪 Test Coverage
This suite contains 10 comprehensive tests verifying critical business workflows:

1. Session persistence (Auth Caching verification).
2. Dynamic single-item and multi-item cart additions.
3. Shopping cart badge calculations.
4. Item removal and state verification (.toBeHidden()).
5. Product sorting algorithms (Price: Low to High & High to Low).
6. Cart-to-Dashboard navigation routing.

## 📋 Prerequisites
Before running this project, ensure you have the following installed on your machine:
*   **[Node.js](https://nodejs.org/)** (v14 or higher)
*   **npm** (comes automatically with Node.js)
*   **Playwright**: npx playwright install

## 💻 How to Run Locally

You can either download my entire automation portfolio, or download just this specific project folder!

**Option A: Clone the Entire Portfolio**
```bash
git clone https://github.com/Muhammedthwaha/Playwright-Automation-Portfolio.git
cd Playwright-Automation-Portfolio/playwright-pom-auth-project
npm install
```

**Option B: Download ONLY this Project Folder**
If you only want to test this specific framework, you can use `npx degit` to download just this sub-directory instantly:
```bash
npx degit Muhammedthwaha/Playwright-Automation-Portfolio/playwright-pom-auth-project E2E-pom-project
cd E2E-pom-project
npm install
```

**Execute the Test Suite**
To watch the tests run visually in parallel across 4 browsers:
```bash
npx playwright test --headed
```
To run the tests silently in the background (CI/CD server standard):
```bash
npx playwright test
```
```

How does that updated section look? Adding that `degit` command makes you look like an absolute Node.js professional!