# Агент сборки на GitHub

В Azure DevOps используется agent/pool; в GitHub Actions — runner. Пример в текущем проекте: `runs-on: ubuntu-latest` запускает сборку на **GitHub-hosted runner** и не устанавливает агента на ноутбук.

Self-hosted runner возможно развернуть на macOS только с отдельным разрешением пользователя. Нельзя без дополнительной оценки безопасности подключать личный Mac в качестве self-hosted runner к публичному проекту, особенно к PR из fork. В отчет нужно включить конкретные URL Actions run, выбранную ОС и доступный тип runner.
