import { Extension } from '@tiptap/core'

export interface WatermarkOptions {
  text: string
  opacity: number
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
      text: 'DRAFT',
      opacity: 0.3
    }
  },

  addCommands() {
    return {
      setWatermark: (options: Partial<WatermarkOptions>) => ({ editor }) => {
        const watermark = { ...this.options, ...options }
        editor.view.dom.style.setProperty('--watermark-opacity', watermark.opacity.toString())
        editor.view.dom.setAttribute('data-watermark-text', watermark.text)
        editor.view.dom.setAttribute('data-watermark', '')
        return true
      }
    }
  },

  onUpdate() {
    if (this.options.text) {
      this.editor.commands.setWatermark(this.options)
    }
  },

  onSelectionUpdate() {
    if (this.options.text) {
      this.editor.commands.setWatermark(this.options)
    }
  }
}) 