import { generatePdf } from './generatePdf.js';
import { promises as fs } from 'fs';

async function main() {
  const inputPath = process.argv[2];
  const outputPath = process.argv[3];

  if (!inputPath || !outputPath) {
    console.error('Usage: node generatePdfScript.js <input-file-path> <output-path>');
    process.exit(1);
  }

  try {
    const html = await fs.readFile(inputPath, 'utf-8');
    await generatePdf(html, {format: 'A4'}, outputPath);
    console.log(`PDF generated successfully at ${outputPath}`);
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    process.exit(1);
  }
}

main(); 