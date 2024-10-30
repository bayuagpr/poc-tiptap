import React, { useEffect } from 'react';
import Editor from './components/Editor';
import VariableForm from './components/VariableForm';
import { useEditorStore } from './store/editorStore';
import { FileText } from 'lucide-react';
import { Variable } from './types';

// Mock data for demonstration
const MOCK_VARIABLES: Variable[] = [
  { id: '1', name: 'recipientName', type: 'text', label: 'Recipient Name', value: '' },
  { id: '2', name: 'companyName', type: 'text', label: 'Company Name', value: '' },
  { id: '3', name: 'date', type: 'date', label: 'Date', value: '' },
  { id: '4', name: 'amount', type: 'number', label: 'Amount', value: '' },
];

function App() {
  const { setVariables, editorContent } = useEditorStore();

  useEffect(() => {
    // In a real app, this would be fetched from your API
    setVariables(MOCK_VARIABLES);
  }, []);

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
              onClick={() => {
                // Send to your API
                console.log('Saving template:', editorContent);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Template
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Editor />
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