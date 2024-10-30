import React, { useEffect } from 'react';
import Editor from './components/Editor';
import VariableForm from './components/VariableForm';
import { useEditorStore } from './store/editorStore';
import { FileText } from 'lucide-react';
import { Variable } from './types';
import DOMPurify from 'dompurify';
import { saveFile } from './utils/saveFile';

// Mock data for demonstration
const MOCK_VARIABLES: Variable[] = [
  { id: '1', name: 'learner_id', type: 'text', label: 'Learner ID', value: '' },
  { id: '2', name: 'learner_name', type: 'text', label: 'Learner Name', value: '' },
  { id: '3', name: 'course_name', type: 'text', label: 'Course Name', value: '' },
];

function App() {
  const { setVariables, editorContent, variables } = useEditorStore();

  useEffect(() => {
    // In a real app, this would be fetched from your API
    setVariables(MOCK_VARIABLES);
  }, []);

  const getPreviewContent = () => {
    let previewText = editorContent;
    variables.forEach((variable) => {
      const regex = new RegExp(`{{\\s*${variable.name}\\s*}}`, 'g');
      previewText = previewText.replace(regex, variable.value || `{{${variable.label}}}`);
    });
    return previewText;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Template Editor</h1>
            </div>
            <button
              onClick={() => saveFile(editorContent)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Template
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Editor />
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Preview</h2>
              <div className="prose max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(getPreviewContent()) 
                  }} 
                />
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <VariableForm />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;