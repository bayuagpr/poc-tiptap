import { paperSizes } from "./paperUtils";

interface PageConfig {
  paperSize: keyof typeof paperSizes;
  dpi: keyof typeof paperSizes.a4.pixels;
  orientation: "portrait" | "landscape";
  padding?: number;
}

interface PageDimensions {
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
}

interface WatermarkConfig {
  text?: string;
  image?: string;
  opacity: number;
}

export const wrapContentWithPageConfig = (
  content: string,
  config: PageConfig,
  watermark?: WatermarkConfig
) => {
  const { paperSize, dpi, orientation, padding = 32 } = config;
  const dimensions = paperSizes[paperSize].pixels[dpi];
  const pageSize = {
    width: orientation === "portrait" ? dimensions.width : dimensions.height,
    height: orientation === "portrait" ? dimensions.height : dimensions.width,
  };

  return `
    <div style="
      width: ${pageSize.width}px;
      min-height: ${pageSize.height}px;
      padding: ${padding}px;
      box-sizing: border-box;
      position: relative;
      ${watermark ? `
        ${watermark.text ? `--watermark-text: "${watermark.text}";` : ''}
        ${watermark.image ? `--watermark-image: url("${watermark.image}");` : ''}
        --watermark-opacity: ${watermark.opacity};
      ` : ''}
    ">
      ${watermark?.text ? `
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 4em;
          opacity: ${watermark?.opacity ?? 0.3};
          pointer-events: none;
          z-index: 1;
          white-space: nowrap;
          color: rgba(0, 0, 0, 0.2);
        ">${watermark?.text}</div>
      ` : ''}
        ${watermark?.image ? `
        <div style="
          position: absolute;
          top: ${padding}px;
          left: ${padding}px;
          right: ${padding}px;
          bottom: ${padding}px;
          background-image: url('${watermark.image}');
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          opacity: ${watermark.opacity};
          pointer-events: none;
          z-index: 0;
        "></div>
      ` : ''}
      <div style="position: relative;">
        ${content}
      </div>
    </div>
  `.trim();
};

export const extractWatermarkDetails = (wrappedContent: string): WatermarkConfig | undefined => {
  const textMatch = wrappedContent.match(/--watermark-text:\s*"([^"]+)"/);
  const imageMatch = wrappedContent.match(/--watermark-image:\s*url\("([^"]+)"\)/);
  const opacityMatch = wrappedContent.match(/--watermark-opacity:\s*([\d.]+)/);

  if (!opacityMatch) return undefined;

  return {
    text: textMatch?.[1],
    image: imageMatch?.[1],
    opacity: parseFloat(opacityMatch[1])
  };
};

export const extractContent = (wrappedContent: string): string => {
  const match = wrappedContent.match(/<div style="position: relative;">\s*([\s\S]*?)\s*<\/div>\s*<\/div>$/);
  return match ? match[1] : '';
};

export const extractPageDimensions = (wrappedContent: string): PageDimensions | null => {
  const widthMatch = wrappedContent.match(/width:\s*(\d+)px/);
  const heightMatch = wrappedContent.match(/min-height:\s*(\d+)px/);
  
  if (!widthMatch || !heightMatch) return null;
  
  const width = parseInt(widthMatch[1], 10);
  const height = parseInt(heightMatch[1], 10);
  
  return {
    width,
    height,
    orientation: width < height ? 'portrait' : 'landscape'
  };
};
