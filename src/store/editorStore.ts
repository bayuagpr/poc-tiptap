import { create } from 'zustand';
import { paperSizes } from '../utils/paperUtils';
import { devtools } from 'zustand/middleware';

interface EditorConfig {
  paperSize: keyof typeof paperSizes;
  dpi: keyof typeof paperSizes.a4.pixels;
  orientation: 'portrait' | 'landscape';
  padding: number;
  watermark: {
    text?: string;
    image?: string;
    opacity: number;
  };
}

interface EditorState {
  editorContent: string;
  variables: Array<{ id: string; name: string; type: string; label: string; value: string }>;
  config: EditorConfig;
  setEditorContent: (content: string) => void;
  setVariables: (variables: Array<{ id: string; name: string; type: string; label: string; value: string }>) => void;
  setConfig: (config: EditorConfig) => void;
}

export const useEditorStore = create<EditorState>()(
  devtools(
    (set) => ({
      editorContent: '',
      variables: [],
      config: {
        paperSize: 'letter',
        dpi: 'dpi96',
        orientation: 'portrait',
        padding: 32,
        watermark: { text: 'CONFIDENTIAL', opacity: 0.3 }
      },
      setEditorContent: (content) => set({ editorContent: content }, false, 'setEditorContent'),
      setVariables: (variables) => set({ variables }, false, 'setVariables'),
      setConfig: (config) => set({ config }, false, 'setConfig')
    }),
    { name: 'EditorStore' }
  )
);