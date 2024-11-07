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

      <main className="max-w-[1400px] mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[auto,300px] gap-8">
          <div className="space-y-8">
            <div className="relative overflow-x-auto">
              <Editor />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Preview</h2>
              <div className="overflow-x-auto">
                <div 
                  className="prose max-w-none mx-auto p-8" 
                  style={{ 
                    minHeight: '1056px',  // 11 inches * 96 DPI
                    width: '816px',       // 8.5 inches * 96 DPI
                    backgroundColor: 'white',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px, rgba(0, 0, 0, 0.1) 0px 1px 6px'
                  }}
                >
                  <div className="relative">
                    <div 
                      dangerouslySetInnerHTML={{ 
                      __html: DOMPurify.sanitize(getPreviewContent()) 
                      }} 
                    />
                  </div>
                </div>
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