# Программная_Инженерия

![Эмблема Parts Unlimited Academy](docs/assets/academy.svg)

Учебное приложение **Parts Unlimited Academy** сопровождает девять лабораторных работ.
Демонстрационный проект для лабораторных работ по программной инженерии: GitHub Issues, Projects (Scrum/Kanban/Roadmap), GitHub Actions (CI/CD), GitHub Releases и (опционально) GitHub Pages.

Сайт содержит каталог учебных материалов, историю просмотра (браузерный localStorage) и локальные заявки на новые материалы (без сервера и без сбора персональных данных).

## Локальный запуск

```bash
python3 -m unittest discover -s tests -v
python3 scripts/build_site.py
python3 -m http.server 8000 --bind 127.0.0.1 --directory dist
```

Откройте http://localhost:8000 .

[Документация](docs/Home.md) · [Отчёты лабораторных](docs/labs/)
