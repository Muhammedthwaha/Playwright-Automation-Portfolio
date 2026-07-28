// here defineConfig is used to define the configuration for Playwright tests
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    // 1. Tell Playwright where our tests live
    testDir: './tests',
    // 2. Maximum time one test is allowed to run 30 seconds 
    timeout: 30000,
    // 3. Reporter format for terminal logs
    reporter: 'list',

    // 4. Tell Playwright to break apart tests inside the SAME file and run them in parallel!
    fullyParallel: true,

    // 5. How many browser workers to run in parallel (default is 5, but we can change it)
    workers: 4,

    // 6. THE MASTER PLAN: We configure our Setup Project and our Browser Test Project!
    projects: [
        // STEP A: The Setup Project (Runs FIRST to create our VIP wristband cookie!)
        {
            name: 'setup',
            testMatch: 'auth.setup.js',
        },
        // STEP B: Our Actual Browser Tests (Chromium)
        {
            name: 'chromium',
            use: { 
                ...devices['Desktop Chrome'],
                // THE MAGIC LINE: Tell Chrome to automatically load our saved login cookies!
                storageState: 'auth.json', 
            },
            // THE DEPENDENCY RULE: Tell Playwright never to run this until 'setup' finishes!
            dependencies: ['setup'],
        },
    ],
});

