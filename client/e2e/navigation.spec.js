import { test, expect } from '@playwright/test';

test.describe('Five Spice Website E2E', () => {

    test('Homepage loads with correct Hero text', async ({ page }) => {
        await page.goto('/');

        // Verify Page Title is present (Logo)
        await expect(page.getByRole('link', { name: 'Five Spice Supermarket &' })).toBeVisible();

        // Verify Hero Text
        await expect(page.getByText('COMING SOON TO DFW')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Bringing Together the Flavors' })).toBeVisible();
    });

    test('Navigation to Supermarket works', async ({ page }) => {
        await page.goto('/');
        await page.click('text=Supermarket');

        await expect(page).toHaveURL(/.*supermarket/);
        await expect(page.getByPlaceholder('Search products...')).toBeVisible();
        await expect(page.getByText('Halal Supermarket')).toBeVisible();
    });

    test('Navigation to Restaurant works', async ({ page }) => {
        await page.goto('/');
        await page.click('text=Restaurant');

        await expect(page).toHaveURL(/.*restaurant/);
        await expect(page.getByText('The Five Spice Kitchen')).toBeVisible();
    });

    test('Pickup & Delivery CTA works', async ({ page }) => {
        await page.goto('/');

        // Click the Order Online button
        await page.getByRole('link', { name: 'Order Online – Pickup & Delivery' }).click();

        await expect(page).toHaveURL(/.*pickup/);
        await expect(page.getByRole('heading', { name: 'Grocery Pickup & Delivery' })).toBeVisible();
        await expect(page.getByText('Interactive Delivery Map Area')).toBeVisible();
    });

    test('Weekly Sales page loads', async ({ page }) => {
        await page.goto('/sales');
        await expect(page.getByRole('heading', { name: 'Weekly Specials' })).toBeVisible();
    });

    test('Catering page loads', async ({ page }) => {
        await page.goto('/catering');
        await expect(page.getByRole('heading', { name: 'Make Your Event Unforgettable' })).toBeVisible();
    });

});
