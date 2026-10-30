# QuantSpace — Algorithmic Trading Platform

Премиальная платформа алгоритмической торговли с институциональным уровнем аналитики.

## ✅ Полная структура продукта восстановлена

### 📊 10 алгоритмов с полными метриками

Все 10 стратегий с 60+ метриками каждая:

1. **VP Mean Reversion** — Mean Reversion (moderate, paper)
   - CAGR: 18.7%, Sharpe: 1.62, Max DD: -8.2%
   
2. **Trend Continuation** — Trend Following (moderate, paper)
   - CAGR: 28.1%, Sharpe: 1.89, Max DD: -12.1%
   
3. **Breakout Value Shift** — Breakout (aggressive, backtest)
   - CAGR: 34.8%, Sharpe: 1.45, Max DD: -15.8%
   
4. **Delta Divergence Scalp** — Scalping (aggressive, backtest)
   - CAGR: 15.2%, Sharpe: 2.10, Max DD: -6.4%
   
5. **Statistical Arbitrage** — Statistical Arbitrage (conservative, paper)
   - CAGR: 12.8%, Sharpe: 2.34, Max DD: -4.2%
   
6. **Volatility Breakout** — Volatility (moderate, paper)
   - CAGR: 22.8%, Sharpe: 1.78, Max DD: -9.8%
   
7. **Grid Market Making** — Market Making (conservative, backtest)
   - CAGR: 17.8%, Sharpe: 2.67, Max DD: -5.6%
   
8. **Momentum Trend** — Trend Following (moderate, live)
   - CAGR: 31.2%, Sharpe: 1.62, Max DD: -14.2%
   
9. **RSI Mean Reversion** — Mean Reversion (moderate, paper)
   - CAGR: 15.6%, Sharpe: 1.89, Max DD: -7.3%
   
10. **Carry Trade FX** — Carry Trade (conservative, live)
    - CAGR: 10.2%, Sharpe: 1.45, Max DD: -6.1%

### 🤖 5 торговых ботов

1. **VP AutoTrader** — Mean Reversion (demo, $99/mo)
2. **Trend Rider** — Trend Following (coming_soon, $149/mo)
3. **Breakout Executor** — Breakout (coming_soon, $2499 license)
4. **Scalp Master** — Scalping (demo, $199/mo)
5. **Stat Arb Pro** — Statistical Arbitrage (available, $299/mo)

### 📡 5 торговых сигналов

- VP Mean Reversion: ES LONG (ACTIVE)
- Trend Continuation: BTC/USDT LONG (TRIGGERED)
- Breakout Value Shift: NQ SHORT (CLOSED, +1.8%)
- Statistical Arbitrage: BTC/ETH LONG (ACTIVE)
- Momentum Trend: EUR/USD LONG (TRIGGERED)

### 💳 3 плана подписки

1. **Starter** — $49/mo (1 алгоритм)
2. **Professional** — $149/mo (3 алгоритма, highlighted)
3. **Institutional** — $399/mo (все алгоритмы)

## 📱 Все страницы на месте

### Публичные страницы:
- `/` — **Landing** — главная с 6 карточками алгоритмов
- `/algorithms` — **Algorithms** — каталог с расширенной фильтрацией
- `/algorithms/:slug` — **AlgorithmDetail** — детальная страница (5 вкладок)
- `/compare` — **Compare** — сравнение 3 алгоритмов по умолчанию
- `/shop` — **Shop** — маркетплейс 5 ботов

### Авторизация:
- `/login` — **Login** — страница входа
- `/register` — **Register** — страница регистрации

### Личный кабинет:
- `/dashboard` — **Dashboard** с 5 вкладками:
  - Overview — обзор с метриками и сигналами
  - Signals — список торговых сигналов
  - Analytics — аналитика производительности
  - Subscriptions — управление подписками
  - Settings — настройки профиля

