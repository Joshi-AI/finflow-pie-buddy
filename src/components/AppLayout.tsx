
import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNavigation } from './BottomNavigation';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-1 container mx-auto p-4 pb-20">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
}
