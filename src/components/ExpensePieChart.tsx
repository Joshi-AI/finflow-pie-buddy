
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useFinance } from '@/context/FinanceContext';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card p-3 rounded-lg shadow-lg border border-border">
        <p className="font-semibold text-sm">{data.name}</p>
        <p className="text-muted-foreground text-xs">Amount: ₹{data.value.toLocaleString()}</p>
        <p className="text-muted-foreground text-xs">({data.percent.toFixed(1)}%)</p>
        <p className="text-xs mt-1 text-muted-foreground italic">{data.description}</p>
      </div>
    );
  }
  return null;
};

export function ExpensePieChart() {
  const { transactions } = useFinance();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const categoryDescriptions = {
    healthcare: "Medical expenses and health-related costs",
    academics: "Educational and learning expenses",
    food: "Groceries and dining expenses",
    shopping: "Retail purchases and personal items",
    emergency: "Unexpected or urgent expenses",
    other: "Miscellaneous expenses",
  };

  const COLORS = {
    healthcare: '#4ade80', // vibrant green
    academics: '#60a5fa', // soft blue
    food: '#f97316', // warm orange
    shopping: '#8b5cf6', // royal purple
    emergency: '#ef4444', // attention red
    other: '#94a3b8', // neutral slate
  };

  const calculateExpensesByCategory = () => {
    const categories = {
      healthcare: 0,
      academics: 0,
      food: 0,
      shopping: 0,
      emergency: 0,
      other: 0,
    };

    const total = transactions.reduce((sum, transaction) => {
      categories[transaction.category] += transaction.amount;
      return sum + transaction.amount;
    }, 0);

    return Object.entries(categories).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      percent: (value / total) * 100,
      color: COLORS[name as keyof typeof COLORS],
      description: categoryDescriptions[name as keyof typeof categoryDescriptions]
    })).filter(category => category.value > 0);
  };

  const data = calculateExpensesByCategory();

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 5) return null; // Don't show labels for small segments

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-xs font-medium"
      >
        {`${percent.toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4 text-center">Expense Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  strokeWidth={activeIndex === index ? 2 : 1}
                  stroke={activeIndex === index ? '#fff' : 'transparent'}
                  className="transition-all duration-200"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={60}
              content={({ payload }) => (
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {payload?.map((entry: any, index) => (
                    <div
                      key={`legend-${index}`}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span>{entry.value}</span>
                    </div>
                  ))}
                </div>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
