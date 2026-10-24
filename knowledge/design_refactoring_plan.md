# План рефакторинга дизайна, композиции и UX портала Dalaman.info

Этот документ представляет собой детальное техническое задание (Implementation Plan) по приведению визуальной части, сетки, навигации и юзабилити портала **«Датча — Каш» (`dalaman.info`)** к уровню готового продакшен-продукта.

> **Главный принцип редизайна:** Мы полностью сохраняем полюбившуюся светлую, воздушную курортную стилистику и бирюзово-океаническую цветовую палитру (`slate-50`, `white`, `cyan-500/600/700`, `sky`), но устраняем визуальный шум, композиционные перекосы, неработающие элементы интерфейса и критические проблемы адаптивности.

---

## 🔍 Диагностика: ключевые проблемы текущего дизайна (UX/UI Audit)

1. **Сломанный рендеринг русского и турецкого шрифта:** В файле `src/app/layout.tsx` шрифт `Inter` подключен только с `subsets: ["latin"]`. Из-за этого вся кириллица и турецкая диакритика отображаются системным шрифтом по умолчанию с грубым синтетическим наклоном.
2. **Визуальный крик (`UPPERCASE ITALIC FONT-BLACK`):** Почти каждый заголовок `h1–h4`, бейдж, карточка и даже пункты меню в `LeftSidebar.tsx` набраны жирным капсом с курсивом. Когда всё выделено курсивным капсом — пропадает визуальная иерархия, текст тяжело сканировать глазами.
3. **Разъезжающаяся сетка (`max-w-[2180px]` и `2400px`):** В `tailwind.config.ts` и компонентах жестко задана ширина `2180px–2400px`. На больших мониторах шапка и колонки расползаются по краям экрана, а в центральной колонке главной страницы пытаются уместиться 6 карточек в ряд и 5 слайдов карусели одновременно, превращаясь в узкие полоски.
4. **Отсутствие мобильной навигации и пропадающие сайдбары:**
   - В `Header.tsx` нет мобильного меню (гамбургера). На смартфоне 8 городов и 3 раздела меню ломают экран по горизонтали.
   - На экранах `< 1024px` левый и правый сайдбары на главной (`hidden lg:block`, `hidden xl:block`) полностью исчезают — мобильный пользователь теряет доступ к разделам «Транспорт», «Умные сервисы» и «Планируем день».
5. **Тупиковые и неработающие элементы (Dead UI):**
   - Поле поиска в `Header.tsx` — просто декоративный `<input>` без логики.
   - Главные ссылки разделов меню («Подготовка», «Открытия», «Впечатления») ведут на `/${locale}/articles`, но файла `src/app/[locale]/articles/page.tsx` не существует (ошибка **404**).
   - Карточки «Кураторские подборки» (`CollectionCard`) в `MainContent.tsx` не обернуты в `<Link>` — по ним нельзя кликнуть.
   - Карта на главной странице в `MainContent.tsx` — статичная картинка без пинов, хотя в проекте уже есть готовый `InteractiveMap.tsx`.
   - В `Header.tsx` и `Footer.tsx` висят заглушки телефонов `+90 000 000 00 00`, а в `CityArticle.tsx` — нерабочие серые кружки `f` и `t` и сломанная локализация ссылок.
   - В `VisitorAnalyticsWidget.tsx` прямо для пользователей выводится технический текст разработчика: *«Заглушка активна для проверки дизайна»*.

---

## 📦 Батч 1: Фундамент дизайн-системы, типографика и сетка

**Цель:** Починить шрифты для кириллицы/турецкого языка, задать правильную максимальную ширину портала и убрать визуальный шум (`italic uppercase`) из глобальных стилей.

### Задача 1.1: Подключение всех языковых подмножеств шрифта в `src/app/layout.tsx`
- **Файл:** `c:/Users/Dimok/IdeaProjects/dalaman/src/app/layout.tsx`
- **Что сделать:**
  1. Изменить конфигурацию шрифта `Inter`:
     ```tsx
     const inter = Inter({
       subsets: ["latin", "cyrillic", "latin-ext"],
       display: "swap",
       variable: "--font-inter",
     });
     ```
  2. На тег `<body>` добавить классы `min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-cyan-500 selection:text-white`.

