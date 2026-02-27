'use client';

import { useCVStore } from '@/store/cv-store';
import { countryConfigs } from '@/types/cv';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Target } from 'lucide-react';

export function ObjectiveSection() {
  const { selectedCountry, objective, setObjective } = useCVStore();
  const config = countryConfigs[selectedCountry];
  if (!config.includeObjective) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5" /> {selectedCountry === 'uk' ? 'Personal Statement' : 'Objectif professionnel'}</CardTitle>
        <CardDescription>Décrivez brièvement vos objectifs</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea value={objective} onChange={(e) => setObjective(e.target.value)} placeholder="Professionnel motivé avec 5 ans d'expérience..." rows={4} maxLength={300} />
        <p className="text-xs text-muted-foreground mt-2">{objective.length}/300 caractères</p>
      </CardContent>
    </Card>
  );
}
