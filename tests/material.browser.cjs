// Run against the built site. Install Playwright locally or provide it via NODE_PATH.
const assert = require("node:assert/strict");
const { test } = require("node:test");
const { chromium } = require("playwright");

test("Каталог, отдельные страницы, история и заявки", async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  try {
    const page = await browser.newPage();
    const root = process.env.SITE_URL || "http://127.0.0.1:8000/";
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(root);
    const cards = page.locator(".card");
    await cards.first().waitFor();
    const titles = await cards.locator("h3").allTextContents();
    const data = await (await page.request.get(new URL("data/tutorials.json", root).href)).json();
    assert.equal(titles.length, data.length);
    const iconUrl = await page.locator('link[rel="icon"]').getAttribute("href");
    const icon = await page.request.get(new URL(iconUrl, root).href);
    assert.equal(icon.status(), 200);
    assert.equal(icon.headers()["content-type"], "image/png");
    for (const index of [...data.keys(), 0]) {
      await cards.nth(index).getByRole("link", { name: "Открыть материал" }).click();
      await page.getByRole("heading", { name: titles[index], exact: true }).waitFor();
      assert.equal(new URL(page.url()).searchParams.get("id"), data[index].id);
      assert.equal(await page.locator('link[rel="icon"]').getAttribute("href"), iconUrl);
      assert.equal(await page.locator(".lesson section").count(), data[index].content.length);
      await page.getByRole("heading", { name: "Вывод", exact: true }).waitFor();
      assert.equal(await page.locator(".lesson section p").first().innerText(), data[index].content[0].text);
      await page.getByRole("link", { name: /Вернуться к каталогу/ }).click();
      await page.locator("#recent li a").first().waitFor();
      assert.equal(await page.locator("#recent li a").first().innerText(), titles[index]);
    }
    await page.reload();
    assert.equal(await page.locator("#recent li a").count(), titles.length);
    await page.locator("#recent li a").first().click();
    await page.getByRole("heading", { name: titles[0], exact: true }).waitFor();
    await page.goBack();
    await page.getByLabel("Тема запроса").fill("  ");
    await page.getByRole("button", { name: "Сохранить запрос" }).click();
    assert.equal(await page.evaluate(() => localStorage.getItem("pu-academy-requests")), null);
    await page.getByLabel("Тема запроса").fill("Пример для проверки");
    await page.getByRole("button", { name: "Сохранить запрос" }).click();
    assert.match(await page.getByRole("status").innerText(), /сохранён в браузере/);
    await page.reload();
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem("pu-academy-requests"))[0].topic), "Пример для проверки");

    for (const path of ["material.html", "material.html?id=missing"]) {
      await page.goto(new URL(path, root).href);
      await page.getByRole("heading", { name: "Материал не найден" }).waitFor();
    }
    // Fixture only: exercise optional fields without adding invented records to the catalog.
    await page.route("**/data/tutorials.json", route => route.fulfill({
      json: [{ ...data[0], author: "Тестовый автор", category: "Тестовая категория", year: 2020, content: "Тестовый текст" }]
    }));
    await page.goto(new URL("material.html?id=" + data[0].id, root).href);
    await page.getByText("Тестовый текст", { exact: true }).waitFor();
    assert.deepEqual(await page.locator("dd").allTextContents(), ["Тестовый автор", "Тестовая категория", data[0].level, "2020"]);
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
});
