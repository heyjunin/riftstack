import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(
    page.getByRole("heading", { name: "Welcome to React Router + tRPC + Hono" })
  ).toBeVisible();
});

test("shows application status", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page.getByText("Application Status")).toBeVisible();
  await expect(page.getByText("4")).toBeVisible();
  await expect(page.getByText("active")).toBeVisible();
});

test("navigation works", async ({ page }) => {
  await page.goto("http://localhost:5173");

  // Check if navigation is visible
  await expect(page.getByText("Home")).toBeVisible();
  await expect(page.getByText("About")).toBeVisible();
  await expect(page.getByText("Settings")).toBeVisible();

  // Navigate to About page
  await page.click("text=About");
  await expect(page.getByText("About Our Template")).toBeVisible();

  // Navigate to Settings page
  await page.click("text=Settings");
  await expect(page.getByText("Settings")).toBeVisible();

  // Go back to Home
  await page.click("text=Home");
  await expect(
    page.getByRole("heading", { name: "Welcome to React Router + tRPC + Hono" })
  ).toBeVisible();
});
