
import React, { useState } from 'react';
import { StockList } from '@/components/StockList';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  LineChart, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  Activity 
} from 'lucide-react';

export default function InvestmentsPage() {
  const { balance, stocks } = useFinance();
  const [marketTab, setMarketTab] = useState('overview');

  // Calculate stats
  const totalInvested = balance.invested;
  const initialInvestment = stocks.reduce((total, stock) => total + (stock.price * stock.quantity * (1 - stock.change/100)), 0);
  const profitLoss = totalInvested - initialInvestment;
  const portfolioDirection = profitLoss >= 0;
  
  // Simulated market data
  const marketTrends = [
    { name: 'S&P 500', value: '+1.2%', isPositive: true },
    { name: 'NASDAQ', value: '+0.8%', isPositive: true },
    { name: 'DOW', value: '-0.3%', isPositive: false },
    { name: 'Russell 2000', value: '+0.5%', isPositive: true },
  ];

  // Simulated trending stocks
  const trendingStocks = [
    { symbol: 'TSLA', name: 'Tesla Inc.', change: '+3.2%', isPositive: true },
    { symbol: 'AAPL', name: 'Apple Inc.', change: '+1.5%', isPositive: true },
    { symbol: 'MSFT', name: 'Microsoft Corp.', change: '+0.7%', isPositive: true },
    { symbol: 'META', name: 'Meta Platforms', change: '-1.2%', isPositive: false },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', change: '+2.1%', isPositive: true },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Investments</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <div className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{totalInvested.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Profit/Loss</p>
              <div className="flex items-center gap-2">
                {portfolioDirection ? (
                  <TrendingUp className="h-5 w-5 text-green-500" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                )}
                <span className={`text-2xl font-bold ${
                  portfolioDirection ? 'text-green-500' : 'text-red-500'
                }`}>
                  {portfolioDirection ? '+' : ''}{profitLoss.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
          <CardDescription>Latest market trends and popular stocks</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={marketTab} onValueChange={setMarketTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="overview">
                <Activity className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="trends">
                <LineChart className="w-4 h-4 mr-2" />
                Trends
              </TabsTrigger>
              <TabsTrigger value="popular">
                <BarChart3 className="w-4 h-4 mr-2" />
                Popular
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {marketTrends.map((trend, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted/40 rounded-lg">
                      <span>{trend.name}</span>
                      <span className={trend.isPositive ? 'text-green-500' : 'text-red-500'}>
                        {trend.value}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-2 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Last updated: 5 min ago</span>
                  </div>
                  <span>Market {Math.random() > 0.5 ? 'Open' : 'Closed'}</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="trends">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-2">Trending Today</p>
                {trendingStocks.map((stock, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/40 rounded-lg">
                    <div>
                      <p className="font-medium">{stock.symbol}</p>
                      <p className="text-xs text-muted-foreground">{stock.name}</p>
                    </div>
                    <span className={stock.isPositive ? 'text-green-500' : 'text-red-500'}>
                      {stock.change}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="popular">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-2">Most Traded Stocks</p>
                {trendingStocks.sort(() => Math.random() - 0.5).map((stock, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/40 rounded-lg">
                    <div>
                      <p className="font-medium">{stock.symbol}</p>
                      <p className="text-xs text-muted-foreground">{stock.name}</p>
                    </div>
                    <span className={stock.isPositive ? 'text-green-500' : 'text-red-500'}>
                      {stock.change}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Investments</CardTitle>
          <CardDescription>Manage your stock portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <StockList />
        </CardContent>
      </Card>
    </div>
  );
}
