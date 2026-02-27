'use client';

import { useCVStore, generateId } from '@/store/cv-store';
import { Education } from '@/types/cv';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { GraduationCap, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

function EducationItem({ edu, onUpdate, onRemove }: { edu: Education; onUpdate: (id: string, data: Partial<Education>) => void; onRemove: (id: string) => void }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border rounded-lg bg-card">
      <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2">
          {open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronUp className="h-4 w-4 text-muted-foreground" />}
          <span className="font-medium">{edu.degree || 'Nouvelle formation'}{edu.institution && ` - ${edu.institution}`}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onRemove(edu.id); }} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
      </div>
      {open && (
        <div className="p-4 pt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Diplôme *</Label><Input value={edu.degree} onChange={(e) => onUpdate(edu.id, { degree: e.target.value })} placeholder="Master Informatique" /></div>
            <div className="space-y-2"><Label>Domaine</Label><Input value={edu.field} onChange={(e) => onUpdate(edu.id, { field: e.target.value })} placeholder="Développement" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Établissement *</Label><Input value={edu.institution} onChange={(e) => onUpdate(edu.id, { institution: e.target.value })} placeholder="Université Paris" /></div>
            <div className="space-y-2"><Label>Lieu</Label><Input value={edu.location} onChange={(e) => onUpdate(edu.id, { location: e.target.value })} placeholder="Paris" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Début</Label><Input type="month" value={edu.startDate} onChange={(e) => onUpdate(edu.id, { startDate: e.target.value })} /></div>
            <div className="space-y-2"><Label>Fin</Label><Input type="month" value={edu.endDate} onChange={(e) => onUpdate(edu.id, { endDate: e.target.value })} /></div>
          </div>
          <div className="space-y-2"><Label>Description</Label><Textarea value={edu.description} onChange={(e) => onUpdate(edu.id, { description: e.target.value })} rows={2} /></div>
        </div>
      )}
    </div>
  );
}

export function EducationSection() {
  const { education, addEducation, updateEducation, removeEducation } = useCVStore();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5" /> Formation</CardTitle>
        <CardDescription>Vos diplômes et formations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {education.map((edu) => <EducationItem key={edu.id} edu={edu} onUpdate={updateEducation} onRemove={removeEducation} />)}
        <Button variant="outline" onClick={() => addEducation({ id: generateId(), degree: '', field: '', institution: '', location: '', startDate: '', endDate: '', description: '' })} className="w-full"><Plus className="h-4 w-4 mr-2" /> Ajouter une formation</Button>
      </CardContent>
    </Card>
  );
}
