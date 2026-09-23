import { test, expect } from "@playwright/test";

test("signup page loads with an email field", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();
});

test("visitor can subscribe", async ({ page }) => {
  await page.goto("/");
  await page.fill('input[name="email"]', `pw+${Date.now()}@example.com`);
  await page.click("button");
  await expect(page.locator("#m")).toContainText("Thanks", { timeout: 10_000 });
});

test("embeddable form loads", async ({ page }) => {
  await page.goto("/embed");
  await expect(page.locator('input[name="email"]')).toBeVisible();
});

test("admin page is served", async ({ page }) => {
  await page.goto("/admin");
  await expect(page.locator("h1")).toContainText("Send");
});

test("unsubscribe link shows a confirmation step", async ({ page }) => {
  await page.goto("/unsubscribe?t=some-token");
  await expect(page.getByRole("button", { name: "Unsubscribe" })).toBeVisible();
});

test("signup page shows the credit link by default", async ({ page }) => {
  await page.goto("/");
  const credit = page.getByRole("link", { name: "newsletter-template" });
  await expect(credit).toHaveAttribute("href", /rafaelpfister\.ch\/en\/blog\/serverless-newsletter.*utm_medium=page&utm_content=signup/);
});
