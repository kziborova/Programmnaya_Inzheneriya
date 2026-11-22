"use strict";
const RECENT_KEY = "pu-academy-recent";
const REQUEST_KEY = "pu-academy-requests";
function readArray(key) { try { const data = JSON.parse(localStorage.getItem(key) || "[]"); return Array.isArray(data) ? data : []; } catch { return []; } }
function renderRecent(items) {
  const list = document.getElementById("recent"); list.replaceChildren();
  if (!items.length) { const li=document.createElement("li"); li.textContent="Пока ничего нет"; list.append(li); return; }
  items.forEach(item => { const li=document.createElement("li"); li.textContent=item.title; list.append(li); });
}
function remember(item) {
  const remaining=readArray(RECENT_KEY).filter(x=>x.id !== item.id);
  const next=[{id:item.id,title:item.title},...remaining].slice(0,5);
  localStorage.setItem(RECENT_KEY,JSON.stringify(next));renderRecent(next);
}
async function loadTutorials() {
  const area=document.getElementById("tutorials");
  try {
    const response=await fetch("data/tutorials.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data=await response.json();area.replaceChildren();
    data.forEach(item=>{
      const card=document.createElement("article");card.className="card";
      const title=document.createElement("h3");title.textContent=item.title;
      const tag=document.createElement("small");tag.textContent=item.level;
      const p=document.createElement("p");p.textContent=item.description;
      const button=document.createElement("button");button.type="button";button.textContent="Открыть материал";button.addEventListener("click",()=>remember(item));
      card.append(title,tag,p,button);area.append(card);
    });
  } catch(err) { area.textContent=`Не удалось загрузить учебники: ${err.message}`; }
}
document.getElementById("request-form").addEventListener("submit",event=>{
  event.preventDefault();const topic=document.getElementById("topic").value.trim();if (!topic) return;
  const next=[{topic,createdAt:new Date().toISOString()},...readArray(REQUEST_KEY)].slice(0,30);
  localStorage.setItem(REQUEST_KEY,JSON.stringify(next));document.getElementById("request-message").textContent=`Запрос «${topic}» сохранён в браузере.`;
  event.target.reset();
});
renderRecent(readArray(RECENT_KEY));loadTutorials();
