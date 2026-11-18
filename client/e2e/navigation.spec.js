import { test, expect } from '@playwright/test';

test.describe('5 Spice Website E2E', () => {

    test('Coming soon homepage loads with finalized brand text', async ({ page }) => {
        await page.goto('/');

        await expect(page).toHaveTitle(/5 Spice Market & Kitchen/);
        await expect(page.getByRole('img', { name: '5 Spice Market & Kitchen' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'A New Home Is Coming to Plano, Texas.' })).toBeVisible();
        await expect(page.getByText('Named after "পাঁচফোড়ন" — the traditional five-spice blend at the heart of every South Asian kitchen.')).toBeVisible();
        await expect(page.getByText('Premium Halal Grocery • Fresh Produce • Fresh Fish • Authentic Bangladeshi Restaurant')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Premium Halal Market' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Authentic Bangladeshi Restaurant' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Serving the DFW Community' })).toBeVisible();
        await expect(page.getByText('Opening Early 2027')).toBeVisible();
        await expect(page.getByText('Follow our journey to opening day.')).toBeVisible();
        await expect(page.getByRole('link', { name: 'info@5spicemarket.com' })).toBeVisible();
        await expect(page.getByRole('link', { name: '5 Spice Market on Facebook' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Instagram @5SpiceMarket profile URL to be confirmed' })).toBeVisible();
    });

    test('Legacy cafe path redirects to Kitchen route', async ({ page }) => {
        await page.goto('/cafe');

        await expect(page).toHaveURL(/.*\/kitchen/);
        await expect(page.getByRole('heading', { name: 'The 5 Spice Kitchen' })).toBeVisible();
    });

    test('Primary navigation is hidden but direct routes remain available in coming soon mode', async ({ page }) => {
        await page.goto('/');

        await expect(page.getByRole('navigation')).toHaveCount(0);
        await page.goto('/market');
        await expect(page.getByRole('heading', { name: 'Halal Market' })).toBeVisible();
    });

    test('Coming soon page has no horizontal overflow on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto('/');

        const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
        expect(hasOverflow).toBe(false);
    });

});
