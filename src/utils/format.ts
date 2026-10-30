// Утилиты для форматирования чисел

export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatMoney(value: number, decimals: number = 0): string {
  if (Math.abs(value) >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1000) {
    return `$${(value / 1000).toFixed(1)}k`;
  }
  return `$${value.toFixed(decimals)}`;
}

export function formatNumber(value: number, decimals: number = 0): string {
  return value.toFixed(decimals);
}

export function formatRatio(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function formatDuration(value: string): string {
  return value;
}
