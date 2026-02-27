'use client';

import { useCVStore, generateId } from '@/store/cv-store';
import { Experience } from '@/types/cv';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Briefcase, Plus, Trash2, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ exp, onUpdate, onRemove }: { exp: Experience; onUpdate: (id: string, data: Partial<Experience>) => void; onRemove: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: exp.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  return (
    <div ref={setNodeRef} style={style} className="border rounded-lg p-4 space-y-4 bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button {...attributes} {...listeners} className="cursor-grab"><GripVertical className="h-5 w-5 text-muted-foreground" /></button>
          <span className="font-medium">{exp.jobTitle || 'Nouvelle expérience'}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onRemove(exp.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2"><Label>Poste *</Label><Input value={exp.jobTitle} onChange={(e) => onUpdate(exp.id, { jobTitle: e.target.value })} placeholder="Développeur" /></div>
        <div className="space-y-2"><Label>Entreprise *</Label><Input value={exp.company} onChange={(e) => onUpdate(exp.id, { company: e.target.value })} placeholder="Google" /></div>
      </div>
      <div className="space-y-2"><Label>Lieu</Label><Input value={exp.location} onChange={(e) => onUpdate(exp.id, { location: e.target.value })} placeholder="Paris" /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2"><Label>Début</Label><Input type="month" value={exp.startDate} onChange={(e) => onUpdate(exp.id, { startDate: e.target.value })} /></div>
        <div className="space-y-2"><Label>Fin</Label><Input type="month" value={exp.endDate} onChange={(e) => onUpdate(exp.id, { endDate: e.target.value })} disabled={exp.current} /></div>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id={`current-${exp.id}`} checked={exp.current} onCheckedChange={(c) => onUpdate(exp.id, { current: c as boolean, endDate: c ? '' : exp.endDate })} />
        <Label htmlFor={`current-${exp.id}`} className="font-normal">Poste actuel</Label>
      </div>
      <div className="space-y-2"><Label>Description</Label><Textarea value={exp.description} onChange={(e) => onUpdate(exp.id, { description: e.target.value })} placeholder="Responsabilités..." rows={3} /></div>
    </div>
  );
}

export function ExperienceSection() {
  const { experiences, addExperience, updateExperience, removeExperience, reorderExperiences } = useCVStore();
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = experiences.findIndex((e) => e.id === active.id);
      const newIndex = experiences.findIndex((e) => e.id === over.id);
      reorderExperiences(arrayMove(experiences, oldIndex, newIndex));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5" /> Expériences professionnelles</CardTitle>
        <CardDescription>De la plus récente à la plus ancienne</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {experiences.length > 0 && (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={experiences.map((e) => e.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">{experiences.map((exp) => <SortableItem key={exp.id} exp={exp} onUpdate={updateExperience} onRemove={removeExperience} />)}</div>
            </SortableContext>
          </DndContext>
        )}
        <Button variant="outline" onClick={() => addExperience({ id: generateId(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' })} className="w-full"><Plus className="h-4 w-4 mr-2" /> Ajouter une expérience</Button>
      </CardContent>
    </Card>
  );
}
