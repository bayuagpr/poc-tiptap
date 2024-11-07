import { useEditor, EditorContent } from "@tiptap/react";
import Typography from "@tiptap/extension-typography";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
// import {ImageResize} from './ImageResize';
import ImageExtension from './image-extension';
import { Toolbar } from "./Toolbar";
import { VariableSelector } from "./VariableSelector";
import { ImagePicker } from "./ImagePicker";
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import HardBreak from '@tiptap/extension-hard-break'
import History from '@tiptap/extension-history'
import { useEditorStore } from '../store/editorStore';
import Dropcursor from "@tiptap/extension-dropcursor";
import Placeholder from "@tiptap/extension-placeholder";

const CustomTextStyle = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: "16px",
        parseHTML: (element) => element.style.fontSize,
        renderHTML: (attributes) => {
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
  const { setEditorContent } = useEditorStore();

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading,
      Bold,
      Italic,
      Strike,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-[40px]",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal pl-[40px]",
        },
      }),
      ListItem,
      HardBreak,
      History,
      Typography,
      Underline,
      CustomTextStyle,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      // ImageResize.configure({
      //   allowBase64: true,
      // }),
      ImageExtension,
      Dropcursor.configure({
        width: 2,
      }),
      Placeholder.configure({
        placeholder: 'Write your admission letter template here...',
      }),
    ],
    content: `
      <h1>Welcome to the Template Editor</h1>
      <p>Start editing your template here. Use the toolbar above to format your text and insert variables from the panel on the right.</p>
    `,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'min-h-[1040px] w-[800px]',
      },
    },
  });

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <Toolbar editor={editor} />
      <div className="flex">
        <div className="flex-1">
          <EditorContent
            editor={editor}
            className="prose max-w-none p-8 mx-auto bg-white focus:outline-none"
            style={{
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px, rgba(0, 0, 0, 0.1) 0px 1px 6px'
            }}
          />
        </div>
        <ImagePicker editor={editor} />
      </div>
      <VariableSelector editor={editor} />
    </div>
  );
};

export default Editor;
