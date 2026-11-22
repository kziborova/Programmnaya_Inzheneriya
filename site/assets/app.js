"use strict";

const RECENT_KEY = "pu-academy-recent";
const REQUEST_KEY = "pu-academy-requests";

function readArray(key) {
  try {
    const entries = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(entries) ? entries : [];
  } catch {
    return [];
  }
}

function element(tag, text) {
  const node = document.createElement(tag);
  node.textContent = text;
  return node;
}

function materialUrl(id) {
  return "material.html?" + new URLSearchParams({ id });
}

function renderRecent() {
  const list = document.getElementById("recent");
  const recent = readArray(RECENT_KEY).filter(item => item && item.id && item.title);
  list.replaceChildren();
  for (const item of recent) {
    const link = element("a", item.title);
    link.href = materialUrl(item.id);
    const entry = document.createElement("li");
    entry.append(link);
    list.append(entry);
  }
  if (!recent.length) list.append(element("li", "Пока ничего нет"));
}

function remember(item) {
  const remaining = readArray(RECENT_KEY).filter(entry => entry && entry.id !== item.id);
  const next = [{ id: item.id, title: item.title }, ...remaining].slice(0, 5);
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    // The material stays readable when browser storage is unavailable.
  }
}

function showCatalog(area, items) {
  area.replaceChildren();
  for (const item of items) {
    const card = document.createElement("article");
    card.className = "card";
    const link = element("a", "Открыть материал");
    link.href = materialUrl(item.id);
    link.className = "open-material";
    card.append(element("h3", item.title), element("small", item.level),
      element("p", item.summary || item.description), link);
    area.append(card);
  }
}

function showMaterial(area, items) {
  const id = new URLSearchParams(location.search).get("id");
  const item = items.find(entry => entry.id === id);
  const title = item ? item.title : "Материал не найден";
  document.getElementById("material-title").textContent = title;
  document.title = title + " — Parts Unlimited Academy";
  if (!item) {
    area.textContent = "Перейдите в каталог и выберите учебник из списка.";
    return;
  }

  area.replaceChildren();
  const meta = document.createElement("dl");
  meta.className = "material-meta";
  for (const [label, value] of [
    ["Автор", item.author], ["Категория", item.category],
    ["Уровень", item.level], ["Год издания", item.year]
  ]) {
    if (value) meta.append(element("dt", label), element("dd", value));
  }
  if (meta.childElementCount) area.append(meta);
  if (item.description) area.append(element("p", item.description));
  const article = document.createElement("article");
  article.className = "lesson";
  article.append(element("h2", "Учебный материал"));
  if (Array.isArray(item.content)) {
    for (const part of item.content) {
      const section = document.createElement("section");
      section.append(element("h3", part.heading));
      if (part.text) section.append(element("p", part.text));
      if (part.items) {
        const list = document.createElement("ul");
        for (const line of part.items) list.append(element("li", line));
        section.append(list);
      }
      if (part.code) {
        const pre = document.createElement("pre");
        pre.append(element("code", part.code));
        section.append(pre);
      }
      if (part.after) section.append(element("p", part.after));
      article.append(section);
    }
  } else {
    article.append(element("p", item.content || "Для этой записи доступно краткое описание."));
  }
  area.append(article);
  remember(item);
}

async function loadPage() {
  const material = document.getElementById("material");
  const area = material || document.getElementById("tutorials");
  try {
    const response = await fetch("data/tutorials.json");
    if (!response.ok) throw new Error();
    const items = await response.json();
    if (material) showMaterial(area, items);
    else showCatalog(area, items);
  } catch {
    area.textContent = "Не удалось загрузить данные учебников. Обновите страницу.";
  }
}

const form = document.getElementById("request-form");
if (form) {
  // pageshow also fires when Back restores a cached catalog.
  window.addEventListener("pageshow", renderRecent);
  form.addEventListener("submit", event => {
    event.preventDefault();
    const topic = form.elements.topic.value.trim();
    if (!topic) return;
    const next = [{ topic, createdAt: new Date().toISOString() }, ...readArray(REQUEST_KEY)].slice(0, 30);
    localStorage.setItem(REQUEST_KEY, JSON.stringify(next));
    document.getElementById("request-message").textContent = 'Запрос «' + topic + '» сохранён в браузере.';
    form.reset();
  });
}
loadPage();
