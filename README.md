# QuantSpace — Algorithmic Trading Platform

Премиальная платформа алгоритмической торговли с институциональным уровнем аналитики.

## ✅ Полная структура продукта

### 📱 Все страницы восстановлены

**Публичные страницы:**
- `/` — **Landing** — главная страница с hero-секцией и ключевыми метриками
- `/algorithms` — **Algorithms** — каталог всех стратегий с фильтрами
- `/algorithms/:slug` — **AlgorithmDetail** — детальная страница алгоритма с 5 вкладками
- `/compare` — **Compare** — сравнение алгоритмов по метрикам
- `/shop` — **Shop** — маркетплейс торговых ботов

**Авторизация:**
- `/login` — **Login** — страница входа
- `/register` — **Register** — страница регистрации

**Личный кабинет:**
- `/dashboard` — **Dashboard** — личный кабинет с 5 вкладками:
  - Overview — обзор с метриками и последними сигналами
  - Signals — список торговых сигналов
  - Analytics — аналитика производительности
  - Subscriptions — управление подписками
  - Settings — настройки профиля

**Администрирование:**
- `/admin` — **Admin** — административная панель с 7 вкладками:
  - Overview — обзор системы
  - Users — управление пользователями
  - Algorithms — управление алгоритмами
  - Signals — управление сигналами
  - Payments — управление платежами
  - Bots — управление ботами
  - System — мониторинг системы

## 📊 8 групп метрик (60+ показателей)

### 1. Доходность (Return)
- `totalReturn` — общая доходность
- `cagr` — годовая доходность (CAGR)
- `netProfit` — чистая прибыль
- `avgMonthlyReturn` — средняя месячная доходность
- `profitableMonthsPct` — доля прибыльных месяцев
- `returnAfterCosts` — доходность после комиссий

### 2. Риск и просадки (Risk)
- `maxDrawdown` — максимальная просадка
- `currentDrawdown` — текущая просадка
- `avgDrawdown` — средняя просадка
- `maxDrawdownDuration` — длительность просадки
- `recoveryTime` — время восстановления
- `volatility` — волатильность
- `var95` — VaR (95%)
- `cvar95` — CVaR (95%)
- `worstDay/Week/Month` — худший день/неделя/месяц
- `maxConsecutiveLosses` — максимальная серия убытков
- `riskOfRuin` — риск разорения

### 3. Эффективность с поправкой на риск
- `sharpeRatio` — Sharpe ratio
- `sortinoRatio` — Sortino ratio
- `calmarRatio` — Calmar ratio
- `sterlingRatio` — Sterling ratio
- `marRatio` — MAR ratio

### 4. Статистика сделок
- `totalTrades` — общее число сделок
- `winRate` — процент прибыльных сделок
- `avgWin/avgLoss` — средний выигрыш/убыток
- `profitFactor` — profit factor
- `expectancy` — математическое ожидание
- `avgRMultiple` — средний R-multiple
- `avgTradeDuration` — средняя длительность сделки
- `tradesPerDay` — сделок в день
- `costPerTrade` — издержки на сделку

### 5. Устойчивость (Robustness)
- `inSampleReturn` — доходность на обучающей выборке
- `outOfSampleReturn` — доходность на тестовой выборке
- `walkForwardReturn` — walk-forward результат
- `monteCarloP50/P5` — Monte Carlo симуляции
- `parameterSensitivity` — чувствительность к параметрам
- `top10TradesContribution` — вклад топ-10 сделок
- `overfittingRisk` — риск переоптимизации

### 6. Рыночное поведение
- `trendPerformance` — производительность в тренде
- `flatPerformance` — производительность во флэте
- `highVolPerformance` — производительность при высокой волатильности
- `longWinRate/shortWinRate` — win rate для long/short
- `avgExposure` — средняя экспозиция
- `avgTimeInPosition` — среднее время в позиции

### 7. Эффективность капитала
- `recommendedCapital` — рекомендуемый капитал
- `maxPositionSize` — максимальный размер позиции
- `leverage` — плечо
- `marginRequirement` — требование к марже
- `returnOnCapital` — доходность на капитал
- `strategyCapacity` — ёмкость стратегии

### 8. Операционная надёжность
- `systemUptime` — доступность системы
- `executionErrors` — ошибки исполнения
- `signalDelay` — задержка сигнала
- `missedTrades` — пропущенные сделки
- `brokerStability` — стабильность брокера

## 🎨 Дизайн

### Шрифт
- **Geist Sans** — основной шрифт (от Vercel)
- **Geist Mono** — для метрик и технических данных

### Цветовая палитра
- **Profit:** `#10b981` (зелёный)
- **Loss:** `#ef4444` (красный)
- **Accent Purple:** `#8b5cf6`
- **Accent Blue:** `#3b82f6`
- **Accent Cyan:** `#06b6d4`

