# ЛБ 4.0. Выбор исполнителя сборки

**PASS · 22 ноября 2026**

## Цель и адаптация

Выбор исполнителя сборки. Для CI выбран GitHub-hosted runner с образом Ubuntu, задокументированы требования к интерпретатору и подбор по меткам.

## Проверка

[Конфигурация runner](../RUNNERS.md) и [задание test-and-build](../../.github/workflows/ci.yml).

## Результат на GitHub

GitHub выделил стандартный hosted runner для [задания test-and-build](https://github.com/kziborova/Programmnaya_Inzheneriya/actions/runs/45044855881/job/137277120734). В журнале Set up job указан образ ubuntu-26.04 версии 20261116.202.1. Задание завершилось успешно за 6 секунд.
