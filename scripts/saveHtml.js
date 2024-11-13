import { promises as fs } from 'fs';
import { wrapHtmlForPdf } from './generatePdf.js';

async function saveHtml(inputPath, outputPath) {
  const content = await fs.readFile(inputPath, 'utf-8');
  const wrappedHtml = wrapHtmlForPdf(content);
  await fs.writeFile(outputPath, wrappedHtml, 'utf-8');
}

// Usage example
  const inputPath = process.argv[2];
  const outputPath = process.argv[3] || 'output.html';
  
  if (!inputPath) {
    console.error('Please provide input file path as first argument');
    process.exit(1);
  }

  saveHtml(inputPath, outputPath);
  console.log(`HTML saved to ${outputPath}`);
