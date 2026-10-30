# QuantSpace — Algorithmic Trading Platform

Премиальная платформа алгоритмической торговли с институциональным уровнем аналитики и корректным форматированием всех числовых значений.

## ✅ Исправления форматирования чисел

### Создана система утилит форматирования

**Файл:** `src/utils/format.ts`

Все числовые значения теперь форматируются через специализированные функции:

```typescript
formatPercent(value, decimals)    // "18.7%"
formatMoney(value, decimals)      // "$23.4k", "$1.2M"
formatNumber(value, decimals)     // "142", "0.6"
formatRatio(value, decimals)      // "1.62", "2.14"
formatDuration(value)             // "4.2 hours"
```

### Правила округления

**Проценты:**
- Доходность (CAGR, total return): 1 знак после запятой
- Win rate, win/loss rates: 1 знак после запятой
- Drawdown, volatility: 1 знак после запятой
- Risk of ruin: 2 знака после запятой (малые значения)

**Деньги:**
- Net profit: автоматическое форматирование ($23.4k, $1.2M)
- Expectancy: целые числа
- Cost per trade: 2 знака после запятой
- Recommended capital: целые числа с разделителями

**Коэффициенты:**
- Sharpe, Sortino, Calmar ratios: 2 знака после запятой
- Profit factor: 2 знака после запятой
- R-multiple: 2 знака после запятой
- Leverage: целые числа с "x"

**Количества:**
- Total trades: целые числа
- Trades per day: 1 знак после запятой
- Max consecutive losses: целые числа
- Signal delay: целые числа с "ms"

**Временные значения:**
- Duration: строки ("4.2 hours", "2.3 days")
- Uptime: 1 знак после запятой с "%"

### Примеры корректного форматирования

```typescript
// ✅ Правильно
formatPercent(18.7, 1)           // "18.7%"
formatPercent(-8.2, 1)           // "-8.2%"
formatMoney(23400, 0)            // "$23.4k"
formatMoney(1200000, 0)          // "$1.2M"
formatNumber(142, 0)             // "142"
formatNumber(0.6, 1)             // "0.6"
formatRatio(1.62, 2)             // "1.62"
formatRatio(2.15, 2)             // "2.15"

// ❌ Неправильно (было)
"18.700000000000003%"            // Лишние знаки
"$23400"                         // Нет разделителей
"1.623456789"                    // Слишком много знаков
"0.6000000001"                   // Нет округления
```

## 📊 8 групп метрик

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

## 📱 Страницы

### `/` — Landing Page
- Hero с gradient mesh background
- Карточки алгоритмов с CAGR
- Key metrics showcase (4 метрики)
- CTA секция

### `/algorithms` — Каталог стратегий
- Все алгоритмы с 5 ключевыми метриками
- CAGR, Sharpe, Max DD, Win Rate, Profit Factor
- Все значения корректно отформатированы

### `/algorithms/[id]` — Детальная страница
**5 вкладок:**
1. **Overview** — Equity Curve
2. **Trade Statistics** — 8 метрик торговли
3. **Risk Analysis** — 8 метрик риска
4. **Robustness** — 5 метрик устойчивости
5. **Technical** — Market Behavior, Capital Efficiency, Operational

### `/compare` — Сравнение алгоритмов
- Выбор до 5 стратегий
- Таблица сравнения с 6 метриками
- Все значения корректно отформатированы

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

### Исправления форматирования чисел

✅ **Создана система утилит форматирования**
- `formatPercent` — для процентов
- `formatMoney` — для денег (автоматическое форматирование k/M)
- `formatNumber` — для целых чисел и десятичных
- `formatRatio` — для коэффициентов

✅ **Правила округления**
- Проценты: 1-2 знака после запятой
- Деньги: автоматическое форматирование
- Коэффициенты: 2 знака после запятой
- Количества: целые числа

✅ **Все страницы обновлены**
- Landing — метрики с правильным форматированием
- Algorithms — карточки с отформатированными значениями
- AlgorithmDetail — все 60+ метрик корректно отформатированы
- Compare — таблица сравнения с правильными значениями

✅ **Нет некорректных значений**
- Нет лишних знаков после запятой
- Нет неокруглённых значений
- Нет значений без единиц измерения
- Все деньги имеют $ и разделители
