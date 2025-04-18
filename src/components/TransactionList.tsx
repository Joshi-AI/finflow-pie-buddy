import React from 'react';
import { format } from 'date-fns';
import { IndianRupee } from 'lucide-react';
import { useFinance, Transaction } from '@/context/FinanceContext';
import { ShoppingBag, BookOpen, Utensils, Heart, ShieldAlert, HelpCircle } from 'lucide-react';

export function TransactionList() {
  const { transactions } = useFinance();

  const getCategoryIcon = (category: Transaction['category']) => {
    switch (category) {
      case 'shopping':
        return <ShoppingBag className="w-5 h-5 text-purple-500" />;
      case 'academics':
        return <BookOpen className="w-5 h-5 text-blue-500" />;
      case 'food':
        return <Utensils className="w-5 h-5 text-orange-500" />;
      case 'healthcare':
        return <Heart className="w-5 h-5 text-green-500" />;
      case 'emergency':
        return <ShieldAlert className="w-5 h-5 text-red-500" />;
      default:
        return <HelpCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Transactions</h3>
      <div className="space-y-2">
        {transactions.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No transactions found</p>
        ) : (
          transactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-full">
                  {getCategoryIcon(transaction.category)}
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(transaction.date)} • {transaction.source === 'sms' ? 'SMS' : 'Manual'}
                  </p>
                </div>
              </div>
              <span className="font-semibold flex items-center gap-1">
                <IndianRupee className="w-4 h-4" />
                {transaction.amount.toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
