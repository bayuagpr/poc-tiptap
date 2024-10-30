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