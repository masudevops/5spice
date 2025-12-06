# Testing Guide: Five Spice Website

This project uses [Playwright](https://playwright.dev/) for automated end-to-end (E2E) testing. The tests simulate a real user navigating the website to ensure all critical features work as expected.

## Prerequisites
Ensure all dependencies are installed:
```bash
cd client
npm install
npx playwright install
```

## Running Tests
To run the full test suite in headless mode (no browser UI):
```bash
npm test
```
*Note: This will automatically start the dev server, run the tests, and then shut down.*

### Visual Mode
To verify tests visually (opens the browser):
```bash
npx playwright test --ui
```

### Viewing Reports
If tests fail, a report is generated. Viewing it:
```bash
npx playwright show-report
```

## What is Tested?
The `e2e/navigation.spec.js` suite covers:
1.  **Homepage**: Verifies "COMING SOON TO DFW" hero text.
2.  **Supermarket**: Checks navigation and search bar visibility.
3.  **Restaurant**: Checks navigation and menu headers.
4.  **Pickup & Delivery**: Verifies the "Order Online" button redirects correctly.
5.  **New Pages**: Verifies Sales and Catering pages load.
