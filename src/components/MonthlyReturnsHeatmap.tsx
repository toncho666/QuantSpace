interface MonthlyReturnsHeatmapProps {
  data: number[][]; // [year][month]
}

export function MonthlyReturnsHeatmap({ data }: MonthlyReturnsHeatmapProps) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const years = data.map((_, i) => 2024 + i);

  const getColor = (value: number) => {
    if (value > 5) return 'bg-profit text-white';
    if (value > 2) return 'bg-profit/70 text-white';
    if (value > 0) return 'bg-profit/40 text-white';
    if (value > -2) return 'bg-loss/40 text-white';
    if (value > -5) return 'bg-loss/70 text-white';
    return 'bg-loss text-white';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left text-xs text-muted p-2">Year</th>
            {months.map(month => (
              <th key={month} className="text-center text-xs text-muted p-2">{month}</th>
            ))}
            <th className="text-center text-xs text-muted p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((yearData, yearIdx) => {
            const yearTotal = yearData.reduce((sum, val) => sum + val, 0);
            return (
              <tr key={yearIdx}>
                <td className="text-sm text-secondary p-2 font-medium">{years[yearIdx]}</td>
                {yearData.map((value, monthIdx) => (
                  <td key={monthIdx} className="p-1">
                    <div className={`${getColor(value)} rounded px-2 py-1 text-center text-xs font-medium`}>
                      {value.toFixed(1)}%
                    </div>
                  </td>
                ))}
                <td className="p-1">
                  <div className={`${getColor(yearTotal)} rounded px-2 py-1 text-center text-xs font-bold`}>
                    {yearTotal.toFixed(1)}%
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
