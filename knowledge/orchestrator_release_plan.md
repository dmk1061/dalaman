# Мастер-План Выкатки Dalaman.info и Переезда на VPS Contabo (Orchestrator-Ready Execution Plan)

> [!IMPORTANT]
> **Статус:** Утверждено пользователем. **Этап 1 запущен в исполнение.**
> Все вводные по VPS Contabo (`ssh coworker`), сохранению существующих защищенных сайтов, регистратору Spaceship, честному счетчику посещаемости и отложенной монетизации зафиксированы.

---

## 📌 Инфраструктурные Вводные и Табу «Не навреди»

1. **VPS Contabo (`ssh coworker`):**
   - Профиль из `C:\Users\Dimok\.ssh\config`: `Host coworker`, `HostName 207.180.202.233`, `User dimok`, `IdentityFile C:/ssh/key`, ОС Ubuntu.
   - **[CRITICAL] Табу на изменение существующих сайтов:** На VPS крутятся другие проекты (`TradeAssist`, презентации под паролем `auth_basic` в Nginx). Запрещено менять или удалять чужие виртуальные хосты, пароли или директории.
   - Приложение `dalaman.info` запускается строго в изолированной папке `/var/www/dalaman.info` на свободном локальном порту **`127.0.0.1:3040`**.
2. **Домен и Git:**
   - Домен `dalaman.info` зарегистрирован на **Spaceship**.
   - GitHub-репозиторий: `https://github.com/dmk1061/dalaman.git` (ветка `main`).
3. **Честный счетчик посещаемости:**
   - Удаление `Math.random()` в `VisitorAnalyticsWidget.tsx`.
   - Настоящий серверный трекинг через `src/app/api/analytics/route.ts` + `data/analytics.json`.
4. **Монетизация:**
   - В текущем релизе партнерские интеграции не активируются, но конфигурационный фундамент заложен в `src/lib/site-config.ts`.

---

## 🛠️ Фазы Исполнения Этапа 1

- **Шаг 0–1 (Core):** `src/lib/seo.ts`, `src/lib/site-config.ts`.
- **Шаг 2 (Security & Clean):** Фикс LFI в `src/app/api/images/[...path]/route.ts`, настройка `next.config.mjs` (`output: 'standalone'`, Security Headers), удаление `src/[locale]/`, `PlaceholderPage.tsx`, `api/`, временных дампов в корне, обновление `.gitignore`.
- **Шаг 3 (SEO & i18n):** `src/app/not-found.tsx`, синхронизация `<html lang>`, замена Soft-404 на `notFound()`, `generateMetadata` с `canonical` и `hreflang` на все страницы, 4-язычная локализация `blogs/page.tsx` и `city-guide/page.tsx`, обновление `sitemap.ts` и `robots.ts`.
- **Шаг 4 (Real Analytics):** `src/app/api/analytics/route.ts` + `VisitorAnalyticsWidget.tsx`.
- **Шаг 5 (Contabo & CI/CD):** `Dockerfile`, `.dockerignore`, `docker-compose.prod.yml`, `deploy/nginx/dalaman.info.conf`, `.github/workflows/deploy-contabo.yml`, `deploy/README_CONTABO.md`.
- **Шаг 6 (Verification):** `npm run lint`, `npm run build`, `git status` и отчет готовности к коммиту.
