'use client';

import { useCVStore } from '@/store/cv-store';
import { countryConfigs, CountryCode } from '@/types/cv';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Globe, AlertTriangle, Lightbulb } from 'lucide-react';

export function CountrySelector() {
  const { selectedCountry, setCountry } = useCVStore();
  const config = countryConfigs[selectedCountry];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5" /> Pays cible du CV</CardTitle>
        <CardDescription>Les formats varient selon les pays</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {(Object.keys(countryConfigs) as CountryCode[]).map((code) => {
            const country = countryConfigs[code];
            return (
              <button key={code} onClick={() => setCountry(code)}
                className={`p-4 rounded-lg border-2 transition-all hover:border-primary/50 ${selectedCountry === code ? 'border-primary bg-primary/5 shadow-md' : 'border-muted hover:bg-muted/50'}`}>
                <div className="text-3xl mb-2">{country.flag}</div>
                <div className="text-sm font-medium">{country.name}</div>
              </button>
            );
          })}
        </div>
        {config.warnings.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-semibold mb-1">Attention !</div>
              <ul className="list-disc list-inside text-sm space-y-1">{config.warnings.map((w, i) => <li key={i}>{w}</li>)}</ul>
            </AlertDescription>
          </Alert>
        )}
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertDescription>
            <div className="font-semibold mb-1">Conseils pour {config.name}</div>
            <ul className="list-disc list-inside text-sm space-y-1">{config.tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </AlertDescription>
        </Alert>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{config.maxPages} page{config.maxPages > 1 ? 's' : ''} max</Badge>
          {config.allowPhoto ? <Badge variant="secondary">{config.photoRequired ? '📸 Photo requise' : '📸 Photo optionnelle'}</Badge> : <Badge variant="destructive">🚫 Pas de photo</Badge>}
        </div>
      </CardContent>
    </Card>
  );
}
