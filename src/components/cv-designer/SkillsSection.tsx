'use client';

import { useCVStore, generateId } from '@/store/cv-store';
import { Skill, skillLevels } from '@/types/cv';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Plus, X } from 'lucide-react';
import { useState } from 'react';

export function SkillsSection() {
  const { skills, addSkill, removeSkill } = useCVStore();
  const [newSkill, setNewSkill] = useState('');
  const [newLevel, setNewLevel] = useState<Skill['level']>('intermediate');

  const getLevelColor = (level: Skill['level']) => {
    const colors = { expert: 'bg-green-100 text-green-800', advanced: 'bg-blue-100 text-blue-800', intermediate: 'bg-yellow-100 text-yellow-800', beginner: 'bg-gray-100 text-gray-800' };
    return colors[level];
  };

  const suggestions = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Excel', 'Communication', 'Gestion de projet'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5" /> Compétences</CardTitle>
        <CardDescription>Vos compétences techniques et transversales</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill.id} variant="secondary" className={`${getLevelColor(skill.level)} px-3 py-1 flex items-center gap-2`}>
                {skill.name} <span className="text-xs opacity-75">({skillLevels.find(l => l.value === skill.level)?.label})</span>
                <button onClick={() => removeSkill(skill.id)} className="ml-1 hover:text-destructive"><X className="h-3 w-3" /></button>
              </Badge>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Ex: JavaScript..." list="skill-suggestions" className="flex-1" />
          <datalist id="skill-suggestions">{suggestions.map((s) => <option key={s} value={s} />)}</datalist>
          <Select value={newLevel} onValueChange={(v) => setNewLevel(v as Skill['level'])}><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent>{skillLevels.map((l) => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}</SelectContent></Select>
          <Button onClick={() => { if (newSkill.trim()) { addSkill({ id: generateId(), name: newSkill.trim(), level: newLevel }); setNewSkill(''); } }} disabled={!newSkill.trim()}><Plus className="h-4 w-4 mr-2" /> Ajouter</Button>
        </div>
      </CardContent>
    </Card>
  );
}