### Задача 1.2: Нормализация контейнера и брейкпоинтов в `tailwind.config.ts`
- **Файл:** `c:/Users/Dimok/IdeaProjects/dalaman/tailwind.config.ts`
- **Что сделать:**
  1. В блоке `theme.extend.container.screens` заменить гигантские `xl: '2200px'` и `'2xl': '2400px'` на сбалансированные значения:
     ```ts
     screens: {
       sm: '640px',
       md: '768px',
       lg: '1024px',
       xl: '1280px',
       '2xl': '1440px',
     },
     ```
  2. Настроить `padding` контейнера: `DEFAULT: '1rem', sm: '1.5rem', lg: '2rem'`.

### Задача 1.3: Рефакторинг глобальной типографики и карточек в `src/app/globals.css`
- **Файл:** `c:/Users/Dimok/IdeaProjects/dalaman/src/app/globals.css`
- **Что сделать:**
  1. В `.markdown-body h1` и `.markdown-body h2` убрать классы `uppercase` и `italic`:
     - `.markdown-body h1`: `@apply text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-8 mb-4 border-b pb-3 border-slate-200/80;`
     - `.markdown-body h2`: `@apply text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight mt-8 mb-4;`
     - `.markdown-body h3`: `@apply text-xl font-bold text-slate-800 mt-6 mb-3;`
  2. Добавить утилитарные классы дизайн-системы в `@layer components`:
     - `.portal-container`: `@apply w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8;`
     - `.portal-card`: `@apply bg-white rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition-all duration-300;`
     - `.eyebrow-badge`: `@apply inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-cyan-600;`
     - `.no-scrollbar`: скрытие скроллбара для горизонтальной ленты городов.

---

## 📦 Батч 2: Редизайн Шапки, Живого Поиска и Мобильной Навигации

**Цель:** Сделать шапку сайта удобной на любых экранах, внедрить работающий поиск по порталу, исправить ссылки на `404` и подключить мобильное меню.

### Задача 2.1: Создание компонента живого поиска `GlobalSearch.tsx`
- **Новый файл:** `c:/Users/Dimok/IdeaProjects/dalaman/src/app/components/GlobalSearch.tsx`
- **Что сделать:**
  1. Создать клиентский компонент (`"use client"`), принимающий `locale: string` и `placeholder: string`.
  2. Сформировать встроенный индекс ключевых объектов портала (8 курортов, популярные пляжи, ключевые статьи, все сервисы).
  3. При вводе текста или фокусе показывать выпадающее окно (`rounded-2xl bg-white shadow-2xl border border-slate-200/80 z-50`) с группировкой по категориям и переходом по клику.
  4. Поддержать закрытие по клавише `Escape` и клику вне компонента.

### Задача 2.2: Комплексный рефакторинг `Header.tsx` и подключение `SideMenu.tsx`
- **Файлы:**
  - `c:/Users/Dimok/IdeaProjects/dalaman/src/app/components/Header.tsx`
  - `c:/Users/Dimok/IdeaProjects/dalaman/src/app/components/SideMenu.tsx`
- **Что сделать:**
  1. Заменить все `max-w-[2180px]` на `.portal-container`.
  2. В верхнем баре (`bg-cyan-700 text-white`) убрать фейковый телефон `+90 000 000 00 00`, разместить слева ссылки на «Контакты» и «Справка / Аптеки 24/7», справа — «Трансфер из DLM», «Экскурсии», «Услуги» и `LanguageSwitcher`.
  3. На среднем уровне разместить логотип, 4 главных раздела меню («Подготовка», «Открытия», «Впечатления», «Маршруты») с защитой от `Hover-Gap`, компонент `GlobalSearch` и кнопку мобильного меню (`lg:hidden`) для открытия `SideMenu`.
  4. На нижнем уровне оформить 8 городов (`Датча` -> `Каш`) в виде горизонтальной полосы с `overflow-x-auto no-scrollbar` и кнопками-пилюлями.
  5. Обновить `SideMenu.tsx`: добавить мобильный поиск, сетку 8 городов (`grid-cols-2`), разделы статей и услуг.

