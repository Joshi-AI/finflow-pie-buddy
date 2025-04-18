
import React, { useState } from 'react';
import { User, Mail, Phone, CreditCard, Link as LinkIcon } from 'lucide-react';
import { AvatarCreator } from '@/components/AvatarCreator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    age: '28',
  });
  
  const [linkedAccounts, setLinkedAccounts] = useState([
    { id: 1, name: 'Bank Account', isLinked: true },
    { id: 2, name: 'Google Account', isLinked: false },
  ]);

  const handleProfileChange = (key: string, value: string) => {
    setProfileData({
      ...profileData,
      [key]: value,
    });
  };

  const toggleAccountLink = (id: number) => {
    setLinkedAccounts(
      linkedAccounts.map((account) =>
        account.id === id ? { ...account, isLinked: !account.isLinked } : account
      )
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
        </CardHeader>
        <CardContent>
          <AvatarCreator />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-muted-foreground" />
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-muted-foreground" />
              <Input
                id="age"
                type="number"
                value={profileData.age}
                onChange={(e) => handleProfileChange('age', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Linked Accounts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {linkedAccounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {account.name.includes('Bank') ? (
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <LinkIcon className="w-5 h-5 text-muted-foreground" />
                )}
                <span>{account.name}</span>
              </div>
              <Button
                variant={account.isLinked ? "default" : "outline"}
                size="sm"
                onClick={() => toggleAccountLink(account.id)}
              >
                {account.isLinked ? 'Unlink' : 'Link'}
              </Button>
            </div>
          ))}
          
          <Button variant="outline" className="w-full mt-2">
            <LinkIcon className="w-4 h-4 mr-2" />
            Add New Account
          </Button>
        </CardContent>
      </Card>
      
      <Button className="w-full">Save Changes</Button>
    </div>
  );
}
