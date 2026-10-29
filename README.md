# QuantSpace — Algorithmic Trading Platform

Премиальная платформа алгоритмической торговли с институциональным уровнем аналитики и прозрачности.

## 🎯 Ключевые особенности

### 📊 Институциональная аналитика

**8 групп метрик для каждой стратегии:**

1. **Доходность (Return)**
   - CAGR, чистая прибыль, средняя месячная/годовая доходность
   - Доля прибыльных месяцев, доходность после комиссий

2. **Риск и просадки (Risk)**
   - Max drawdown, текущая просадка, длительность восстановления
   - VaR, CVaR, волатильность, худший день/неделя/месяц
   - Риск разорения, максимальная серия убытков

3. **Эффективность с поправкой на риск (Risk-adjusted)**
   - Sharpe, Sortino, Calmar, Sterling, MAR ratios
   - Return/Max DD, Return/Avg DD

4. **Статистика сделок (Trade Statistics)**
   - Win rate, profit factor, expectancy
   - Средний выигрыш/убыток, R-multiple
   - Длительность сделок, частота торговли

5. **Устойчивость (Robustness)**
   - In-sample vs Out-of-sample результаты
   - Walk-forward анализ, Monte Carlo симуляции
   - Чувствительность к параметрам, риск переоптимизации

6. **Рыночное поведение (Market Behavior)**
   - Производительность в тренде/флэте/высокой волатильности
   - Long/Short статистика, средняя экспозиция
   - Лучшие сессии, время в позиции

7. **Эффективность капитала (Capital Efficiency)**
   - Рекомендуемый капитал, размер позиции, плечо
   - Return on capital/margin, turnover
   - Ёмкость стратегии

8. **Операционная надёжность (Operational Reliability)**
   - Uptime системы, задержки сигналов
   - Ошибки исполнения, пропущенные сделки
   - Стабильность брокера

### 📈 4 типа графиков

1. **Equity Curve** — кривая роста капитала
2. **Drawdown Curve** — глубина и продолжительность просадок
3. **Monthly Returns Heatmap** — доходность по месяцам (тепловая карта)
4. **Rolling Sharpe** — изменение Sharpe ratio во времени

### 🏛 Регуляторная прозрачность

Каждая стратегия включает:
- **Тип результатов**: backtest / paper trading / live
- **Период тестирования**: даты начала и окончания
- **Учтённые комиссии и проскальзывание**
- **Начальный капитал и методология расчёта**
- **Допущения по плечу**
- **Ограничения и дисклеймеры**

Соответствие требованиям CFTC/NFA для гипотетических результатов.

## 🎨 Дизайн

### Передовые UI/UX техники 2026

- **Bento Grid Layout** — асимметричная сетка карточек
- **Glassmorphism** — полупрозрачные элементы с backdrop-blur
- **Gradient Mesh Backgrounds** — многослойные радиальные градиенты
- **Spring Physics** — физически корректные анимации
- **Micro-interactions** — hover эффекты с 3D transforms

### Типографика

- **Geist Sans** — основной шрифт (от Vercel)
- **Geist Mono** — для метрик и технических данных

### Цветовая палитра

**Vibrant Accents:**
- Purple: `#8b5cf6`
- Blue: `#3b82f6`
- Cyan: `#06b6d4`
- Pink: `#ec4899`
- Orange: `#f97316`

## 📱 Страницы

### `/` — Landing Page
- Hero с gradient mesh background
- Bento grid с карточками алгоритмов
- Metrics showcase (8 карточек)
- Advanced metrics section
- CTA с gradient border анимацией

### `/algorithms` — Каталог стратегий
- Все 10 стратегий с 10 ключевыми показателями
- Фильтры: Risk Profile, Status, Market
- Сортировка по метрикам
- Счётчик показанных стратегий

### `/algorithms/[slug]` — Детальная страница
**5 вкладок:**
1. **Overview** — Equity Curve, Drawdown, Monthly Returns, Rolling Sharpe
2. **Trade Statistics** — 12 метрик торговли
3. **Risk Analysis** — 12 метрик риска
4. **Robustness** — 9 метрик устойчивости
5. **Technical** — Market Behavior, Capital Efficiency, Operational Reliability

**Регуляторный блок:**
- Тип результатов (backtest/paper/live)
- Период тестирования
- Комиссии и проскальзывание
- Начальный капитал
- Методология расчёта

### `/compare` — Сравнение алгоритмов
- Выбор до 5 стратегий
- Radar chart (6 метрик)
- Overlay equity curves
- Детальная таблица метрик
- Сортировка и фильтрация

