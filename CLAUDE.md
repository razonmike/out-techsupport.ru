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

## Статус рефакторинга главной

### Выполнено в коде
- Миграция с vanilla HTML/CSS/JS на Astro 5 (коммит `58a7ddf`)
- Удалены unused React-компоненты и figma-источники (коммиты `a86daf1`, `cce885c`)
- Hero разбит на левую/правую колонки, карточки выравниваются по сетке (`0a5cdd5`, `fa3a3cb`)
- Секции разбиты на компоненты: [Hero](src/components/Hero.astro), [Services](src/components/Services.astro), [Trust](src/components/Trust.astro), [HowWeWork](src/components/HowWeWork.astro), [Cases](src/components/Cases.astro), [Prices](src/components/Prices.astro), [Calculator](src/components/Calculator.astro), [Contacts](src/components/Contacts.astro)

### Регрессии после миграции (нужно починить)
При переходе на Astro текст был восстановлен из более старых версий и потерял правки Stage 1/2 из [docs/STATUS.md](docs/STATUS.md):
- **Hero**: вернулись неподтверждённые обещания («сокращаем расходы до 50%», «время реакции от 15 минут»), вернулись промо «25+», «1000+», «10+», «−20%» в [src/components/Hero.astro](src/components/Hero.astro)
- **Services**: вернулись технические формулировки CCTV, Hyper-V/VMware/Proxmox, «Системное администрирование» в [src/components/Services.astro](src/components/Services.astro)
- **Trust**: вернулись запрещённые клише («Профессиональная команда», «Безопасность данных») в [src/components/Trust.astro](src/components/Trust.astro)
- **Meta description** в [src/layouts/Layout.astro:11](src/layouts/Layout.astro#L11): откат к старой технической формулировке
- **Блок болей** «С какими задачами к нам обращаются» — отсутствует в [src/pages/index.astro](src/pages/index.astro)

### Не реализовано
- Блок «Абонентское IT-обслуживание» (п.5 [docs/SITE_PLAN.md](docs/SITE_PLAN.md))
- Блок «С чего часто начинается работа» (п.6)
- Финальный CTA как отдельный блок (п.9) — сейчас сливается с Contacts
- Форма заявки — не отправляет: `type="button"` без обработчика в [src/components/Contacts.astro:23](src/components/Contacts.astro#L23)
- Мобильная навигация / бургер-меню для `<980px`
- Упрощённые тарифы на главной (сейчас перегружены «за единицу оборудования» в [src/components/Prices.astro](src/components/Prices.astro))

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
- любые неподтверждённые обещания с цифрами («до 40/50%», «99.9%», «200+ клиентов»), если они не согласованы с владельцем бизнеса

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
