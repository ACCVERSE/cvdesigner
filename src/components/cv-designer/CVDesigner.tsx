'use client';

import { useState, useRef } from 'react';
import { useCVStore } from '@/store/cv-store';
import { CountrySelector } from './CountrySelector';
import { PersonalInfoSection } from './PersonalInfoSection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { LanguagesSection } from './LanguagesSection';
import { ObjectiveSection } from './ObjectiveSection';
import { ReferencesSection } from './ReferencesSection';
import { StyleOptions } from './StyleOptions';
import { CVPreview } from './CVPreview';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Download, RotateCcw, Eye, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function CVDesigner() {
  const { resetCV } = useCVStore();
  const [showPreview, setShowPreview] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const printRef = useRef<HTMLDivElement | null>(null);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const printWindow = window.open('', '_blank');
      if (printWindow && printRef.current) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>CV</title>
            <style>
              @page { size: A4; margin: 0; }
              body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            </style>
          </head>
          <body>${printRef.current.innerHTML}</body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 250);
      }
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleReset = () => {
    resetCV();
    setShowResetDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="bg-white dark:bg-slate-900 border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">CV Designer International</h1>
                <p className="text-sm text-muted-foreground">Créez un CV adapté à votre pays cible</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)} className="hidden md:flex">
                {showPreview ? <><ChevronRight className="h-4 w-4 mr-1" /> Masquer</> : <><ChevronLeft className="h-4 w-4 mr-1" /> Aperçu</>}
              </Button>
              <Button onClick={handleExportPDF} disabled={isExporting} className="bg-primary">
                {isExporting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Export...</> : <><Download className="h-4 w-4 mr-2" /> Exporter PDF</>}
              </Button>
              <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm"><RotateCcw className="h-4 w-4 mr-1" /> Réinitialiser</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Réinitialiser le CV ?</DialogTitle>
                    <DialogDescription>Cette action effacera toutes les informations saisies.</DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setShowResetDialog(false)}>Annuler</Button>
                    <Button variant="destructive" onClick={handleReset}>Réinitialiser</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className={`transition-all duration-300 ${showPreview ? 'w-full lg:w-1/2' : 'w-full'}`}>
            <Tabs defaultValue="country" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-4">
                <TabsTrigger value="country">🌍 Pays</TabsTrigger>
                <TabsTrigger value="personal">👤 Infos</TabsTrigger>
                <TabsTrigger value="experience">💼 Expérience</TabsTrigger>
                <TabsTrigger value="education">🎓 Formation</TabsTrigger>
                <TabsTrigger value="style">🎨 Style</TabsTrigger>
              </TabsList>
              <ScrollArea className="h-[calc(100vh-220px)] pr-4">
                <TabsContent value="country"><CountrySelector /></TabsContent>
                <TabsContent value="personal" className="space-y-4">
                  <PersonalInfoSection />
                  <ObjectiveSection />
                  <SkillsSection />
                  <LanguagesSection />
                  <ReferencesSection />
                </TabsContent>
                <TabsContent value="experience"><ExperienceSection /></TabsContent>
                <TabsContent value="education"><EducationSection /></TabsContent>
                <TabsContent value="style"><StyleOptions /></TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
          {showPreview && (
            <div className="hidden lg:block w-1/2 sticky top-24 h-[calc(100vh-140px)]">
              <CVPreview printRef={printRef} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
