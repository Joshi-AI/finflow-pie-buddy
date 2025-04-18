
import React, { useState } from 'react';
import { MessageSquare, Moon, Sun, ShieldAlert } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { smsDetectionEnabled, toggleSmsDetection, emergencyFund, updateEmergencyTarget } = useFinance();
  
  const [emergencyTarget, setEmergencyTarget] = useState(emergencyFund.target);
  const [monthlyContribution, setMonthlyContribution] = useState(100);

  const handleUpdateEmergencyFund = () => {
    updateEmergencyTarget(emergencyTarget);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>App Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Theme</Label>
              <CardDescription>Switch between light and dark mode</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">SMS Transaction Detection</Label>
              <CardDescription>Automatically detect transactions from SMS</CardDescription>
            </div>
            <Switch 
              checked={smsDetectionEnabled} 
              onCheckedChange={toggleSmsDetection}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Emergency Fund</CardTitle>
          <CardDescription>Manage your emergency fund settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emergencyTarget">Target Amount ($)</Label>
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-muted-foreground" />
              <Input
                id="emergencyTarget"
                type="number"
                value={emergencyTarget}
                onChange={(e) => setEmergencyTarget(Number(e.target.value))}
                step="100"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Monthly Contribution: ${monthlyContribution}</Label>
            </div>
            <Slider
              value={[monthlyContribution]}
              min={10}
              max={1000}
              step={10}
              onValueChange={(value) => setMonthlyContribution(value[0])}
            />
            <p className="text-sm text-muted-foreground">
              This amount will be added to your emergency fund every month
            </p>
          </div>
          
          <Button onClick={handleUpdateEmergencyFund} className="w-full">
            Save Emergency Fund Settings
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Transaction Alerts</Label>
              <CardDescription>Get notified about new transactions</CardDescription>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Investment Updates</Label>
              <CardDescription>Receive updates about your investments</CardDescription>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Emergency Fund Milestones</Label>
              <CardDescription>Get notified when you reach fund milestones</CardDescription>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label className="text-base">Allow SMS Reading</Label>
                <CardDescription>Permission to read SMS for transaction detection</CardDescription>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
