# QuantSpace — Algorithmic Trading Platform

Премиальная платформа алгоритмической торговли в стиле на пересечении Apple, Awwwards 2026 и Benchmarkee.

## 🎨 Дизайн-система

### Визуальный стиль

Дизайн создан на пересечении трёх направлений:

**Apple** — минимализм, воздух, идеальная типографика
- Тонкие hairline границы (0.5px)
- Много whitespace
- SF Pro-подобная типографика (Inter)
- Тонкие, почти невидимые разделители
- Премиальное ощущение пространства

**Awwwards 2026** — экспериментальная типографика, editorial layout
- Огромные заголовки (clamp(3rem, 8vw, 7rem))
- Контраст размеров (display-xl vs text-[11px])
- Асимметричные сетки (grid-cols-12)
- Монохромная палитра с одним акцентом (amber)
- Editorial-style layout с номерами секций

**Benchmarkee** — профессиональный минимализм
- Фокус на контенте
- Системный подход
- Чистые линии и сетки
- Минимум декора

### Цветовая палитра

**Тёмная тема (основная):**
- Base: `#09090b` (почти чёрный)
- Surface: `#111113`
- Text: `#fafafa` → `#737373` (нейтральные)
- Accent: `#f59e0b` (тёплый amber)
- Profit: `#34d399` (приглушённый зелёный)
- Loss: `#f87171` (приглушённый красный)

**Светлая тема:**
- Base: `#ffffff`
- Surface: `#fafafa`
- Text: `#171717` → `#737373`

### Типографика

**Display стили (заголовки):**
```css
.display-xl — font-weight: 200, letter-spacing: -0.04em, line-height: 0.95
.display-lg — font-weight: 200, letter-spacing: -0.035em, line-height: 1
.display-md — font-weight: 300, letter-spacing: -0.03em, line-height: 1.05
```

**Метрики:**
```css
.metric — font-family: 'JetBrains Mono', tabular-nums, letter-spacing: -0.02em
```

**Лейблы:**
```css
.label — font-size: 0.6875rem, font-weight: 500, letter-spacing: 0.08em, uppercase
```

### Компоненты

**Границы:**
- Hairline: `0.5px` (Apple-style)
- Border: `rgba(255, 255, 255, 0.06)` (тёмная) / `rgba(0, 0, 0, 0.06)` (светлая)
- Разделители: градиентные линии

**Карточки:**
- Без теней (минимализм)
- Тонкие границы
- Hover: изменение фона на `white/[0.02]`
- Padding: `p-8 lg:p-12`

**Кнопки:**
- Rounded-full (pill shape)
- Primary: `bg-neutral-100 text-neutral-900`
- Secondary: `border border-white/10`
- Hover: плавные transitions

**Теги:**
```css
.tag — font-size: 0.6875rem, padding: 0.25rem 0.625rem, rounded-full, border
```

### Анимации

**Система анимаций:**
- FadeIn — появление при скролле
- Stagger — последовательное появление списков
- AnimatedCounter — анимированные числа
- Spring physics — естественные движения
- Duration: 0.3-0.6s (оптимально для UX)

**Hover эффекты:**
- Scale: `1.02-1.05` (лёгкое увеличение)
- Translate: `-4px` (подъём)
- Background: `white/[0.02]` (тонкое изменение)
- Color: transition на accent

## 📱 Страницы

### Landing
- Hero: editorial layout с огромной типографикой
- Algorithms: grid с тонкими разделителями
- Results: большие метрики в editorial стиле
- How it works: numbered list с асимметрией
- Pricing: минимальные карточки
- FAQ: accordion с плавными анимациями

### Algorithms
- Список с фильтрами
- Каждая строка — grid layout
- Мини-графики equity curve
- Метрики в моноширинном шрифте

### Algorithm Detail
- Большая типографика для названия
- Equity curve с тонкими линиями
- Метрики в grid layout
- Signal logic и limitations
- Pricing блок с акцентом

### Dashboard
- Sidebar navigation
- Overview с метриками
- Signals с фильтрами
- Analytics с графиками
- Subscriptions и Settings

### Bot Shop
- Список ботов с деталями
- Статусы (available/demo/coming soon)
- Метрики и цены
- Информационный блок

### Admin
- Управление пользователями
- Алгоритмы и сигналы
- Платежи и подписки
- Системный мониторинг

## ✨ UX улучшения

### Визуальная обратная связь
- Toast уведомления с анимациями
- Loading states (skeleton)
- Hover эффекты на всех интерактивных элементах
- Focus states для accessibility

### Навигация
- Scroll progress indicator
- Smooth scroll
- Mobile menu с анимацией
- Active states для текущей страницы

### Формы
- Rounded-full inputs
- Плавные transitions при фокусе
- Password visibility toggle
- Validation feedback через toasts

### Производительность
- GPU-accelerated анимации
- Intersection Observer
- Оптимизированные transitions
- Reduced motion support

## 🎯 Ключевые принципы

1. **Минимализм** — убрать всё лишнее, оставить только необходимое
2. **Типографика** — использовать размер и вес как визуальные элементы
3. **Пространство** — много воздуха, чёткая иерархия
4. **Детали** — тонкие границы, точные отступы, премиальное ощущение
5. **Контраст** — большие размеры vs маленькие, тонкое vs жирное
6. **Монохромность** — один акцентный цвет, остальное в нейтральных тонах

## 🚀 Технологии

- React 18 + TypeScript
- Vite (быстрая сборка)
- Tailwind CSS 4
- Framer Motion (анимации)
- Recharts (графики)
- React Router (навигация)
- Lucide React (иконки)

## 📦 Установка

```bash
npm install
npm run dev
```

## 🏗 Сборка

```bash
npm run build
```

## ⚠️ Дисклеймер

Все данные являются синтетическими демо-данными. Это не реальные торговые результаты. Торговля связана с риском убытков.

## 📄 Лицензия

© 2026 QuantSpace
