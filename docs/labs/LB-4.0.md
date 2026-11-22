# ЛБ 4.0. Выбор исполнителя сборки

**PARTIAL · 22 ноября 2026**

## Цель и адаптация

Выбор исполнителя сборки. Для CI выбран GitHub-hosted runner с образом Ubuntu, задокументированы требования к интерпретатору и подбор по меткам.

## Проверка

[Конфигурация runner](../RUNNERS.md) и [задание test-and-build](../../.github/workflows/ci.yml).

## Результат на GitHub

Настроен стандартный runner ubuntu-latest. Для подтверждения реального образа нужен журнал задания. Владелец выбрал только настройку Actions. [Workflow](https://github.com/kziborova/Programmnaya_Inzheneriya/actions).
