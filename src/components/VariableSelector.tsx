import React from 'react';
import { Editor } from '@tiptap/react';
import { Variable as VariableIcon } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

interface VariableSelectorProps {
  editor: Editor | null;
}

export const VariableSelector: React.FC<VariableSelectorProps> = ({ editor }) => {
  const { variables } = useEditorStore();

  if (!editor) return null;

  const insertVariable = (variable: string) => {
    editor
      .chain()
      .focus()
      .insertContent(`{{${variable}}}`)
      .run();
  };

  return (
    <div className="border-b border-gray-200 bg-white p-2 flex items-center gap-2 flex-wrap">
      <span className="text-sm font-medium text-gray-700">Variables:</span>
      {variables.map((variable) => (
        <button
          key={variable.id}
          onClick={() => insertVariable(variable.name)}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-sm hover:bg-blue-100"
        >
          <VariableIcon className="w-3 h-3" />
          {variable.label}
        </button>
      ))}
    </div>
  );
};