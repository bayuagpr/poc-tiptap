import { create } from 'zustand';
import { Variable, Template } from '../types';

interface EditorStore {
  variables: Variable[];
  currentTemplate: Template | null;
  setVariables: (variables: Variable[]) => void;
  setTemplate: (template: Template) => void;
  updateVariable: (id: string, value: string) => void;
  editorContent: string;
  setEditorContent: (content: string) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  variables: [],
  currentTemplate: null,
  setVariables: (variables) => set({ variables }),
  setTemplate: (template) => set({ currentTemplate: template }),
  updateVariable: (id, value) =>
    set((state) => ({
      variables: state.variables.map((v) =>
        v.id === id ? { ...v, value } : v
      ),
    })),
  editorContent: '',
  setEditorContent: (content) => set({ editorContent: content }),
}));