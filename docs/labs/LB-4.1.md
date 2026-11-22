# ЛБ 4.1. Проверка непрерывной интеграции

**PASS · 22 ноября 2026**

## Цель и адаптация

Проверка непрерывной интеграции. Workflow реагирует на push в main и pull request, проверяет приложение, собирает dist и загружает артефакт. Исправлена упаковка служебных файлов macOS.

## Проверка

Локально прошли 3/3 теста unittest и проверка синтаксиса JS. Главная страница, JavaScript, CSS и JSON вернули HTTP 200 при проверке через loopback. [CI](../../.github/workflows/ci.yml), [скрипт сборки](../../scripts/build_site.py).

## Результат на GitHub

[CI №45044855881](https://github.com/kziborova/Programmnaya_Inzheneriya/actions/runs/45044855881) завершился со статусом success с первой попытки на коммите `3e0236a`. В журнале Test — 3 успешных теста. Сборка и загрузка [артефакта parts-unlimited-site](https://github.com/kziborova/Programmnaya_Inzheneriya/actions/runs/45044855881/artifacts/14762928985) прошли. Запуск инициирован вручную через workflow_dispatch. В журнале есть предупреждение о переходе используемых Actions с Node.js 20 на 24.
