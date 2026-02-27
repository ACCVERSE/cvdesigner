'use client';

import { useCVStore, generateId } from '@/store/cv-store';
import { Language, languageLevels } from '@/types/cv';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Languages, Plus, X } from 'lucide-react';
import { useState } from 'react';

export function LanguagesSection() {
  const { languages, addLanguage, removeLanguage } = useCVStore();
  const [newLang, setNewLang] = useState('');
  const [newLevel, setNewLevel] = useState<Language['level']>('intermediate');

  const getLevelColor = (level: Language['level']) => {
    const colors = { native: 'bg-purple-100 text-purple-800', fluent: 'bg-green-100 text-green-800', advanced: 'bg-blue-100 text-blue-800', intermediate: 'bg-yellow-100 text-yellow-800', basic: 'bg-gray-100 text-gray-800' };
    return colors[level];
  };

  const suggestions = ['Français', 'Anglais', 'Espagnol', 'Allemand', 'Italien', 'Portugais'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Languages className="h-5 w-5" /> Langues</CardTitle>
        <CardDescription>Vos compétences linguistiques</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {languages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <Badge key={lang.id} variant="secondary" className={`${getLevelColor(lang.level)} px-3 py-1 flex items-center gap-2`}>
                {lang.name} <span className="text-xs opacity-75">({languageLevels.find(l => l.value === lang.level)?.label})</span>
                <button onClick={() => removeLanguage(lang.id)} className="ml-1 hover:text-destructive"><X className="h-3 w-3" /></button>
              </Badge>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Input value={newLang} onChange={(e) => setNewLang(e.target.value)} placeholder="Ex: Anglais..." list="lang-suggestions" className="flex-1" />
          <datalist id="lang-suggestions">{suggestions.map((s) => <option key={s} value={s} />)}</datalist>
          <Select value={newLevel} onValueChange={(v) => setNewLevel(v as Language['level'])}><SelectTrigger className="w-48"><SelectValue /></SelectTrigger><SelectContent>{languageLevels.map((l) => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}</SelectContent></Select>
          <Button onClick={() => { if (newLang.trim()) { addLanguage({ id: generateId(), name: newLang.trim(), level: newLevel }); setNewLang(''); } }} disabled={!newLang.trim()}><Plus className="h-4 w-4 mr-2" /> Ajouter</Button>
        </div>
      </CardContent>
    </Card>
  );
}
