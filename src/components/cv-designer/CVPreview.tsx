'use client';

import { useCVStore } from '@/store/cv-store';
import { countryConfigs, skillLevels, languageLevels } from '@/types/cv';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { useState, forwardRef } from 'react';

const formatDate = (d: string) => { if (!d) return ''; const date = new Date(d + '-01'); return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }); };
const getSkillLabel = (l: string) => skillLevels.find((x) => x.value === l)?.label || l;
const getLangLabel = (l: string) => languageLevels.find((x) => x.value === l)?.label || l;

interface Props { printRef?: React.RefObject<HTMLDivElement | null>; }

export const CVPreview = forwardRef<HTMLDivElement | null, Props>(({ printRef }, _ref) => {
  const { selectedCountry, selectedTemplate, selectedColor, personalInfo, objective, experiences, education, skills, languages, references } = useCVStore();
  const [zoom, setZoom] = useState(80);
  const config = countryConfigs[selectedCountry];

  const renderClassic = () => (
    <div className="bg-white p-8 min-h-[297mm] w-[210mm] text-black" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="text-center mb-6 pb-4 border-b-2" style={{ borderColor: selectedColor }}>
        {config.allowPhoto && personalInfo.photo && <div className="mb-4 flex justify-center"><img src={personalInfo.photo} alt="Photo" className="w-24 h-24 rounded-full object-cover border-2" style={{ borderColor: selectedColor }} /></div>}
        <h1 className="text-3xl font-bold mb-1">{personalInfo.firstName} {personalInfo.lastName}</h1>
        <div className="text-sm text-gray-600 space-x-4">{personalInfo.email && <span>{personalInfo.email}</span>}{personalInfo.phone && <span>• {personalInfo.phone}</span>}{personalInfo.city && <span>• {personalInfo.city}</span>}</div>
      </div>
      {config.includeObjective && objective && <div className="mb-4"><h2 className="text-lg font-bold mb-2" style={{ color: selectedColor }}>{selectedCountry === 'uk' ? 'Personal Statement' : 'Objectif professionnel'}</h2><p className="text-sm text-gray-700">{objective}</p></div>}
      {experiences.length > 0 && <div className="mb-4"><h2 className="text-lg font-bold mb-2 pb-1 border-b" style={{ color: selectedColor, borderColor: selectedColor }}>Expérience professionnelle</h2>{experiences.map((exp) => <div key={exp.id} className="mb-3"><div className="flex justify-between items-start"><div><strong>{exp.jobTitle}</strong>{exp.company && <span className="text-gray-600"> — {exp.company}</span>}</div><span className="text-sm text-gray-500">{formatDate(exp.startDate)} — {exp.current ? 'Présent' : formatDate(exp.endDate)}</span></div>{exp.description && <p className="text-sm mt-1 text-gray-700">{exp.description}</p>}</div>)}</div>}
      {education.length > 0 && <div className="mb-4"><h2 className="text-lg font-bold mb-2 pb-1 border-b" style={{ color: selectedColor, borderColor: selectedColor }}>Formation</h2>{education.map((edu) => <div key={edu.id} className="mb-2"><div className="flex justify-between items-start"><div><strong>{edu.degree}</strong>{edu.field && <span className="text-gray-600"> — {edu.field}</span>}</div><span className="text-sm text-gray-500">{formatDate(edu.startDate)} — {formatDate(edu.endDate)}</span></div>{edu.institution && <div className="text-sm text-gray-600">{edu.institution}</div>}</div>)}</div>}
      {skills.length > 0 && <div className="mb-4"><h2 className="text-lg font-bold mb-2 pb-1 border-b" style={{ color: selectedColor, borderColor: selectedColor }}>Compétences</h2><div className="flex flex-wrap gap-2">{skills.map((s) => <span key={s.id} className="text-sm px-2 py-1 bg-gray-100 rounded">{s.name} <span className="text-gray-500">({getSkillLabel(s.level)})</span></span>)}</div></div>}
      {languages.length > 0 && <div className="mb-4"><h2 className="text-lg font-bold mb-2 pb-1 border-b" style={{ color: selectedColor, borderColor: selectedColor }}>Langues</h2><div className="flex flex-wrap gap-2">{languages.map((l) => <span key={l.id} className="text-sm"><strong>{l.name}</strong> — {getLangLabel(l.level)}</span>)}</div></div>}
      {config.includeReferences && references.length > 0 && <div className="mb-4"><h2 className="text-lg font-bold mb-2 pb-1 border-b" style={{ color: selectedColor, borderColor: selectedColor }}>Références</h2><div className="grid grid-cols-2 gap-4">{references.map((r) => <div key={r.id} className="text-sm"><strong>{r.name}</strong>{r.position && <div className="text-gray-600">{r.position}</div>}{r.email && <div className="text-gray-500">{r.email}</div>}</div>)}</div></div>}
    </div>
  );

  const renderModern = () => (
    <div className="bg-white min-h-[297mm] w-[210mm] text-black flex" style={{ fontFamily: 'system-ui, sans-serif' }}>
      <div className="w-1/3 p-6 text-white" style={{ backgroundColor: selectedColor }}>
        {config.allowPhoto && personalInfo.photo && <div className="mb-6 flex justify-center"><img src={personalInfo.photo} alt="Photo" className="w-32 h-32 rounded-full object-cover border-4 border-white/30" /></div>}
        <div className="mb-6"><h1 className="text-xl font-bold mb-2">{personalInfo.firstName}<br />{personalInfo.lastName}</h1></div>
        <div className="mb-6 space-y-2 text-sm"><h2 className="font-bold text-white/80 uppercase text-xs tracking-wider mb-2">Contact</h2>{personalInfo.email && <p>{personalInfo.email}</p>}{personalInfo.phone && <p>{personalInfo.phone}</p>}{personalInfo.city && <p>{personalInfo.city}</p>}</div>
        {skills.length > 0 && <div className="mb-6"><h2 className="font-bold text-white/80 uppercase text-xs tracking-wider mb-2">Compétences</h2><div className="space-y-2">{skills.map((s) => <div key={s.id}><div className="flex justify-between text-sm mb-1"><span>{s.name}</span></div><div className="h-1 bg-white/30 rounded-full"><div className="h-full bg-white rounded-full" style={{ width: `${(skillLevels.findIndex(l => l.value === s.level) + 1) * 25}%` }} /></div></div>)}</div></div>}
        {languages.length > 0 && <div className="mb-6"><h2 className="font-bold text-white/80 uppercase text-xs tracking-wider mb-2">Langues</h2><div className="space-y-1">{languages.map((l) => <div key={l.id} className="flex justify-between text-sm"><span>{l.name}</span><span className="text-white/70">{getLangLabel(l.level)}</span></div>)}</div></div>}
      </div>
      <div className="w-2/3 p-6">
        {config.includeObjective && objective && <div className="mb-6"><h2 className="text-lg font-bold mb-2 pb-1 border-b-2" style={{ borderColor: selectedColor }}>{selectedCountry === 'uk' ? 'Personal Statement' : 'Objectif professionnel'}</h2><p className="text-sm text-gray-700">{objective}</p></div>}
        {experiences.length > 0 && <div className="mb-6"><h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: selectedColor }}>Expérience professionnelle</h2>{experiences.map((exp) => <div key={exp.id} className="mb-4"><div className="flex justify-between items-start"><div><h3 className="font-bold" style={{ color: selectedColor }}>{exp.jobTitle}</h3><p className="text-sm text-gray-600">{exp.company}</p></div><span className="text-sm text-gray-500">{formatDate(exp.startDate)} — {exp.current ? 'Présent' : formatDate(exp.endDate)}</span></div>{exp.description && <p className="text-sm mt-2 text-gray-700">{exp.description}</p>}</div>)}</div>}
        {education.length > 0 && <div className="mb-6"><h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: selectedColor }}>Formation</h2>{education.map((edu) => <div key={edu.id} className="mb-3"><div className="flex justify-between items-start"><div><h3 className="font-bold" style={{ color: selectedColor }}>{edu.degree}</h3><p className="text-sm text-gray-600">{edu.institution}</p></div><span className="text-sm text-gray-500">{formatDate(edu.startDate)} — {formatDate(edu.endDate)}</span></div></div>)}</div>}
      </div>
    </div>
  );

  const renderMinimal = () => (
    <div className="bg-white p-8 min-h-[297mm] w-[210mm] text-black" style={{ fontFamily: 'system-ui, sans-serif' }}>
      <div className="mb-8"><h1 className="text-4xl font-light mb-2">{personalInfo.firstName} {personalInfo.lastName}</h1><div className="text-sm text-gray-500 space-x-3">{personalInfo.email && <span>{personalInfo.email}</span>}{personalInfo.phone && <span>| {personalInfo.phone}</span>}{personalInfo.city && <span>| {personalInfo.city}</span>}</div></div>
      {config.includeObjective && objective && <div className="mb-6"><p className="text-gray-600 italic border-l-2 pl-4" style={{ borderColor: selectedColor }}>{objective}</p></div>}
      {experiences.length > 0 && <div className="mb-6"><h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: selectedColor }}>Expérience</h2>{experiences.map((exp) => <div key={exp.id} className="mb-3 pl-4 border-l border-gray-200"><div className="flex justify-between"><span className="font-medium">{exp.jobTitle}</span><span className="text-xs text-gray-400">{formatDate(exp.startDate)} — {exp.current ? 'Présent' : formatDate(exp.endDate)}</span></div><p className="text-sm text-gray-500">{exp.company}</p>{exp.description && <p className="text-sm text-gray-600 mt-1">{exp.description}</p>}</div>)}</div>}
      {education.length > 0 && <div className="mb-6"><h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: selectedColor }}>Formation</h2>{education.map((edu) => <div key={edu.id} className="mb-2 pl-4 border-l border-gray-200"><div className="flex justify-between"><span className="font-medium">{edu.degree}</span><span className="text-xs text-gray-400">{formatDate(edu.endDate)}</span></div><p className="text-sm text-gray-500">{edu.institution}</p></div>)}</div>}
      {skills.length > 0 && <div className="mb-6"><h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: selectedColor }}>Compétences</h2><p className="text-sm text-gray-600">{skills.map((s) => s.name).join(' • ')}</p></div>}
      {languages.length > 0 && <div className="mb-6"><h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: selectedColor }}>Langues</h2><p className="text-sm text-gray-600">{languages.map((l) => `${l.name} (${getLangLabel(l.level)})`).join(' • ')}</p></div>}
    </div>
  );

  const render = () => { if (selectedTemplate === 'modern') return renderModern(); if (selectedTemplate === 'minimal') return renderMinimal(); return renderClassic(); };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 p-2 bg-muted rounded-lg">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(40, zoom - 10))}><ZoomOut className="h-4 w-4" /></Button>
          <span className="text-sm font-medium w-16 text-center">{zoom}%</span>
          <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(150, zoom + 10))}><ZoomIn className="h-4 w-4" /></Button>
        </div>
        <div className="text-sm text-muted-foreground">Aperçu — Format A4</div>
      </div>
      <div className="flex-1 overflow-auto bg-gray-200 rounded-lg p-4 flex justify-center">
        <div className="shadow-2xl transition-transform origin-top" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }} ref={printRef}>{render()}</div>
      </div>
    </div>
  );
});

CVPreview.displayName = 'CVPreview';
