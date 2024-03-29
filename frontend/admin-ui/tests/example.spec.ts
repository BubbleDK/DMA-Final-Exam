import { test, expect } from '@playwright/test';

test('Login process in Navbar component', async ({ page }) => {
  // Navigate to the application
  await page.goto('http://localhost:5173');

  // Check if the login button is initially visible
  const loginButton = await page.getByTestId('login-button');
  await expect(loginButton).toBeVisible();

  // Fill in the email and password fields
  await page.fill('[data-testid="email-login-input"]', 'employee123@gmail.com');
  await page.fill('[data-testid="password-login-input"]', '123');

  // Click the login button to submit the form
  await loginButton.click();

  // Check if the logout button is visible after login attempt
  await expect(await page.getByTestId('logout-button')).toBeVisible();
});

test('Check navigation functionality', async ({ page }) => {
  // Navigate to the application
  await page.goto('http://localhost:5173');

  // Check if the login button is initially visible
  const loginButton = await page.getByTestId('login-button');
  await expect(loginButton).toBeVisible();

  // Fill in the email and password fields
  await page.fill('[data-testid="email-login-input"]', 'employee123@gmail.com');
  await page.fill('[data-testid="password-login-input"]', '123');

  // Click the login button to submit the form
  await loginButton.click();

  // Check if the logout button is visible after login attempt
  await expect(await page.getByTestId('logout-button')).toBeVisible();

  // Check if the websites button is visible
  const websitesButton = await page.getByTestId('test-Websites');
  await expect(websitesButton).toBeVisible();
  await websitesButton.click();

  // Check if the URL has changed to /#/websites
  await expect(page.url()).toBe('http://localhost:5173/#/websites');
});