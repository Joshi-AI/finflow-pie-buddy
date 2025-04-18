
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Settings, PieChart, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomNavigation() {
  const location = useLocation();
  
  const navItems = [
    {
      name: 'Profile',
      path: '/profile',
      icon: <User />,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings />,
    },
    {
      name: 'Funds',
      path: '/funds',
      icon: <PieChart />,
    },
    {
      name: 'Investments',
      path: '/investments',
      icon: <TrendingUp />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border h-16 flex items-center justify-around">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            location.pathname === item.path
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground transition-colors"
          )}
        >
          <div className="w-6 h-6">{item.icon}</div>
          <span className="text-xs mt-1">{item.name}</span>
        </Link>
      ))}
    </div>
  );
}
