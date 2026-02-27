'use client';

import { useCVStore } from '@/store/cv-store';
import { countryConfigs } from '@/types/cv';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User, Upload, X, Linkedin, Globe } from 'lucide-react';
import { useRef } from 'react';

export function PersonalInfoSection() {
  const { selectedCountry, personalInfo, updatePersonalInfo } = useCVStore();
  const config = countryConfigs[selectedCountry];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updatePersonalInfo({ photo: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Informations personnelles</CardTitle>
        <CardDescription>Vos coordonnées</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Prénom *</Label><Input value={personalInfo.firstName} onChange={(e) => updatePersonalInfo({ firstName: e.target.value })} placeholder="Jean" /></div>
          <div className="space-y-2"><Label>Nom *</Label><Input value={personalInfo.lastName} onChange={(e) => updatePersonalInfo({ lastName: e.target.value })} placeholder="Dupont" /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Email *</Label><Input type="email" value={personalInfo.email} onChange={(e) => updatePersonalInfo({ email: e.target.value })} placeholder="jean@email.com" /></div>
          <div className="space-y-2"><Label>Téléphone *</Label><Input value={personalInfo.phone} onChange={(e) => updatePersonalInfo({ phone: e.target.value })} placeholder="+33 6 12 34 56 78" /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2"><Label>Ville</Label><Input value={personalInfo.city} onChange={(e) => updatePersonalInfo({ city: e.target.value })} placeholder="Paris" /></div>
          <div className="space-y-2"><Label>Code postal</Label><Input value={personalInfo.postalCode} onChange={(e) => updatePersonalInfo({ postalCode: e.target.value })} placeholder="75001" /></div>
          <div className="space-y-2"><Label>Pays</Label><Input value={personalInfo.country} onChange={(e) => updatePersonalInfo({ country: e.target.value })} placeholder="France" /></div>
        </div>
        {config.allowPhoto && (
          <div className="space-y-2">
            <Label>Photo {config.photoRequired ? '* (recommandée)' : '(optionnelle)'}</Label>
            <div className="flex items-center gap-4">
              {personalInfo.photo ? (
                <div className="relative">
                  <img src={personalInfo.photo} alt="Photo" className="w-24 h-24 rounded-lg object-cover border" />
                  <Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6" onClick={() => { updatePersonalInfo({ photo: null }); if (fileInputRef.current) fileInputRef.current.value = ''; }}><X className="h-4 w-4" /></Button>
                </div>
              ) : (
                <div onClick={() => fileInputRef.current?.click()} className="w-24 h-24 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:border-primary/50"><Upload className="h-6 w-6 text-muted-foreground" /><span className="text-xs text-muted-foreground mt-1">Ajouter</span></div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </div>
          </div>
        )}
        {config.showAge && <div className="space-y-2"><Label>Date de naissance</Label><Input type="date" value={personalInfo.dateOfBirth} onChange={(e) => updatePersonalInfo({ dateOfBirth: e.target.value })} /></div>}
        {config.showNationality && <div className="space-y-2"><Label>Nationalité</Label><Input value={personalInfo.nationality} onChange={(e) => updatePersonalInfo({ nationality: e.target.value })} placeholder="Française" /></div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2"><Label className="flex items-center gap-2"><Linkedin className="h-4 w-4" /> LinkedIn</Label><Input value={personalInfo.linkedin} onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })} placeholder="linkedin.com/in/jeandupont" /></div>
          <div className="space-y-2"><Label className="flex items-center gap-2"><Globe className="h-4 w-4" /> Site web</Label><Input value={personalInfo.website} onChange={(e) => updatePersonalInfo({ website: e.target.value })} placeholder="jeandupont.com" /></div>
        </div>
      </CardContent>
    </Card>
  );
}
