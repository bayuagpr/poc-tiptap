interface Dimensions {
    width: number;
    height: number;
  }
  
  interface PixelDimensions {
    dpi72: Dimensions;  // Mac standard
    dpi96: Dimensions;  // Windows standard
    dpi150: Dimensions; // Standard print
    dpi300: Dimensions; // High-quality print
  }
  
  interface PaperSize {
    name: string;
    mm: Dimensions;     // Dimensions in millimeters
    inches: Dimensions; // Dimensions in inches
    pixels: PixelDimensions;
  }
  
  interface PaperSizes {
    [key: string]: PaperSize;
  }
  
  export const paperSizes: PaperSizes = {
    a4: {
      name: "A4",
      mm: { width: 210, height: 297 },
      inches: { width: 8.27, height: 11.69 },
      pixels: {
        dpi72: { width: 595, height: 842 },
        dpi96: { width: 794, height: 1123 },
        dpi150: { width: 1240, height: 1754 },
        dpi300: { width: 2480, height: 3508 }
      }
    },
    letter: {
      name: "US Letter",
      mm: { width: 216, height: 279 },
      inches: { width: 8.5, height: 11 },
      pixels: {
        dpi72: { width: 612, height: 792 },
        dpi96: { width: 816, height: 1056 },
        dpi150: { width: 1275, height: 1650 },
        dpi300: { width: 2550, height: 3300 }
      }
    },
    a3: {
      name: "A3",
      mm: { width: 297, height: 420 },
      inches: { width: 11.69, height: 16.54 },
      pixels: {
        dpi72: { width: 842, height: 1191 },
        dpi96: { width: 1123, height: 1587 },
        dpi150: { width: 1754, height: 2480 },
        dpi300: { width: 3508, height: 4961 }
      }
    },
    a5: {
      name: "A5",
      mm: { width: 148, height: 210 },
      inches: { width: 5.83, height: 8.27 },
      pixels: {
        dpi72: { width: 420, height: 595 },
        dpi96: { width: 559, height: 794 },
        dpi150: { width: 874, height: 1240 },
        dpi300: { width: 1748, height: 2480 }
      }
    },
    legal: {
      name: "Legal",
      mm: { width: 216, height: 356 },
      inches: { width: 8.5, height: 14 },
      pixels: {
        dpi72: { width: 612, height: 1008 },
        dpi96: { width: 816, height: 1344 },
        dpi150: { width: 1275, height: 2100 },
        dpi300: { width: 2550, height: 4200 }
      }
    }
  };