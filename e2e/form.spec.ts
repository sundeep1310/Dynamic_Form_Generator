import { test, expect } from '@playwright/test';

test('Dynamic Form Generator', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Check main title
  await expect(page.getByRole('heading', { name: 'Dynamic Form Generator', level: 1 })).toBeVisible();
  
  // Check form sections using more specific selectors
  await expect(page.getByRole('heading', { name: 'Form Preview', level: 2 })).toBeVisible();
});

test('handles invalid JSON', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Find Monaco editor container first
  const editorContainer = page.locator('.monaco-editor');
  await expect(editorContainer).toBeVisible();
  
  // Then interact with its textarea
  await page.getByRole('textbox').first().fill('{ invalid: json }');
  
  // Look for error message with more specific selector
  await expect(page.getByText('Error:')).toBeVisible();
});

test('validates required fields', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Click submit button
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Look for first required field message
  await expect(page.getByText('This field is required').first()).toBeVisible();
});