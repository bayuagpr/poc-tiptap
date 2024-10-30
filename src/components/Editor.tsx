import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Typography from '@tiptap/extension-typography';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import { Toolbar } from './Toolbar';
import { VariableSelector } from './VariableSelector';

const CustomTextStyle = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: '16px',
        parseHTML: element => element.style.fontSize,
        renderHTML: attributes => {
          if (!attributes.fontSize) {
            return {};
          }
          return {
            style: `font-size: ${attributes.fontSize}`,
          };
        },
      },
    };
  },
});

export const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Underline,
      CustomTextStyle,
      FontFamily.configure({
        types: ['textStyle'],
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: `
      <h1>Welcome to the Template Editor</h1>
      <p>Start editing your template here. Use the toolbar above to format your text and insert variables from the panel on the right.</p>
    `,
  });

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <Toolbar editor={editor} />
      <VariableSelector editor={editor} />
      <EditorContent 
        editor={editor} 
        className="prose max-w-none p-8 min-h-[500px] focus:outline-none"
      />
    </div>
  );
};

export default Editor;