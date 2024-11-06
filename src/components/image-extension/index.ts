import Image from '@tiptap/extension-image'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { NodeView } from './NodeView'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    setImage: {
      setImage: (options: { 
        src: string
        alt?: string
        title?: string
        width?: number
        height?: number
        align?: 'left' | 'center' | 'right'
        float?: boolean
      }) => ReturnType
    }
  }
}

export default Image.extend({
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
      align: {
        default: 'left',
        parseHTML: element => {
          const style = window.getComputedStyle(element);
          const marginLeft = style.marginLeft;
          const marginRight = style.marginRight;
          
          if (marginLeft === 'auto' && marginRight === 'auto') return 'center';
          if (marginLeft === '0px' && marginRight === 'auto') return 'left';
          if (marginLeft === 'auto' && marginRight === '0px') return 'right';
          return 'left';
        },
        renderHTML: attributes => {
          if (!attributes.align || attributes.float) return {}
          
          const margin = attributes.align === 'center' ? '0 auto' :
                        attributes.align === 'right' ? '0 0 0 auto' :
                        '0 auto 0 0';
          
          return {
            style: `margin: ${margin};`
          }
        },
      },
      float: {
        default: false,
      },
      left: {
        default: 0,
      },
      top: {
        default: 0,
      }
    }
  },

  parseHTML() {
    return [{ tag: 'img' }]
  },

  addNodeView() {
    return ReactNodeViewRenderer(NodeView)
  },

  addCommands() {
    return {
      setImage: options => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options
        })
      },
    }
  },
}) 