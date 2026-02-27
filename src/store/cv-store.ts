import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CVData, defaultCVData, Experience, Education, Skill, Language, Reference } from '@/types/cv';

interface CVStore extends CVData {
  setCountry: (country: CVData['selectedCountry']) => void;
  setTemplate: (template: CVData['selectedTemplate']) => void;
  setColor: (color: string) => void;
  updatePersonalInfo: (info: Partial<CVData['personalInfo']>) => void;
  setObjective: (objective: string) => void;
  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reorderExperiences: (experiences: Experience[]) => void;
  addEducation: (education: Education) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addLanguage: (language: Language) => void;
  updateLanguage: (id: string, language: Partial<Language>) => void;
  removeLanguage: (id: string) => void;
  addReference: (reference: Reference) => void;
  updateReference: (id: string, reference: Partial<Reference>) => void;
  removeReference: (id: string) => void;
  resetCV: () => void;
  loadCV: (data: CVData) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 11);

export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      ...defaultCVData,
      setCountry: (country) => set({ selectedCountry: country }),
      setTemplate: (template) => set({ selectedTemplate: template }),
      setColor: (color) => set({ selectedColor: color }),
      updatePersonalInfo: (info) =>
        set((state) => ({
          personalInfo: { ...state.personalInfo, ...info },
        })),
      setObjective: (objective) => set({ objective }),
      addExperience: (experience) =>
        set((state) => ({
          experiences: [...state.experiences, experience],
        })),
      updateExperience: (id, experience) =>
        set((state) => ({
          experiences: state.experiences.map((exp) =>
            exp.id === id ? { ...exp, ...experience } : exp
          ),
        })),
      removeExperience: (id) =>
        set((state) => ({
          experiences: state.experiences.filter((exp) => exp.id !== id),
        })),
      reorderExperiences: (experiences) => set({ experiences }),
      addEducation: (education) =>
        set((state) => ({
          education: [...state.education, education],
        })),
      updateEducation: (id, education) =>
        set((state) => ({
          education: state.education.map((edu) =>
            edu.id === id ? { ...edu, ...education } : edu
          ),
        })),
      removeEducation: (id) =>
        set((state) => ({
          education: state.education.filter((edu) => edu.id !== id),
        })),
      addSkill: (skill) =>
        set((state) => ({
          skills: [...state.skills, skill],
        })),
      updateSkill: (id, skill) =>
        set((state) => ({
          skills: state.skills.map((s) =>
            s.id === id ? { ...s, ...skill } : s
          ),
        })),
      removeSkill: (id) =>
        set((state) => ({
          skills: state.skills.filter((s) => s.id !== id),
        })),
      addLanguage: (language) =>
        set((state) => ({
          languages: [...state.languages, language],
        })),
      updateLanguage: (id, language) =>
        set((state) => ({
          languages: state.languages.map((l) =>
            l.id === id ? { ...l, ...language } : l
          ),
        })),
      removeLanguage: (id) =>
        set((state) => ({
          languages: state.languages.filter((l) => l.id !== id),
        })),
      addReference: (reference) =>
        set((state) => ({
          references: [...state.references, reference],
        })),
      updateReference: (id, reference) =>
        set((state) => ({
          references: state.references.map((r) =>
            r.id === id ? { ...r, ...reference } : r
          ),
        })),
      removeReference: (id) =>
        set((state) => ({
          references: state.references.filter((r) => r.id !== id),
        })),
      resetCV: () => set(defaultCVData),
      loadCV: (data) => set(data),
    }),
    {
      name: 'cv-designer-storage',
    }
  )
);

export { generateId };
