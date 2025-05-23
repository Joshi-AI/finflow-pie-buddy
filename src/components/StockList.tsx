import React, { useState } from 'react';
import { TrendingUp, TrendingDown, IndianRupee } from 'lucide-react';
import { useFinance, Stock } from '@/context/FinanceContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export function StockList() {
  const { stocks, buyStock, sellStock, balance } = useFinance();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'buy' | 'sell'>('buy');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [newStock, setNewStock] = useState({
    symbol: '',
    name: '',
    price: 0,
    change: 0
  });

  const handleBuyClick = (stock?: Stock) => {
    if (stock) {
      setSelectedStock(stock);
      setDialogType('buy');
    } else {
      setSelectedStock(null);
      setDialogType('buy');
    }
    setIsDialogOpen(true);
  };

  const handleSellClick = (stock: Stock) => {
    setSelectedStock(stock);
    setDialogType('sell');
    setQuantity(1);
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    try {
      if (dialogType === 'buy') {
        if (selectedStock) {
          buyStock(
            {
              symbol: selectedStock.symbol,
              name: selectedStock.name,
              price: selectedStock.price,
              change: selectedStock.change
            },
            quantity
          );
        } else {
          buyStock(
            {
              symbol: newStock.symbol,
              name: newStock.name,
              price: newStock.price,
              change: newStock.change
            },
            quantity
          );
        }
      } else {
        if (selectedStock) {
          sellStock(selectedStock.id, quantity);
        }
      }
      setIsDialogOpen(false);
      setQuantity(1);
      setNewStock({
        symbol: '',
        name: '',
        price: 0,
        change: 0
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Purchase Failed', {
          description: error.message
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Your Investments</h3>
        <Button size="sm" onClick={() => handleBuyClick()}>Buy New</Button>
      </div>

      <div className="space-y-3">
        {stocks.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No stocks in your portfolio</p>
        ) : (
          stocks.map((stock) => (
            <div key={stock.id} className="p-3 bg-card rounded-lg border border-border">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{stock.symbol}</span>
                    {stock.change >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold flex items-center justify-end gap-1">
                    <IndianRupee className="w-4 h-4" />
                    {stock.price.toFixed(2)}
                  </p>
                  <p className={`text-sm ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Shares: {stock.quantity}</p>
                  <p className="text-sm font-medium flex items-center gap-1">
                    <IndianRupee className="w-4 h-4" />
                    {(stock.price * stock.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleBuyClick(stock)}>Buy</Button>
                  <Button size="sm" variant="outline" onClick={() => handleSellClick(stock)}>Sell</Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === 'buy'
                ? selectedStock
                  ? `Buy more ${selectedStock.symbol}`
                  : 'Buy New Stock'
                : `Sell ${selectedStock?.symbol}`}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {dialogType === 'buy' && !selectedStock && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="symbol">Stock Symbol</Label>
                  <Input
                    id="symbol"
                    value={newStock.symbol}
                    onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value })}
                    placeholder="AAPL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    value={newStock.name}
                    onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
                    placeholder="Apple Inc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Stock Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newStock.price}
                    onChange={(e) => setNewStock({ ...newStock, price: parseFloat(e.target.value) })}
                    placeholder="0.00"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>

            {selectedStock && (
              <div className="flex justify-between py-2 border-t border-border">
                <span>Total:</span>
                <span className="font-bold flex items-center gap-1">
                  <IndianRupee className="w-4 h-4" />
                  {(selectedStock.price * quantity).toFixed(2)}
                </span>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {dialogType === 'buy' ? 'Buy' : 'Sell'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
