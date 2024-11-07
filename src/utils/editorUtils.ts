import { paperSizes } from './paperUtils';

interface PageConfig {
  paperSize: keyof typeof paperSizes;
  dpi: keyof typeof paperSizes.a4.pixels;
  orientation: 'portrait' | 'landscape';
  padding?: number;
}

export const wrapContentWithPageConfig = (content: string, config: PageConfig) => {
  const { paperSize, dpi, orientation, padding = 32 } = config;
  const dimensions = paperSizes[paperSize].pixels[dpi];
  const pageSize = {
    width: orientation === 'portrait' ? dimensions.width : dimensions.height,
    height: orientation === 'portrait' ? dimensions.height : dimensions.width
  };

  return `
    <div style="
      width: ${pageSize.width}px;
      min-height: ${pageSize.height}px;
      padding: ${padding}px;
      box-sizing: border-box;
    ">
      <div style="
        position: relative;
      ">
        ${content}
      </div>
    </div>
  `.trim();
}; 