# ЛБ 4.2. Упаковка и доставка версии

**PARTIAL · 22 ноября 2026**

## Цель и адаптация

Упаковка и доставка версии. CD по тегу v* ограничен приватным репозиторием. Шаги включают тесты, сборку, упаковку и передачу ZIP в GitHub Release. Для статического каталога данные поставляются как JSON. Публичное размещение через Pages опционально.

## Проверка

[CD](../../.github/workflows/release.yml) и [условие Pages](../../.github/workflows/pages.yml). Локальный ZIP прошёл проверку CRC и состава: index.html, assets/app.js, assets/style.css, data/tutorials.json.

## Результат на GitHub

[Приватный релиз v1.0.0](https://github.com/kziborova/Programmnaya_Inzheneriya/releases/tag/v1.0.0) опубликован через GitHub CLI на проверенном коммите `3e0236a`. У этого коммита в сообщении есть [skip ci]; запуск release.yml по тегу не зарегистрирован. В релиз загружен ZIP непосредственно из [успешного CI](https://github.com/kziborova/Programmnaya_Inzheneriya/actions/runs/45044855881). Проверены четыре файла относительно тега и побайтовое совпадение скачанного release asset с артефактом CI. Размер 3354 байта, SHA-256 `787b6a73ab9a45c167ad91072a8acb6a2c58b814476f8a102274ca526603061d`. Для полной демонстрации автоматической доставки остаётся успешный запуск release.yml.
