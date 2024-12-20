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
      draggable: {
        default: true
      },
      align: {
        default: 'left',
        parseHTML: element => {
          const marginLeft = element.style.marginLeft;
          const marginRight = element.style.marginRight;
          
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
        parseHTML: element => {
          const isAbsolute = element.style.position === 'absolute';
          // if (isAbsolute) {
          //   setTimeout(() => {
          //     element.dispatchEvent(new MouseEvent('click', {
          //       bubbles: true,
          //       cancelable: true,
          //       view: window
          //     }));
          //   }, 100);
          // }
          return isAbsolute
        },
        renderHTML: attributes => {
          if (!attributes.float) return {}
          return {
            style: 'position: absolute;'
          }
        }
      },
      left: {
        default: 0,
        parseHTML: element => {
          return parseInt(element.style.left) || 0
        },
        renderHTML: attributes => {
          if (!attributes.float) return {}
          return {
            style: `left: ${attributes.left}px;`
          }
        }
      },
      top: {
        default: 0,
        parseHTML: element => {
          const translateY = parseInt(element.getAttribute('data-translateY') || '0');
          const top = parseInt(element.style.top || '0');
          return top - translateY; // Subtract translateY to get the actual position
        },
        renderHTML: attributes => {
          if (!attributes.float) return {};
          const translateY = attributes.translateY || 0;
          return {
            style: `top: ${attributes.top + translateY}px;`,
            'data-translateY': translateY
          }
        }
      },
      translateX: {
        default: 0,
      },
      translateY: {
        default: 0,
      },
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