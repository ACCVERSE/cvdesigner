'use client';

import { useCVStore } from '@/store/cv-store';
import { colorOptions } from '@/types/cv';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Palette, Layout } from 'lucide-react';

const templates = [
  { id: 'classic', name: 'Classique', description: 'Design traditionnel' },
  { id: 'modern', name: 'Moderne', description: 'Style contemporain avec sidebar' },
  { id: 'minimal', name: 'Minimaliste', description: 'Simple et efficace' },
];

export function StyleOptions() {
  const { selectedTemplate, selectedColor, setTemplate, setColor } = useCVStore();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5" /> Style du CV</CardTitle>
        <CardDescription>Personnalisez l'apparence</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="flex items-center gap-2"><Layout className="h-4 w-4" /> Modèle</Label>
          <div className="grid grid-cols-3 gap-3">
            {templates.map((t) => (
              <button key={t.id} onClick={() => setTemplate(t.id as 'classic' | 'modern' | 'creative' | 'minimal')}
                className={`p-3 rounded-lg border-2 text-left transition-all hover:border-primary/50 ${selectedTemplate === t.id ? 'border-primary bg-primary/5' : 'border-muted'}`}>
                <div className="font-medium text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.description}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <Label>Couleur principale</Label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((c) => (
              <button key={c.value} onClick={() => setColor(c.value)}
                className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${selectedColor === c.value ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                style={{ backgroundColor: c.value }} title={c.name} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
