
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useFinance, Transaction } from '@/context/FinanceContext';

// Custom tooltip for the pie chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card p-3 rounded-lg shadow-lg border border-border">
        <p className="font-semibold">{data.name}</p>
        <p className="text-muted-foreground">Amount: ${data.value.toFixed(2)}</p>
        <p className="text-muted-foreground">Percentage: {data.percent.toFixed(2)}%</p>
      </div>
    );
  }
  return null;
};

export function ExpensePieChart() {
  const { transactions } = useFinance();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Calculate total expenses by category
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

    // Convert to array format for the pie chart
    return Object.entries(categories).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      percent: (value / total) * 100,
      color: getCategoryColor(name as keyof typeof categories)
    })).filter(category => category.value > 0);
  };

  const getCategoryColor = (category: keyof typeof COLORS) => {
    return COLORS[category] || COLORS.other;
  };

  const COLORS = {
    healthcare: '#4ade80', // green
    academics: '#60a5fa', // blue
    food: '#f97316', // orange
    shopping: '#8b5cf6', // purple
    emergency: '#ef4444', // red
    other: '#9ca3af', // gray
  };

  const data = calculateExpensesByCategory();

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="w-full h-72 mt-4">
      <h3 className="text-lg font-semibold mb-2 text-center">Expense Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
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
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center mt-4 gap-2">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-xs">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
