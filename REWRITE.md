# REWRITE CHECKPOINT

**Дата:** 2026-05-01  
**Ветка:** main  
**Коммит-маркер:** точка отката перед полным рерайтом проекта

## Что было до этой точки

Прототип на React + TypeScript + Vite (SPA).

## Что будет после

FULL REWRITE: checkpoint before migration to PHP+Twig+Alpine+SCSS stack
- **Backend:** PHP (SSR) + Twig (шаблонизатор)
- **Frontend:** Vanilla JS + Alpine.js + SCSS
- **Сборка:** Vite (только SCSS→CSS и JS-бандлы)
- **Данные:** JSON-файлы (в дальнейшем MySQL/MariaDB)
- **Хостинг:** собственный сервер Apache/Nginx + PHP

## Откат

Чтобы вернуться к состоянию до рерайта:
```
git checkout <hash этого коммита>
```
