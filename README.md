# QuantSpace — Algorithmic Trading Platform

Премиальная платформа алгоритмической торговли с передовым UI/UX дизайном 2026 года.

## 🎨 Дизайн-система 2026

### Передовые UI/UX техники

**Bento Grid Layout**
- Асимметричная сетка карточек разного размера
- Визуальная иерархия через размер и положение
- Интерактивные hover эффекты с 3D transforms

**Glassmorphism**
- Полупрозрачные карточки с backdrop-blur
- Эффект матового стекла
- Глубина и многослойность

**Gradient Mesh Backgrounds**
- Многослойные радиальные градиенты
- Анимированные цветовые переходы
- Органические, живые фоны

**Advanced Animations**
- Spring physics для естественных движений
- Stagger animations для последовательного появления
- Scroll-triggered animations
- Micro-interactions на всех интерактивных элементах

**Interactive Data Visualization**
- Только растущие equity curves (без просадок)
- Sparklines в карточках метрик
- Radar charts для сравнения стратегий
- Real-time animated counters

### Цветовая палитра

**Vibrant Accents:**
- Purple: `#8b5cf6`
- Blue: `#3b82f6`
- Cyan: `#06b6d4`
- Pink: `#ec4899`
- Orange: `#f97316`

**Gradients:**
- Primary: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Secondary: `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`
- Accent: `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`
- Success: `linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)`

## 📊 Advanced Analytics

### 20+ метрик для каждой стратегии

**Basic Metrics:**
- Return %
- Max Drawdown
- Total Trades
- Win Rate
- Profit Factor
- Average R:R

**Advanced Risk Metrics:**
- Sharpe Ratio (risk-adjusted return)
- Sortino Ratio (downside risk adjusted)
- Calmar Ratio (return vs max drawdown)
- Recovery Factor (speed of recovery)

**Statistical Metrics:**
- Expectancy (average profit per trade)
- Skewness (distribution asymmetry)
- Kurtosis (tail heaviness)
- Standard Deviation

**Trade Metrics:**
- Average Win/Loss
- Largest Win/Loss
- Average Holding Period
- Consecutive Wins/Losses

**Risk Metrics:**
- Risk of Ruin
- Payoff Ratio
- Tail Ratio

### Только растущие графики

Все equity curves генерируются с гарантированным ростом:
```typescript
function generateGrowingEquityCurve(start, end, volatility, points) {
  // Always positive growth with small variations
  const growth = step + (Math.random() * volatility * 0.5);
  const noise = (Math.random() - 0.3) * volatility * 0.3;
  // Bias toward positive
}
```

### Единый формат графиков

Все графики используют чистые числовые значения на осях Y без форматирования:
```typescript
<YAxis tickFormatter={(value) => value.toFixed(0)} />
```

## 🆕 Страницы

### `/algorithms` — Полный каталог стратегий

**Функциональность:**
- Все 10 стратегий с детальными метриками
- Фильтры:
  - Risk Profile (Conservative, Moderate, Aggressive)
  - Status (Backtest, Paper, Live)
  - Market (Futures, Crypto, Forex, Equities)
- Сортировка по метрикам:
  - Return %
  - Sharpe Ratio
  - Win Rate
  - Profit Factor
  - Max Drawdown (lowest first)
- Счётчик показанных стратегий
- Мини-графики equity curves
- Детальные метрики для каждой стратегии

### `/compare` — Advanced Comparison

**Функциональность:**
- Выбор до 5 алгоритмов для сравнения
- Фильтрация по risk profile
- Сортировка по любой метрике
- **Radar Chart** — визуальное сравнение 6 ключевых метрик
- **Equity Curves Overlay** — все кривые на одном графике
- **Detailed Metrics Table** — 9 колонок с основными показателями

### `/algorithms/[slug]` — Детальная страница алгоритма

**Содержимое:**
- Полное описание стратегии
- Equity curve с правильным масштабированием
- **ВСЕ 20+ метрик** в 4 секциях:
  1. Performance Metrics (8 метрик)
  2. Advanced Risk Metrics (8 метрик)
  3. Statistical Metrics (8 метрик)
  4. Costs & Execution (2 метрики)
- Signal logic
- Limitations
- Pricing

### Landing
- Hero с gradient mesh background
- Bento grid с 5 карточками алгоритмов
- Featured algorithm с большим графиком
- Metrics showcase (8 карточек)
- Advanced metrics section
- CTA с gradient border анимацией
- Ссылки на /algorithms и /compare

### Dashboard
- Overview с метриками
- Signals с фильтрами
- Analytics с графиками
- Subscriptions
- Settings

### Bot Shop
- Список торговых ботов
- Статусы (available/demo/coming soon)
- Метрики и цены

### Admin
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
- 20+ аналитических метрик
- Только растущий equity curve
- Детальное описание
- Signal logic
- Limitations
- Pricing

## 🚀 Технологии

- **React 18** + TypeScript
- **Vite** (быстрая сборка)
- **Tailwind CSS 4** (utility-first)
- **Framer Motion** (advanced animations)
- **Recharts** (data visualization)
- **React Router** (navigation)
- **Lucide React** (icons)

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

### BentoCard
- Асимметричная сетка
- Hover эффекты с 3D transforms
- Разные размеры (col-2, col-3, col-4, col-6)

### GlassCard
- Glassmorphism эффект
- Backdrop blur
- Полупрозрачность

### MetricCard
- Sparkline графики
- Анимированные счётчики
- Change indicators

### GradientMesh
- Многослойные радиальные градиенты
- Анимированные фоны

## ✨ Анимации

**Spring Physics:**
- Естественные, физически корректные движения
- Stiffness и damping настройки

**Stagger Animations:**
- Последовательное появление элементов
- Настраиваемая задержка

**Scroll-triggered:**
- Intersection Observer
- Trigger once или repeat

**Micro-interactions:**
- Hover scale и translate
- Color transitions
- Border animations

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
- Algorithms — полный каталог всех стратегий с фильтрами
- Compare — сравнение алгоритмов по метрикам
- Bot Shop — маркетплейс торговых ботов
- Dashboard — личный кабинет

## ⚠️ Дисклеймер

Все данные являются синтетическими демо-данными. Это не реальные торговые результаты. Торговля связана с риском убытков.

## 📄 Лицензия

© 2026 QuantSpace

## 🔄 Последние изменения

### Update: Метрики и фильтрация

✅ **Все 20+ метрик на странице каждого алгоритма**
- Performance Metrics (8 метрик)
- Advanced Risk Metrics (8 метрик)
- Statistical Metrics (8 метрик)
- Costs & Execution (2 метрики)

✅ **Единый формат графиков**
- Чистые числовые значения на осях Y
- Без форматирования (%, $, и т.д.)
- tickFormatter для всех графиков

✅ **Расширенная фильтрация на /algorithms**
- Фильтр по Market (Futures, Crypto, Forex, Equities)
- Сортировка по 5 метрикам
- Счётчик показанных стратегий
- Все 10 стратегий отображаются

✅ **Навигация**
- Добавлена ссылка на /compare в главное меню
- Все основные страницы доступны из навигации
