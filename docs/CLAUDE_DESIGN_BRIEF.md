# CLAUDE_DESIGN_BRIEF.md — адаптированный brief под стек TechSupport

Документ для **Claude Design** (`claude.ai/design`) — используется один раз при настройке
дизайн-системы организации TechSupport, плюс как базовый контекст для отдельных задач.

Адаптирован из общих рекомендаций ([claude-design.md](../claude-design.md)) под фактический
стек проекта (Astro 5 + React 19 + Tailwind 4), чтобы handoff в Claude Code не ломал
архитектуру.

---

## 1. Brief для поля "Any other notes" при создании design system

```
TechSupport — B2B IT-аутсорсинг для малого и среднего бизнеса в Казани.
Позиционирование: «внешний IT-отдел для вашего бизнеса».
Главная цель сайта — заявки на абонентское IT-обслуживание.

Технический стек (жёстко):
- Astro 5 (SSG) — секции как .astro-компоненты в src/components/
- React 19 подключён через @astrojs/react, но на главной не используется —
  новый код тоже писать на .astro, если нет причин для клиента
- Tailwind 4 подключён через @tailwindcss/vite, но основные стили — в
  src/styles/global.css через семантические классы:
  .section, .section-with-bg, .container, .card, .cards, .cards-2, .cards-3,
  .reveal (для IntersectionObserver-анимаций),
  .btn, .btn-primary, .btn-secondary, .btn-small
- Иконки — phosphor-astro (import 'phosphor-astro/IconName.astro'),
  НЕ lucide, НЕ heroicons, НЕ emoji
- Шрифты: Geist (body, 300–800), Space Mono (моно-акценты)
- Тема: тёмная, радиальные градиенты, карточки с прозрачностью и border
  rgba(255,255,255,0.06), радиус 16–20px

Визуал:
- Основной фон — глубокий тёмный
- Акцент — холодный синий
- Карточки — полупрозрачные с glass-эффектом
- Анимации — IntersectionObserver, появление через класс .reveal → .is-visible

Тон: деловой, уверенный, без маркетинговой воды.
Запрещено: эмодзи, illustrated characters, stock-иллюстрации,
фиолетово-розовые градиенты, клише («профессиональная команда»,
«индивидуальный подход», «под ключ»), неподтверждённые обещания с
цифрами («до 50%», «99.9%»).

Референсы по качеству: Linear, Stripe, Vercel.
```

## 2. Как подключать кодбейс

**GitHub путь (предпочтительный):**
- Link code on GitHub → `razonmike/out-techsupport.ru`
- Ветка: `codex/refactor-homepage`
- Claude Design прочитает: `src/components/*.astro`, `src/styles/global.css`,
  `src/layouts/Layout.astro`, `tailwind.config` (если есть)

**Локальный путь:**
- Drag локальной папки `/mnt/yadisk/myprojects/out-techsupport.ru`
- Исключить: `.git/`, `node_modules/`, `dist/`

## 3. Готовые промпты под задачи TechSupport

### Блок болей «С какими задачами к нам обращаются» (новая секция)

```
Design a "Pain points" section for the TechSupport Astro landing.
Position: immediately after Hero, before Services.
Heading H2: "С какими задачами к нам обращаются"

Grid: 4 columns desktop (>1280px), 2 columns tablet (768–1279px),
1 column mobile (<768px).

Cards (8 штук) — Russian copy, each card = a client pain, not a service name:
1. Нестабильный интернет и Wi-Fi / Сотрудники теряют время на обрывах
2. Проблемы с 1С / Бухгалтерия и отчётность встают
3. Сбои рабочих мест и принтеров / Линия встаёт, жалобы растут
4. Проблемы с VPN / Удалёнщики не могут подключиться
5. Нет порядка в локальной сети / Не знаем, что и куда подключено
6. Нет резервного копирования / Риск потерять критичные данные
7. Нужно видеонаблюдение / Нет контроля за объектом
8. Нужен постоянный подрядчик / IT-задачи закрываются хаотично

Each card:
- уже существующий класс .card (glass-эффект, border, radius 20px)
- верхняя иконка phosphor-astro (outline, 40px, в --accent)
- заголовок: Geist 600, 18–20px
- подзаголовок: Geist 400, 14–15px, line-height 1.6
- hover: translateY -4px + accent border glow

Use existing global classes from src/styles/global.css:
.section, .section-with-bg, .container, .cards.
Добавь новый класс .cards-4 по аналогии с .cards-3.

<frontend_aesthetics>
NEVER use: emoji, stock illustrations, purple-to-pink gradients.
DO use: phosphor-astro icons, dark theme, blue --accent, glass cards.
</frontend_aesthetics>

Show me 2 variants.
```

