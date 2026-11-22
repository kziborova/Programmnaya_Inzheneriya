# ЛБ 4.2. Упаковка и доставка версии

**PASS · 22 ноября 2026**

## Цель и адаптация

Упаковка и доставка версии. CD по тегу v* ограничен приватным репозиторием. Шаги включают тесты, сборку, упаковку и передачу ZIP в GitHub Release. Для статического каталога данные поставляются как JSON. Публичное размещение через Pages опционально.

## Проверка

[CD](../../.github/workflows/release.yml) и [условие Pages](../../.github/workflows/pages.yml). Локальный ZIP прошёл проверку CRC и состава: index.html, assets/app.js, assets/style.css, data/tutorials.json.

## Результат на GitHub

Тег [v1.0.1](https://github.com/kziborova/Programmnaya_Inzheneriya/tree/v1.0.1) указывает на коммит `a9370af88d25c72bff114fc358886c2e243fa517`. При отправке тега событие push запустило [release.yml](https://github.com/kziborova/Programmnaya_Inzheneriya/actions/runs/45045456259) один раз. Задание package на ubuntu-latest прошло с первой попытки. В [журнале](https://github.com/kziborova/Programmnaya_Inzheneriya/actions/runs/45045456259/job/137278968134) подтверждены тестирование, сборка, упаковка, загрузка артефакта и публикация.

[Приватный релиз v1.0.1](https://github.com/kziborova/Programmnaya_Inzheneriya/releases/tag/v1.0.1) опубликован учётной записью github-actions[bot]. Из релиза скачан parts-unlimited-site.zip (3756 байт). Проверены CRC и SHA-256 `2e2db6fbab3bc2eda22f94eb7af9261fd65e7684a14a3222edd70ed874ad94ef`. Четыре файла (HTML, CSS, JavaScript и JSON) побайтово совпадают с исходниками тега. В предыдущей версии v1.0.0 загрузку выполняли через CLI; в версии v1.0.1 её выполнил сам workflow.
