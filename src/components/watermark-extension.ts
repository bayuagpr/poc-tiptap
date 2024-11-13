import { Extension } from '@tiptap/core'

export interface WatermarkOptions {
  text?: string;
  image?: string;
  opacity: number;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    watermark: {
      setWatermark: (options: Partial<WatermarkOptions>) => ReturnType
    }
  }
}

export const Watermark = Extension.create<WatermarkOptions>({
  name: 'watermark',

  addOptions() {
    return {
      text: undefined,
      image: undefined,
      opacity: 0.3
    }
  },

  addCommands() {
    return {
      setWatermark: (options: Partial<WatermarkOptions>) => ({ editor }) => {
        const watermark = { ...this.options, ...options }
        const dom = editor.view.dom
        
        if (dom.style.getPropertyValue('--watermark-opacity') === watermark.opacity.toString() &&
            ((watermark.image && dom.hasAttribute('data-watermark-image')) ||
             (watermark.text && dom.getAttribute('data-watermark-text') === watermark.text))) {
          return false
        }

        dom.style.setProperty('--watermark-opacity', watermark.opacity.toString())
        
        if (watermark.image) {
          dom.style.setProperty('--watermark-image', `url(${watermark.image})`)
          dom.removeAttribute('data-watermark-text')
          dom.setAttribute('data-watermark-image', '')
        } else if (watermark.text) {
          dom.removeAttribute('data-watermark-image')
          dom.setAttribute('data-watermark-text', watermark.text)
        }
        
        dom.setAttribute('data-watermark', '')
        return true
      }
    }
  }
}) 