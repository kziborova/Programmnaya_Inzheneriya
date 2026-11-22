# Parts Unlimited Academy — учебный проект на GitHub

Демонстрационный проект для лабораторных работ по программной инженерии: GitHub Issues, Projects (Scrum/Kanban/Roadmap), GitHub Actions (CI/CD), GitHub Releases и (опционально) GitHub Pages.

Сайт содержит каталог учебных материалов, историю просмотра (браузерный localStorage) и локальные заявки на новые материалы (без сервера и без сбора персональных данных).

## Локальный запуск

```bash
python3 -m unittest discover -s tests -v
python3 scripts/build_site.py
python3 -m http.server 8000 --directory dist
```

Откройте http://localhost:8000 .

Публикация проекта и настройка Projects выполняется Codex после входа пользователя в GitHub. Не добавляйте исходные PDF преподавателя в публичный репозиторий.
