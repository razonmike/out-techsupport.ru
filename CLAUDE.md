# CLAUDE.md — TechSupport Website Project

## Контекст проекта

TechSupport — IT-аутсорсинговая компания из Казани.
Основное позиционирование: **внешний IT-отдел для бизнеса.**
Главная цель сайта: получать заявки на **абонентское IT-обслуживание**.

Расширенный контекст продукта и аудитории — в [AGENTS.md](AGENTS.md), [docs/PROJECT.md](docs/PROJECT.md), [docs/SITE_PLAN.md](docs/SITE_PLAN.md).

---

## Технический стек (hard constraints)

- **Astro 5** как основной фреймворк (SSG) — [src/pages/](src/pages/), [src/components/](src/components/), [src/layouts/](src/layouts/)
- **React 19** и `@astrojs/react` подключены, но **на главной не используются** — все секции написаны на чистом `.astro`
- **Tailwind 4** через `@tailwindcss/vite` подключён, но глобальные стили живут в [src/styles/global.css](src/styles/global.css) (классы `.hero`, `.card`, `.section-with-bg`, `.reveal`)
- **phosphor-astro** — иконки в Hero и других секциях
- Шрифты: **Geist** (body/headings) и **Space Mono** (mono) через Google Fonts, подключены в [src/layouts/Layout.astro](src/layouts/Layout.astro)
- Тема: тёмная, радиальные градиенты, карточки с прозрачностью
- Сборка: `npm run build` → `dist/`, раздаётся через nginx

**Не делать:**
- Не переписывать проект с нуля
- Не вводить новые фреймворки (Vue/Svelte/Next)
- Не удалять `@astrojs/react`/`tailwind`, пока явно не согласовано
- Не смешивать `.astro` и React-компоненты в рамках одной секции без причины

---

## Деплой

- **Репозиторий**: `git@github.com:razonmike/out-techsupport.ru.git`, активная ветка `codex/refactor-homepage`
- **Хостинг**: LXC 110 `web-site` (172.16.30.99) на Proxmox Hilbert (185.184.79.158)
- **Reverse proxy**: LXC 104 `proxy` (172.16.30.246)
- **Контейнеризация**: [Dockerfile](Dockerfile) (Node 20 Alpine build → nginx Alpine serve), конфиг в [nginx.conf](nginx.conf)
- **Домен**: out-techsupport.ru
- **CI/CD**: пока ручной (pull + rebuild на LXC 110, процесс уточняется)

---

## Статус проекта (актуализировано 2026-06-12)

### Выполнено

- Миграция с vanilla HTML/CSS/JS на Astro 5 (коммит `58a7ddf`), секции разбиты на компоненты: [Hero](src/components/Hero.astro), [PainPoints](src/components/PainPoints.astro), [Services](src/components/Services.astro), [Trust](src/components/Trust.astro), [HowWeWork](src/components/HowWeWork.astro), [Cases](src/components/Cases.astro), [Prices](src/components/Prices.astro), [Calculator](src/components/Calculator.astro), [Contacts](src/components/Contacts.astro)
- Все регрессии после миграции закрыты: тексты выровнены по `files/SKILL.md` (коммит `5c36b3c`), блок болей восстановлен, клише убраны
- **Форма работает**: POST `/api/contact` → Telegram, honeypot, чекбокс согласия на ПДн (коммит `2167894`). Сам обработчик `/api/contact` живёт **вне репозитория** (на LXC 110), в [nginx.conf](nginx.conf) репо его проксирование не отражено
- Бургер-меню для `<980px` в [Layout.astro](src/layouts/Layout.astro)
- 9 страниц услуг (`/services/*`) с FAQ, breadcrumbs и перелинковкой; schema: Service (frontmatter страниц), FAQPage (внутри [FAQ.astro](src/components/service/FAQ.astro)), BreadcrumbList (внутри [Breadcrumbs.astro](src/components/service/Breadcrumbs.astro)). 2026-06-12 добавлены `devops`, `software-development`, `ai` (без цен — «оценка после бесплатной консультации»), сетка услуг на главной 3×3
- Тарифы упрощены, стартовые цены 5/15/30 тыс. (коммит `9b8fa7b`)
- SEO применён и задеплоен (проверено на проде 2026-06-12): title с гео, уникальные description, OG/Twitter, canonical, LocalBusiness-schema, `public/robots.txt`, `public/sitemap.xml`, верификация Яндекс+Google
- Страница `/privacy`, animated counters, тёмная тема с тенями карточек
- **Яндекс.Метрика** (счётчик `109793288`, 2026-06-12): код в [Layout.astro](src/layouts/Layout.astro) (Вебвизор включён), цели-«JavaScript-события»: `click_phone`, `click_email`, `click_telegram`, `form_submit`, `download_client`. Клики ловит делегированный обработчик в Layout, `form_submit` — в [Contacts.astro](src/components/Contacts.astro)