### Задача 2.3: Подключение адаптивного `FloatingMenu.tsx` в лейаут
- **Файлы:**
  - `c:/Users/Dimok/IdeaProjects/dalaman/src/app/components/FloatingMenu.tsx`
  - `c:/Users/Dimok/IdeaProjects/dalaman/src/app/[locale]/layout.tsx`
- **Что сделать:**
  1. Подключить `FloatingMenu` в `src/app/[locale]/layout.tsx`.
  2. Сделать его плавающим доком справа внизу на десктопе (`md:block`) и фиксированным нижним таб-баром (`fixed bottom-0 inset-x-0 grid grid-cols-4 md:hidden`) на мобильных устройствах.

---

## 📦 Батч 3: Композиция Главной страницы, Первого экрана и Сайдбаров

**Цель:** Выстроить гармоничную модульную сетку главной страницы, починить зажатые карточки в центральной колонке, сделать кликабельными коллекции и карту, а также открыть доступ к блокам сайдбаров на мобильных устройствах.

### Задача 3.1: Полировка первого экрана (`Hero.tsx`)
- **Файл:** `c:/Users/Dimok/IdeaProjects/dalaman/src/app/components/Hero.tsx`
- **Что сделать:**
  1. Уменьшить отступ до `mb-8 lg:mb-10` и высоту до `min-h-[440px] md:h-[520px]`.
  2. Улучшить контраст оверлея (`bg-gradient-to-b from-slate-950/60 via-slate-900/35 to-slate-950/75`).
  3. Убрать курсив из `h1`, сделать для акцентного текста светлый градиент `from-cyan-300 to-sky-200`.

### Задача 3.2: Адаптивная 3-колоночная сетка в `src/app/[locale]/page.tsx`
- **Файл:** `c:/Users/Dimok/IdeaProjects/dalaman/src/app/[locale]/page.tsx`
- **Что сделать:**
  1. Использовать `.portal-container` с фиксированными боковыми колонками на `xl` (`w-[260px]` слева, `flex-1 min-w-0` по центру, `w-[300px]` справа, `gap-8`).
  2. На экранах `< lg` выводить блоки `LeftSidebar` и `Sidebar` адаптивными секциями под основным контентом, чтобы они не пропадали на смартфонах.

### Задача 3.3: Рефакторинг карточек и секций в `MainContent.tsx`
- **Файл:** `c:/Users/Dimok/IdeaProjects/dalaman/src/app/components/MainContent.tsx`
- **Что сделать:**
  1. `QuickLinks`: сетка `grid-cols-2 sm:grid-cols-3 gap-4`, карточки `rounded-2xl p-5 border border-slate-200/70`.
  2. `Kaleidoscope`: уменьшить `slidesToShow` с `5` до `3` на десктопе, инициализировать стейт начальным списком без пустого пульсирующего плейсхолдера.
  3. `CollectionCard`: обернуть все 4 карточки в `<Link>` с рабочими маршрутами (`/routes/weekends`, `/collections`, `/articles/gastronomy`, `/beaches`).
  4. `Map Section`: заменить статичную картинку `/map.jpg` на интерактивный компонент `<InteractiveMap locale={locale} />`.

### Задача 3.4: Приведение `LeftSidebar.tsx` и `Sidebar.tsx` к чистому стилю
- **Файлы:**
  - `c:/Users/Dimok/IdeaProjects/dalaman/src/app/components/LeftSidebar.tsx`
  - `c:/Users/Dimok/IdeaProjects/dalaman/src/app/components/Sidebar.tsx`
- **Что сделать:**
  1. Заменить `rounded-[2rem] border-slate-50` на `rounded-2xl border border-slate-200/70`.
  2. Убрать `italic` из заголовков и ссылок, удалить дублирующийся `VisitorAnalyticsWidget` из левого сайдбара.

