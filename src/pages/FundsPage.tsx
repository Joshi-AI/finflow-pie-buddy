import React from 'react';
import { ExpensePieChart } from '@/components/ExpensePieChart';
import { TransactionList } from '@/components/TransactionList';
import { EmergencyFund } from '@/components/EmergencyFund';
import { AddTransactionForm } from '@/components/AddTransactionForm';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, IndianRupee, TrendingUp, ShieldAlert } from 'lucide-react';

export default function FundsPage() {
  const { balance } = useFinance();

  const stats = [
    {
      title: 'Total Balance',
      value: <div className="flex items-center gap-1">
        <IndianRupee className="w-4 h-4" />
        {balance.total.toFixed(2)}
      </div>,
      icon: <Wallet className="w-4 h-4" />,
      description: 'Your total assets',
    },
    {
      title: 'Available',
      value: <div className="flex items-center gap-1">
        <IndianRupee className="w-4 h-4" />
        {balance.available.toFixed(2)}
      </div>,
      icon: <IndianRupee className="w-4 h-4" />,
      description: 'Available to spend',
    },
    {
      title: 'Invested',
      value: <div className="flex items-center gap-1">
        <IndianRupee className="w-4 h-4" />
        {balance.invested.toFixed(2)}
      </div>,
      icon: <TrendingUp className="w-4 h-4" />,
      description: 'Market value',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Funds</h1>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="h-4 w-4 text-muted-foreground">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-1">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpensePieChart />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Emergency Fund</CardTitle>
            <ShieldAlert className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <EmergencyFund />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add New Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <AddTransactionForm />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionList />
        </CardContent>
      </Card>
    </div>
  );
}
