export const saveFile = async (content: string, filename = 'template.txt') => {
  try {
    const handle = await window.showSaveFilePicker({
      suggestedName: filename,
      types: [{
        description: 'Text file',
        accept: { 'text/plain': ['.txt'] }
      }]
    });
    const writable = await handle.createWritable();
    await writable.write(content);
    await writable.close();
  } catch (err) {
    fallbackSave(content, filename);
  }
};

export const importFile = async (): Promise<string> => {
  try {
    const [fileHandle] = await window.showOpenFilePicker({
      types: [{
        description: 'Text files',
        accept: { 'text/plain': ['.txt'] }
      }],
      multiple: false
    });
    const file = await fileHandle.getFile();
    return await file.text();
  } catch (err) {
    return fallbackImport();
  }
};

const fallbackImport = (): Promise<string> => {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const text = await file.text();
        resolve(text);
      }
    };
    
    input.click();
  });
};

const fallbackSave = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}; 