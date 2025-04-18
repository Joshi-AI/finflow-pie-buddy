
import React, { createContext, useContext, useState, useEffect } from "react";

// Define types for our financial data
export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: "healthcare" | "academics" | "food" | "shopping" | "emergency" | "other";
  description: string;
  source: "sms" | "manual";
}

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  quantity: number;
}

interface FinanceContextType {
  transactions: Transaction[];
  stocks: Stock[];
  emergencyFund: {
    current: number;
    target: number;
  };
  balance: {
    total: number;
    available: number;
    invested: number;
  };
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateEmergencyTarget: (target: number) => void;
  buyStock: (stock: Omit<Stock, "id" | "quantity">, quantity: number) => void;
  sellStock: (stockId: string, quantity: number) => void;
  smsDetectionEnabled: boolean;
  toggleSmsDetection: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

// Sample data
const initialTransactions: Transaction[] = [
  {
    id: "1",
    date: "2023-04-15",
    amount: 120.50,
    category: "healthcare",
    description: "Medical checkup",
    source: "sms"
  },
  {
    id: "2",
    date: "2023-04-12",
    amount: 85.75,
    category: "food",
    description: "Grocery shopping",
    source: "sms"
  },
  {
    id: "3",
    date: "2023-04-10",
    amount: 250.00,
    category: "academics",
    description: "Online course subscription",
    source: "manual"
  },
  {
    id: "4",
    date: "2023-04-05",
    amount: 159.99,
    category: "shopping",
    description: "New clothes",
    source: "sms"
  },
  {
    id: "5",
    date: "2023-04-01",
    amount: 100.00,
    category: "emergency",
    description: "Emergency fund contribution",
    source: "manual"
  }
];

const initialStocks: Stock[] = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.34,
    change: 1.25,
    quantity: 2
  },
  {
    id: "2",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 312.78,
    change: -0.58,
    quantity: 1
  },
  {
    id: "3",
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 133.09,
    change: 0.89,
    quantity: 3
  }
];

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  // Load from localStorage or use initial data
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : initialTransactions;
  });
  
  const [stocks, setStocks] = useState<Stock[]>(() => {
    const saved = localStorage.getItem("stocks");
    return saved ? JSON.parse(saved) : initialStocks;
  });
  
  const [emergencyFund, setEmergencyFund] = useState(() => {
    const saved = localStorage.getItem("emergencyFund");
    return saved ? JSON.parse(saved) : { current: 500, target: 1000 };
  });
  
  const [smsDetectionEnabled, setSmsDetectionEnabled] = useState(() => {
    const saved = localStorage.getItem("smsDetectionEnabled");
    return saved ? JSON.parse(saved) : true;
  });

  // Calculate balances
  const balance = {
    total: 5000, // Simulated total balance
    available: 3500,
    invested: stocks.reduce((total, stock) => total + (stock.price * stock.quantity), 0)
  };

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("stocks", JSON.stringify(stocks));
    localStorage.setItem("emergencyFund", JSON.stringify(emergencyFund));
    localStorage.setItem("smsDetectionEnabled", JSON.stringify(smsDetectionEnabled));
  }, [transactions, stocks, emergencyFund, smsDetectionEnabled]);

  // Add a new transaction
  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString()
    };
    setTransactions([newTransaction, ...transactions]);
  };

  // Update emergency fund target
  const updateEmergencyTarget = (target: number) => {
    setEmergencyFund({ ...emergencyFund, target });
  };

  // Buy a stock
  const buyStock = (stockData: Omit<Stock, "id" | "quantity">, quantity: number) => {
    // Check if we already own this stock
    const existingStockIndex = stocks.findIndex(s => s.symbol === stockData.symbol);
    
    if (existingStockIndex !== -1) {
      // Update existing stock
      const updatedStocks = [...stocks];
      updatedStocks[existingStockIndex].quantity += quantity;
      setStocks(updatedStocks);
    } else {
      // Add new stock
      const newStock = {
        ...stockData,
        id: Date.now().toString(),
        quantity
      };
      setStocks([...stocks, newStock]);
    }
  };

  // Sell a stock
  const sellStock = (stockId: string, quantity: number) => {
    const stockIndex = stocks.findIndex(s => s.id === stockId);
    if (stockIndex === -1) return;
    
    const updatedStocks = [...stocks];
    const currentQuantity = updatedStocks[stockIndex].quantity;
    
    if (currentQuantity <= quantity) {
      // Remove the stock if selling all or more than owned
      setStocks(stocks.filter(s => s.id !== stockId));
    } else {
      // Reduce the quantity
      updatedStocks[stockIndex].quantity -= quantity;
      setStocks(updatedStocks);
    }
  };

  // Toggle SMS detection
  const toggleSmsDetection = () => {
    setSmsDetectionEnabled(!smsDetectionEnabled);
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        stocks,
        emergencyFund,
        balance,
        addTransaction,
        updateEmergencyTarget,
        buyStock,
        sellStock,
        smsDetectionEnabled,
        toggleSmsDetection
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
}
