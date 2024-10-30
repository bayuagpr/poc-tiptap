import React from 'react';
import { useEditorStore } from '../store/editorStore';

export const VariableForm = () => {
  const { variables, updateVariable } = useEditorStore();

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Template Variables</h2>
      <div className="space-y-4">
        {variables.map((variable) => (
          <div key={variable.id}>
            <label 
              htmlFor={variable.id} 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {variable.label}
            </label>
            {variable.type === 'text' && (
              <input
                type="text"
                id={variable.id}
                value={variable.value}
                onChange={(e) => updateVariable(variable.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            {variable.type === 'date' && (
              <input
                type="date"
                id={variable.id}
                value={variable.value}
                onChange={(e) => updateVariable(variable.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            {variable.type === 'number' && (
              <input
                type="number"
                id={variable.id}
                value={variable.value}
                onChange={(e) => updateVariable(variable.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariableForm;