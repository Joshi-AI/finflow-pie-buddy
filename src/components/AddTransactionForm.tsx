
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ShoppingBag, BookOpen, Utensils, Heart, ShieldAlert, HelpCircle } from 'lucide-react';
import { useFinance, Transaction } from '@/context/FinanceContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function AddTransactionForm() {
  const { addTransaction } = useFinance();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Transaction['category']>('other');

  const handleSubmit = () => {
    if (!amount || !description) return;

    addTransaction({
      date: format(date, 'yyyy-MM-dd'),
      amount: parseFloat(amount),
      category,
      description,
      source: 'manual'
    });

    // Reset form
    setDate(new Date());
    setAmount('');
    setDescription('');
    setCategory('other');
    setOpen(false);
  };

  const categories: { value: Transaction['category']; label: string; icon: React.ReactNode }[] = [
    { value: 'shopping', label: 'Shopping', icon: <ShoppingBag className="w-4 h-4" /> },
    { value: 'academics', label: 'Academics', icon: <BookOpen className="w-4 h-4" /> },
    { value: 'food', label: 'Food', icon: <Utensils className="w-4 h-4" /> },
    { value: 'healthcare', label: 'Healthcare', icon: <Heart className="w-4 h-4" /> },
    { value: 'emergency', label: 'Emergency', icon: <ShieldAlert className="w-4 h-4" /> },
    { value: 'other', label: 'Other', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full">Add Transaction</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Grocery shopping"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.value}
                    type="button"
                    variant={category === cat.value ? "default" : "outline"}
                    className="flex flex-col h-auto py-2"
                    onClick={() => setCategory(cat.value)}
                  >
                    <span className="mb-1">{cat.icon}</span>
                    <span className="text-xs">{cat.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Add Transaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
