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

### Типографика

**Display Hero:**
- Font-weight: 200
- Letter-spacing: -0.05em
- Gradient text с анимацией
- Size: clamp(3rem, 10vw, 8rem)

**Metrics:**
- Monospace font (JetBrains Mono)
- Tabular nums для выравнивания
- Gradient coloring для позитивных значений

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

## 🆕 Новая страница сравнения

### `/compare` — Advanced Comparison

**Функциональность:**
- Выбор до 5 алгоритмов для сравнения
- Фильтрация по risk profile
- Сортировка по любой метрике
- Radar chart для визуального сравнения
- Overlay equity curves
- Детальная таблица метрик

**Визуализации:**
- Radar Chart: 6 ключевых метрик на одном графике
- Equity Curves: overlay всех выбранных стратегий
- Metrics Table: 9 колонок с основными показателями

## 📱 Страницы

### Landing (новая версия)
- Hero с gradient mesh background
- Bento grid с 5 карточками алгоритмов
- Featured algorithm с большим графиком
- Metrics showcase (8 карточек)
- Animated gradient text
- Interactive hover effects

### Algorithms
- Список всех 10 стратегий
- Фильтры по risk, status, market
- Мини-графики с правильным Y-axis domain
- Детальные метрики

### Algorithm Detail
- Полное описание стратегии
- Equity curve с правильным масштабированием
- Все 20+ метрик
- Signal logic
- Limitations
- Pricing

### Compare (НОВАЯ)
- Выбор алгоритмов для сравнения
- Radar chart
- Equity curves overlay
- Детальная таблица метрик
- Сортировка и фильтрация

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

## ⚠️ Дисклеймер

Все данные являются синтетическими демо-данными. Это не реальные торговые результаты. Торговля связана с риском убытков.

## 📄 Лицензия

© 2026 QuantSpace

## 🔄 Последние изменения

### Major Update 2026

✅ **Полная переделка дизайна с нуля**
- Bento grid layouts
- Glassmorphism эффекты
- Gradient mesh backgrounds
- Advanced animations

✅ **Только растущие графики**
- Убраны все просадки
- Гарантированный рост equity curves
- Более позитивное визуальное восприятие

✅ **20+ аналитических метрик**
- Sharpe, Sortino, Calmar ratios
- Recovery factor, expectancy
- Skewness, kurtosis
- Risk of ruin, tail ratio
- И многие другие

✅ **Новая страница сравнения**
- Radar charts
- Equity curves overlay
- Детальная таблица метрик
- Сортировка и фильтрация

✅ **10 стратегий**
- Разнообразные классы стратегий
- Разные risk profiles
- Разные рынки и таймфреймы
- Все с полными метриками

✅ **Передовые UI/UX техники**
- Interactive data visualization
- Micro-interactions
- Scroll-triggered animations
- Spring physics
- 3D transforms