---

## 📦 Батч 4: Создание Хаба Статей (`/articles`) и Унификация Внутренних Страниц

**Цель:** Устранить ошибку 404 при клике на разделы меню, починить локализацию и сломанные кнопки в `CityArticle.tsx`, привести хлебные крошки и карточки городов к единому стандарту.

### Задача 4.1: Создание страницы каталога статей `src/app/[locale]/articles/page.tsx`
- **Новый файл:** `c:/Users/Dimok/IdeaProjects/dalaman/src/app/[locale]/articles/page.tsx`
- **Что сделать:**
  1. Создать страницу-рубрикатор всех статей портала с группировкой по категориям и поиском на 4 языках (`ru`, `en`, `de`, `tr`).

### Задача 4.2: Исправление локализации и кнопок в `CityArticle.tsx` и `[subpage]/page.tsx`
- **Файлы:**
  - `c:/Users/Dimok/IdeaProjects/dalaman/src/app/components/CityArticle.tsx`
  - `c:/Users/Dimok/IdeaProjects/dalaman/src/app/[locale]/[location]/[subpage]/page.tsx`
- **Что сделать:**
  1. Передать `locale` в `CityArticle`, локализовать все ссылки и тексты на 4 языка.
  2. Заменить серые кружки `f` и `t` на рабочий компонент `ArticleActions`.
  3. Заменить кнопку «Связаться с нами» на ссылку `/[locale]/contacts`.

### Задача 4.3: Композиционная чистка `CityHub.tsx`, страниц Пляжей, Достопримечательностей и Статей
- **Файлы:**
  - `c:/Users/Dimok/IdeaProjects/dalaman/src/app/components/CityHub.tsx`
  - `c:/Users/Dimok/IdeaProjects/dalaman/src/app/[locale]/[location]/beach/[beachName]/page.tsx`
  - `c:/Users/Dimok/IdeaProjects/dalaman/src/app/[locale]/[location]/sight/[sightName]/page.tsx`
  - `c:/Users/Dimok/IdeaProjects/dalaman/src/app/[locale]/articles/[slug]/page.tsx`
- **Что сделать:**
  1. В `CityHub.tsx` убрать декоративные наклоны `rotate-2` и `-rotate-12`, заменить `max-w-[2180px]` на `.portal-container`.
  2. Унифицировать хлебные крошки, скругления (`rounded-2xl`) и отступы на всех шаблонах.

---

## 📦 Батч 5: Рефакторинг Футера, Виджета Аналитики и Чистка Технического Мусора

**Цель:** Привести подвал сайта к солидному виду без фейковых телефонов и дев-заглушек, удалить мертвые дубли папок и провести финальную валидацию сборки.

### Задача 5.1: Обновление `Footer.tsx` и `VisitorAnalyticsWidget.tsx`
- **Файлы:**
  - `c:/Users/Dimok/IdeaProjects/dalaman/src/app/components/Footer.tsx`
  - `c:/Users/Dimok/IdeaProjects/dalaman/src/app/components/VisitorAnalyticsWidget.tsx`
  - `c:/Users/Dimok/IdeaProjects/dalaman/src/dictionaries/ru.json` (+ `en.json`, `de.json`, `tr.json`)
- **Что сделать:**
  1. В `Footer.tsx` заменить `000-000-00-00` и личную почту на `info@dalaman.info`, локацию `Dalaman / Muğla, Türkiye` и ссылку на `/contacts`.
  2. В `VisitorAnalyticsWidget.tsx` удалить отладочную строку разработчика (`⚡ Готово к подключению: GA4 ID... Заглушка активна для проверки дизайна`).

### Задача 5.2: Удаление мертвых дублей и финальная проверка сборки
- **Удаляемые файлы/папки:**
  - `c:/Users/Dimok/IdeaProjects/dalaman/src/[locale]`
  - `c:/Users/Dimok/IdeaProjects/dalaman/src/app/components/StickyHeader.tsx`
- **Проверка:** выполнить `npm run build` с нулем ошибок.