### `/dashboard` — Личный кабинет
- Overview с метриками
- Signals с фильтрами
- Analytics с графиками
- Subscriptions
- Settings

### `/shop` — Маркетплейс ботов
- Список торговых ботов
- Статусы (available/demo/coming soon)
- Метрики и цены

### `/admin` — Админ-панель
- Управление пользователями
- Алгоритмы и сигналы
- Платежи и подписки
- Системный мониторинг

## 🎯 10 стратегий

1. **VP Mean Reversion** — Volume Profile (moderate)
2. **Trend Continuation** — Trend Following (moderate)
3. **Breakout Value Shift** — Breakout (aggressive)
4. **Delta Divergence Scalp** — Scalping (aggressive)
5. **Statistical Arbitrage** — Pairs Trading (conservative)
6. **Volatility Breakout** — Volatility (moderate)
7. **Grid Market Making** — Market Making (conservative)
8. **Momentum Trend** — Trend Following (moderate)
9. **RSI Mean Reversion** — Mean Reversion (moderate)
10. **Carry Trade FX** — Carry Trade (conservative)

Каждая стратегия имеет:
- ✅ 8 групп метрик (60+ показателей)
- ✅ 4 типа графиков
- ✅ Регуляторную информацию
- ✅ Только растущий equity curve
- ✅ Детальное описание
- ✅ Signal logic
- ✅ Limitations
- ✅ Pricing

## 🚀 Технологии

- **React 18** + TypeScript
- **Vite** (быстрая сборка)
- **Tailwind CSS 4** (utility-first)
- **Framer Motion** (advanced animations)
- **Recharts** (data visualization)
- **React Router** (navigation)
- **Lucide React** (icons)
- **Geist Font** (typography)

## 📦 Установка

```bash
npm install
npm run dev
```

## 🏗 Сборка

```bash
npm run build
```

## 🎨 Ключевые компоненты

### Графики
- **DrawdownChart** — визуализация просадок
- **MonthlyReturnsHeatmap** — тепловая карта месячной доходности
- **RollingSharpeChart** — скользящий Sharpe ratio
- **MetricCard** — карточки метрик со sparklines

### UI
- **BentoCard** — асимметричная сетка
- **GlassCard** — glassmorphism эффекты
- **GradientMesh** — многослойные градиенты
- **FadeIn** — scroll-triggered анимации
- **Stagger** — последовательное появление

## ✨ Анимации

- **Spring Physics** — естественные движения
- **Stagger Animations** — последовательное появление
- **Scroll-triggered** — Intersection Observer
- **Micro-interactions** — hover scale, translate, color transitions
- **CTA Pulse** — пульсация кнопок действия

## 🌓 Темы

**Светлая тема (по умолчанию):**
- Чистый белый фон
- Тёмный текст
- Vibrant акценты

**Тёмная тема:**
- Глубокий чёрный фон
- Светлый текст
- Те же vibrant акценты

Переключение через кнопку в header.

## 📈 Навигация

**Главное меню:**
- Algorithms — полный каталог всех стратегий
- Compare — сравнение алгоритмов по метрикам
- Bot Shop — маркетплейс торговых ботов
- Dashboard — личный кабинет

## ⚠️ Дисклеймер

Все данные являются синтетическими демо-данными. Это не реальные торговые результаты. Торговля связана с риском убытков. Прошлые результаты не гарантируют будущую доходность.

## 📄 Лицензия

© 2026 QuantSpace

## 🔄 Последние изменения

### Major Update: Институциональная аналитика

✅ **8 групп метрик для каждой стратегии**
- Return, Risk, Risk-adjusted, Trade Statistics
- Robustness, Market Behavior, Capital Efficiency, Operational Reliability

✅ **4 типа графиков**
- Equity Curve, Drawdown Curve, Monthly Returns Heatmap, Rolling Sharpe

✅ **Регуляторная прозрачность**
- Тип результатов (backtest/paper/live)
- Период тестирования, комиссии, проскальзывание
- Начальный капитал, методология расчёта
- Соответствие CFTC/NFA требованиям

✅ **5 вкладок на странице алгоритма**
- Overview, Trade Statistics, Risk Analysis, Robustness, Technical

✅ **60+ метрик для каждой стратегии**
- Полная институциональная аналитика
- Все данные для принятия решений
- Прозрачность и воспроизводимость

✅ **Geist шрифт**
- Современный, характерный
- Отлично читается в малых размерах
- Идеален для fintech/tech продуктов
