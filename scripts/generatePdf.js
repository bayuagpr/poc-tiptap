import pdf from 'html-pdf';
import {
    promises as fs
} from 'fs';

function wrapHtmlForPdf(content) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
          }
          img, svg, video, canvas, audio, iframe, embed, object {
            display: block;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
}

function generatePdf(html, options = {}, outputPath) {
  return new Promise((resolve, reject) => {
    const validFormats = [
      'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid',
      // Custom size example: { width: '5in', height: '7in' }
    ];

    let format = options.format || 'A4';
    if (typeof format === 'string' && !validFormats.includes(format)) {
      console.warn(`Warning: Invalid format '${format}'. Defaulting to A4.`);
      format = 'A4';
    }

    const defaultOptions = {
      format: format,
      orientation: options.orientation || 'portrait',
      border: "0",
      header: options.header || undefined,
      footer: options.footer || undefined,
      type: 'pdf',
      timeout: 30000,
    };

    pdf.create(wrapHtmlForPdf(html), defaultOptions).toBuffer((err, buffer) => {
      if (err) {
        reject(err);
        return;
      }

      if (outputPath) {
        fs.writeFile(outputPath, buffer)
          .then(() => resolve(buffer))
          .catch(reject);
      } else {
        resolve(buffer);
      }
    });
  });
}

export { generatePdf, wrapHtmlForPdf };