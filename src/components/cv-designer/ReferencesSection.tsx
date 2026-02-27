'use client';

import { useCVStore, generateId } from '@/store/cv-store';
import { countryConfigs, Reference } from '@/types/cv';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Users, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

function ReferenceItem({ ref: r, onUpdate, onRemove }: { ref: Reference; onUpdate: (id: string, data: Partial<Reference>) => void; onRemove: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-lg bg-card">
      <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2">
          {open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronUp className="h-4 w-4 text-muted-foreground" />}
          <span className="font-medium">{r.name || 'Nouvelle référence'}{r.position && ` - ${r.position}`}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onRemove(r.id); }} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
      </div>
      {open && (
        <div className="p-4 pt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Nom *</Label><Input value={r.name} onChange={(e) => onUpdate(r.id, { name: e.target.value })} placeholder="Marie Martin" /></div>
            <div className="space-y-2"><Label>Poste *</Label><Input value={r.position} onChange={(e) => onUpdate(r.id, { position: e.target.value })} placeholder="Directrice RH" /></div>
          </div>
          <div className="space-y-2"><Label>Entreprise</Label><Input value={r.company} onChange={(e) => onUpdate(r.id, { company: e.target.value })} placeholder="Entreprise ABC" /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Email</Label><Input type="email" value={r.email} onChange={(e) => onUpdate(r.id, { email: e.target.value })} placeholder="marie@entreprise.com" /></div>
            <div className="space-y-2"><Label>Téléphone</Label><Input value={r.phone} onChange={(e) => onUpdate(r.id, { phone: e.target.value })} placeholder="+33 6 12 34 56 78" /></div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ReferencesSection() {
  const { selectedCountry, references, addReference, updateReference, removeReference } = useCVStore();
  const config = countryConfigs[selectedCountry];
  if (!config.includeReferences) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Références</CardTitle>
        <CardDescription>Personnes pouvant recommander votre candidature</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {references.length === 0 && <p className="text-sm text-muted-foreground">Vous pouvez ajouter des références ou mentionner "Disponible sur demande".</p>}
        {references.map((r) => <ReferenceItem key={r.id} ref={r} onUpdate={updateReference} onRemove={removeReference} />)}
        <Button variant="outline" onClick={() => addReference({ id: generateId(), name: '', position: '', company: '', email: '', phone: '' })} className="w-full"><Plus className="h-4 w-4 mr-2" /> Ajouter une référence</Button>
      </CardContent>
    </Card>
  );
}