### Hero-исправление (вернуть Stage 1 copy)

```
Revise the TechSupport Hero block to match the agreed Stage-1 positioning.
The current implementation reintroduced unsanctioned promises — remove them.

H1 (keep 2-line structure):
Line 1 (Geist 600, main): "Внешний IT-отдел"
Line 2 (Geist 500, accent): "для вашего бизнеса"

Lead (Geist 400, 18–20px, max 2 lines):
"Берём на себя поддержку пользователей, сети, Wi-Fi, 1С, VPN,
серверов и резервного копирования, чтобы IT не тормозило работу компании."

CTAs:
- Primary: "Обсудить задачи" → #contacts
- Secondary: "Посмотреть тарифы" → #prices

Right column "Коротко о компании" — заменить карточки на factual proof
(БЕЗ спорных цифр до согласования с владельцем):
- С 2014 года / На рынке IT-аутсорсинга
- Удалённо и с выездом / Гибкий формат работы
- Казань и регион / Локальная команда
- Абонентское обслуживание / Основной формат работы

УДАЛИТЬ промо-карточку "−20% первый месяц" (не утверждена).
УДАЛИТЬ формулировки: "сокращаем расходы до 50%", "время реакции от 15 минут".

Preserve: class names (.hero, .hero-grid, .hero-left, .hero-right,
.hero-stats, .hero-stat, .hero-title, .hero-lead, .btn, .btn-primary,
.btn-secondary), reveal animation classes, phosphor-astro icons where used.
```

### Сэйлз-дек для встреч с клиентами (отдельный проект Slide deck)

Используй промпт из `claude-design.md` раздел 4 — он не зависит от стека сайта.
Экспорт: **PDF** (для email) + **PPTX** (для клиента в PowerPoint).

## 4. Handoff в Claude Code под Astro-стек

После согласованного прототипа — `Export → Handoff to Claude Code` или
`Export as standalone HTML`. В Claude Code в VS Code:

```
Apply the design from the handoff bundle [URL] / from the attached
@docs/design-export/<section>/ to our Astro codebase.

Rules:
1. Do NOT scaffold a new project, do NOT convert to React, do NOT add
   Tailwind utility classes — preserve semantic classes in
   src/styles/global.css.
2. Integrate new sections as new .astro files in src/components/ and
   import them in src/pages/index.astro.
3. Reuse existing classes (.card, .section-with-bg, .reveal, .btn*).
   Add new classes only if the design genuinely requires it.
4. Use phosphor-astro for icons (import 'phosphor-astro/IconName.astro').
5. Keep data-* attributes and id-s used by inline scripts in
   src/layouts/Layout.astro and src/components/Calculator.astro intact.
6. Work in Plan mode: show the plan before editing files, wait for approval.

Follow rules in @CLAUDE.md and @AGENTS.md.
After applying, update @docs/STATUS.md with what changed.
```

## 5. Что НЕ делать через Claude Design

- Не пытаться автоматически применять handoff к компонентам `Calculator.astro` и
  `Prices.astro` — там inline TypeScript и SVG-иконки, переписывать руками
- Не генерировать Tailwind utility-классы массово — ломается единообразие CSS
- Не генерировать React-компоненты для секций, которые уже есть на `.astro`
- Не делиться прототипами через Share-URL с клиентами — экспорт PDF/PPTX
- Не пользоваться Undo в Claude Design — просить "Save what we have and try
  a different approach" (см. claude-design.md, раздел 3)

## 6. Дедлайны и лимиты

- Claude Design — отдельный usage bucket от Claude Code (не ест лимиты CLI)
- Pro-подписки хватит на 25–30 минут активной работы; для регулярного
  использования — Max 5x минимум
- Data residency для РФ отсутствует — не загружать в Claude Design
  чувствительные данные клиентов (договоры, сметы, ПДн)