### Открытый беклог

- Контроль (с ~20 июня): вернулись ли `/services/virtualization/`, `/services/video-surveillance/` в индекс Яндекса (статус был «Малоценная или маловостребованная»), применился ли регион «Казань», сменился ли статус sitemap в GSC с «Couldn't fetch», пошли ли данные в Метрику
- Из `design_audit.md` (высокий приоритет): сверка цен тарифы↔калькулятор, proof-элементы/логотипы клиентов под hero, кейсы с цифрами и именами, sticky CTA на мобильной, прогон PageSpeed/Lighthouse
- Карточки в Яндекс.Справочнике и 2ГИС
- Решить судьбу untracked-файлов: `seo_audit.md`, `design_audit.md`, `claude-design.md`, `files/`, `assets/images/tg-group-avatar.png` (лежит вне `public/` — в сборку не попадает)
- Блог (стратегически, по `seo_audit.md` часть 9)

---

## Правила работы с этим проектом

**Всегда:**
- Писать на русском, деловым стилем
- Работать поэтапно, один блок за раз
- Перед крупными изменениями — использовать Plan mode, сверяться с [AGENTS.md](AGENTS.md) и [docs/SITE_PLAN.md](docs/SITE_PLAN.md)
- Держать diff чистым
- Проверять, что CTA, форма и SEO-разметка на месте
- Сохранять имена классов и `id`, используемые в inline-скриптах (`reveal`, `calc-*`, `#seats`, `#phys-servers` и т.д.)
- Переиспользовать существующие классы (`.card`, `.cards`, `.cards-2`, `.cards-3`, `.section-with-bg`, `.reveal`, `.btn*`)

**Запрещённые формулировки:**
- «под ключ»
- «индивидуальный подход»
- «команда профессионалов»
- «динамично развивающаяся компания»
- «мы не просто чиним компьютеры»
- любые неподтверждённые обещания с цифрами («99.9%», «200+ клиентов»), если они не согласованы с владельцем бизнеса.
  Согласовано владельцем (июнь 2026): **«до 50%»**, **«−20% первый месяц»**, **«время реакции от 15 минут»**, **«25+ / 1000+ / 10+»** — входят в утверждённые тексты `.claude/skills/copywritting/SKILL.md` (источник истины по копирайтингу)

**Предпочтительные формулировки:**
- «внешний IT-отдел»
- «абонентское IT-обслуживание»
- «удалённо и с выездом»
- «поддержка пользователей, сети, 1С, VPN, серверов и резервного копирования»

**Не делать без явного запроса:**
- Полный rewrite
- Замену шрифтов и базовой цветовой системы
- Добавление новых npm-зависимостей
- Переключение на Tailwind-утилитарный CSS (сейчас — семантические классы)

---

## Структура файлов проекта

```
/
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── Dockerfile
├── nginx.conf
├── public/
│   └── assets/images/         — логотипы, favicon
├── src/
│   ├── pages/index.astro      — компоновка главной
│   ├── layouts/Layout.astro   — html-шелл, header, footer, reveal-скрипт
│   ├── components/            — секции главной (Hero, Services, …)
│   └── styles/global.css      — все стили
├── docs/
│   ├── PROJECT.md
│   ├── SITE_PLAN.md
│   ├── STATUS.md
│   └── WORKFLOW.md
├── AGENTS.md
├── CLAUDE.md                  — этот файл
└── claude-design.md           — рекомендации по использованию Claude Design (untracked)
```
