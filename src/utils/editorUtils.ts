import { paperSizes } from "./paperUtils";

interface PageConfig {
  paperSize: keyof typeof paperSizes;
  dpi: keyof typeof paperSizes.a4.pixels;
  orientation: "portrait" | "landscape";
  padding?: number;
}

export const wrapContentWithPageConfig = (
  content: string,
  config: PageConfig,
  watermarkText?: string,
  watermarkOpacity?: number
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
    ">
      ${watermarkText ? `
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 4em;
          opacity: ${watermarkOpacity ?? 0.3};
          pointer-events: none;
          z-index: 1;
          white-space: nowrap;
          color: rgba(0, 0, 0, 0.2);
        ">${watermarkText}</div>
      ` : ''}
      <div style="position: relative;">
        ${content}
      </div>
    </div>
  `.trim();
};
