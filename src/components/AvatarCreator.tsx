
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface AvatarOption {
  id: string;
  type: 'hairStyle' | 'faceShape' | 'eyeColor' | 'skinTone' | 'accessory';
  image: string;
  name: string;
}

export function AvatarCreator() {
  // Avatar customization options
  const hairStyles: AvatarOption[] = [
    { id: 'h1', type: 'hairStyle', image: '👱', name: 'Blonde' },
    { id: 'h2', type: 'hairStyle', image: '🧔', name: 'Beard' },
    { id: 'h3', type: 'hairStyle', image: '👨‍🦰', name: 'Red' },
    { id: 'h4', type: 'hairStyle', image: '👨‍🦱', name: 'Curly' },
    { id: 'h5', type: 'hairStyle', image: '👩‍🦳', name: 'White' },
    { id: 'h6', type: 'hairStyle', image: '👩‍🦲', name: 'Bald' },
  ];

  const faceShapes: AvatarOption[] = [
    { id: 'f1', type: 'faceShape', image: '😊', name: 'Smiling' },
    { id: 'f2', type: 'faceShape', image: '😐', name: 'Neutral' },
    { id: 'f3', type: 'faceShape', image: '🙂', name: 'Slight Smile' },
    { id: 'f4', type: 'faceShape', image: '😎', name: 'Cool' },
    { id: 'f5', type: 'faceShape', image: '🤔', name: 'Thinking' },
    { id: 'f6', type: 'faceShape', image: '😌', name: 'Relieved' },
  ];

  const accessories: AvatarOption[] = [
    { id: 'a1', type: 'accessory', image: '🧢', name: 'Cap' },
    { id: 'a2', type: 'accessory', image: '👓', name: 'Glasses' },
    { id: 'a3', type: 'accessory', image: '🎩', name: 'Top Hat' },
    { id: 'a4', type: 'accessory', image: '👑', name: 'Crown' },
    { id: 'a5', type: 'accessory', image: '🎭', name: 'Mask' },
    { id: 'a6', type: 'accessory', image: '🎧', name: 'Headphones' },
  ];

  // State for selected avatar options
  const [selectedOptions, setSelectedOptions] = useState({
    hairStyle: hairStyles[0],
    faceShape: faceShapes[0],
    accessory: null as AvatarOption | null,
  });

  // Handle option selection
  const handleSelectOption = (option: AvatarOption) => {
    setSelectedOptions({
      ...selectedOptions,
      [option.type]: option,
    });
  };

  // Get current avatar display based on selections
  const getCurrentAvatar = () => {
    return selectedOptions.faceShape?.image || '👤';
  };

  const getAvatarDisplayName = () => {
    const hairstyle = selectedOptions.hairStyle?.name || 'Default';
    const face = selectedOptions.faceShape?.name || 'Default';
    const accessory = selectedOptions.accessory?.name ? ` with ${selectedOptions.accessory?.name}` : '';
    
    return `${hairstyle} ${face}${accessory}`;
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="flex flex-col items-center justify-center mb-6">
        <Avatar className="w-24 h-24 border-4 border-primary mb-2">
          <AvatarFallback className="text-4xl">
            {getCurrentAvatar()}
          </AvatarFallback>
        </Avatar>
        <p className="text-center text-lg font-medium">{getAvatarDisplayName()}</p>
      </div>

      <Tabs defaultValue="hairStyle" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="hairStyle">Hair Style</TabsTrigger>
          <TabsTrigger value="faceShape">Face</TabsTrigger>
          <TabsTrigger value="accessory">Accessories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hairStyle" className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {hairStyles.map((option) => (
              <div 
                key={option.id}
                className={`relative p-4 border rounded-lg cursor-pointer flex flex-col items-center ${
                  selectedOptions.hairStyle?.id === option.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleSelectOption(option)}
              >
                <span className="text-3xl mb-1">{option.image}</span>
                <span className="text-xs text-center">{option.name}</span>
                {selectedOptions.hairStyle?.id === option.id && (
                  <Check className="absolute top-1 right-1 w-4 h-4 text-primary" />
                )}
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="faceShape" className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {faceShapes.map((option) => (
              <div 
                key={option.id}
                className={`relative p-4 border rounded-lg cursor-pointer flex flex-col items-center ${
                  selectedOptions.faceShape?.id === option.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleSelectOption(option)}
              >
                <span className="text-3xl mb-1">{option.image}</span>
                <span className="text-xs text-center">{option.name}</span>
                {selectedOptions.faceShape?.id === option.id && (
                  <Check className="absolute top-1 right-1 w-4 h-4 text-primary" />
                )}
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="accessory" className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {accessories.map((option) => (
              <div 
                key={option.id}
                className={`relative p-4 border rounded-lg cursor-pointer flex flex-col items-center ${
                  selectedOptions.accessory?.id === option.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleSelectOption(option)}
              >
                <span className="text-3xl mb-1">{option.image}</span>
                <span className="text-xs text-center">{option.name}</span>
                {selectedOptions.accessory?.id === option.id && (
                  <Check className="absolute top-1 right-1 w-4 h-4 text-primary" />
                )}
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setSelectedOptions({...selectedOptions, accessory: null})}
          >
            Remove Accessory
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
