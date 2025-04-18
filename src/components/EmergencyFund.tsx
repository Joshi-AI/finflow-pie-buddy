
import React from 'react';
import { Shield, IndianRupee } from 'lucide-react';
import { useFinance } from '@/context/FinanceContext';
import { Progress } from '@/components/ui/progress';

export function EmergencyFund() {
  const { emergencyFund } = useFinance();
  
  const percentage = Math.min(
    Math.round((emergencyFund.current / emergencyFund.target) * 100),
    100
  );

  return (
    <div className="p-4 bg-card rounded-lg border border-border">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="text-primary w-5 h-5" />
        <h3 className="text-lg font-semibold">Emergency Fund</h3>
      </div>
      
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">Current</span>
        <span className="font-medium flex items-center gap-1">
          <IndianRupee className="w-4 h-4" />
          {emergencyFund.current.toFixed(2)}
        </span>
      </div>
      
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-muted-foreground">Target</span>
        <span className="font-medium flex items-center gap-1">
          <IndianRupee className="w-4 h-4" />
          {emergencyFund.target.toFixed(2)}
        </span>
      </div>
      
      <Progress value={percentage} className="h-2" />
      
      <div className="flex justify-end mt-2">
        <span className="text-sm font-medium">{percentage}% of goal</span>
      </div>
    </div>
  );
}