### Компоненты
- **Glass** — полупрозрачные карточки с backdrop-blur
- **Gradient Mesh** — многослойные радиальные градиенты
- **Metric** — моноширинный шрифт для чисел
- **Label** — uppercase текст с tracking
- **FadeIn** — анимация появления при скролле
- **Stagger** — последовательное появление элементов

## 📊 Форматирование чисел

Все числовые значения форматируются через утилиты в `src/utils/format.ts`:

```typescript
formatPercent(value, decimals)    // "18.7%"
formatMoney(value, decimals)      // "$23.4k", "$1.2M"
formatNumber(value, decimals)     // "142", "0.6"
formatRatio(value, decimals)      // "1.62", "2.14"
```

### Правила округления

**Проценты:**
- Доходность, win rate, drawdown: **1 знак** после запятой
- Risk of ruin: **2 знака** (малые значения)

**Деньги:**
- Автоматическое форматирование: `$23.4k`, `$1.2M`
- Expectancy: целые числа
- Cost per trade: **2 знака**

**Коэффициенты:**
- Sharpe, Sortino, Calmar: **2 знака**
- Profit factor: **2 знака**
- Leverage: целые числа с "x"

**Количества:**
- Total trades: целые числа
- Trades per day: **1 знак**
- Signal delay: целые числа с "ms"

## 🚀 Технологии

- **React 18** + TypeScript
- **Vite** (быстрая сборка)
- **Tailwind CSS 4** (utility-first)
- **Framer Motion** (анимации)
- **Recharts** (графики)
- **React Router** (навигация)
- **Lucide React** (иконки)
- **Geist Font** (типографика)

## 📦 Установка

```bash
npm install
npm run dev
```

## 🏗 Сборка

```bash
npm run build
```

## 📝 Структура проекта

```
src/
├── App.tsx                    # Главный компонент с роутингом
├── main.tsx                   # Точка входа
├── index.css                  # Глобальные стили
│
├── components/
│   ├── Layout.tsx            # Общий layout с навигацией
│   ├── Toast.tsx             # Компонент уведомлений
│   ├── FadeIn.tsx            # Анимация появления
│   └── Stagger.tsx           # Последовательная анимация
│
├── pages/
│   ├── Landing.tsx           # Главная страница
│   ├── Algorithms.tsx        # Каталог алгоритмов
│   ├── AlgorithmDetail.tsx   # Детальная страница алгоритма
│   ├── Compare.tsx           # Сравнение алгоритмов
│   ├── Login.tsx             # Страница входа
│   ├── Register.tsx          # Страница регистрации
│   ├── Dashboard.tsx         # Личный кабинет
│   ├── Shop.tsx              # Маркетплейс ботов
│   └── Admin.tsx             # Административная панель
│
├── data/
│   └── mockData.ts           # Моковые данные (алгоритмы, боты, сигналы)
│
└── utils/
    └── format.ts             # Утилиты форматирования чисел
```

## 🎯 Навигация

**Главное меню:**
- Algorithms — каталог всех стратегий
- Compare — сравнение алгоритмов
- Bot Shop — маркетплейс торговых ботов
- Dashboard — личный кабинет

**Дополнительные страницы:**
- Login / Register — авторизация
- Admin — административная панель

## ✅ Проверка форматирования

Все числовые значения проходят через утилиты форматирования:

```typescript
import { formatPercent, formatMoney, formatNumber, formatRatio } from '../utils/format';

// Примеры использования
<p>{formatPercent(algo.metrics.cagr, 1)}</p>           // "18.7%"
<p>{formatMoney(algo.metrics.netProfit, 0)}</p>        // "$23.4k"
<p>{formatNumber(algo.metrics.totalTrades, 0)}</p>     // "142"
<p>{formatRatio(algo.metrics.sharpeRatio, 2)}</p>      // "1.62"
```

## 📄 Лицензия

© 2026 QuantSpace

## 🔄 Последние изменения

### Восстановление всех страниц

✅ **Все страницы на месте:**
- Landing, Algorithms, AlgorithmDetail, Compare
- Login, Register
- Dashboard (5 вкладок)
- Shop (маркетплейс ботов)
- Admin (7 вкладок)

✅ **Все компоненты созданы:**
- Layout с навигацией
- Toast для уведомлений
- FadeIn и Stagger для анимаций

✅ **Все данные экспортированы:**
- algorithms (2 алгоритма с полными метриками)
- bots (2 бота)
- signals (2 сигнала)
- subscriptionPlans (3 плана)

✅ **Форматирование чисел:**
- Все значения корректно отформатированы
- Утилиты форматирования для всех типов данных
- Правила округления соблюдены

✅ **Навигация:**
- Все страницы доступны из главного меню
- Маршруты подключены в App.tsx
- Мобильная навигация работает

Проект полностью восстановлен и готов к использованию!