### Администрирование:
- `/admin` — **Admin** с 7 вкладками:
  - Overview — обзор системы
  - Users — управление пользователями (5 демо-пользователей)
  - Algorithms — управление алгоритмами
  - Signals — управление сигналами
  - Payments — управление платежами
  - Bots — управление ботами
  - System — мониторинг системы

## 🔍 Расширенная фильтрация алгоритмов

### Фильтры:
- **Поиск** — по названию алгоритма
- **Risk Profile** — Conservative, Moderate, Aggressive
- **Status** — Backtest, Paper Trading, Live
- **Market** — Futures, Crypto, Forex, Equities

### Сортировка:
- CAGR (годовая доходность)
- Sharpe Ratio
- Win Rate
- Profit Factor
- Lowest Max Drawdown

### Счётчик результатов:
- Показывает "Showing X of 10 strategies"

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
- **Stagger** — последовательная анимация элементов

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
│   ├── Landing.tsx           # Главная страница (6 карточек)
│   ├── Algorithms.tsx        # Каталог (10 алгоритмов, фильтрация)
│   ├── AlgorithmDetail.tsx   # Детальная страница (5 вкладок)
│   ├── Compare.tsx           # Сравнение (3 по умолчанию)
│   ├── Login.tsx             # Страница входа
│   ├── Register.tsx          # Страница регистрации
│   ├── Dashboard.tsx         # Личный кабинет (5 вкладок)
│   ├── Shop.tsx              # Маркетплейс (5 ботов)
│   └── Admin.tsx             # Админ-панель (7 вкладок)
│
├── data/
│   └── mockData.ts           # Моковые данные
│       ├── algorithms (10)
│       ├── bots (5)
│       ├── signals (5)
│       └── subscriptionPlans (3)
│
└── utils/
    └── format.ts             # Утилиты форматирования
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

## ✅ Восстановленный контент

### По сравнению с версией 2 дня назад:

✅ **10 алгоритмов** (было 2)
- Все с полными 60+ метриками
- Разные классы стратегий
- Разные risk profiles
- Разные статусы (backtest/paper/live)

✅ **Расширенная фильтрация**
- Поиск по названию
- Фильтр по risk profile
- Фильтр по status
- Фильтр по market
- Сортировка по 5 метрикам
- Счётчик результатов

✅ **5 ботов** (было 2)
- Разные категории
- Разные статусы
- Разные цены

✅ **5 сигналов** (было 2)
- Разные алгоритмы
- Разные статусы
- Разные инструменты

✅ **6 карточек на Landing** (было 4)
- Больше контента на главной

✅ **3 алгоритма в Compare** (было 2)
- Больше данных для сравнения

✅ **Все страницы на месте**
- Dashboard с 5 вкладками
- Shop с 5 ботами
- Admin с 7 вкладками

## 📄 Лицензия

© 2026 QuantSpace

## 🔄 Последние изменения

### Восстановление полного контента

✅ **10 алгоритмов с полными метриками**
- VP Mean Reversion, Trend Continuation, Breakout Value Shift
- Delta Divergence Scalp, Statistical Arbitrage, Volatility Breakout
- Grid Market Making, Momentum Trend, RSI Mean Reversion, Carry Trade FX

✅ **Расширенная фильтрация на /algorithms**
- Поиск, Risk Profile, Status, Market
- Сортировка по CAGR, Sharpe, Win Rate, Profit Factor, Max DD
- Счётчик "Showing X of 10 strategies"

✅ **5 ботов на /shop**
- VP AutoTrader, Trend Rider, Breakout Executor, Scalp Master, Stat Arb Pro

✅ **5 сигналов**
- Разные алгоритмы, инструменты, статусы

✅ **3 плана подписки**
- Starter ($49), Professional ($149), Institutional ($399)

✅ **6 карточек на Landing**
- Больше контента на главной странице

✅ **3 алгоритма в Compare по умолчанию**
- Больше данных для сравнения

Проект полностью восстановлен и готов к использованию!
