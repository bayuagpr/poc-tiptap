import { useEditor, EditorContent } from "@tiptap/react";
import Typography from "@tiptap/extension-typography";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
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
import { Box, Flex } from "@chakra-ui/react";
import { paperSizes } from '../utils/paperUtils';
import { wrapContentWithPageConfig } from '../utils/editorUtils';
import { Watermark } from './watermark-extension';

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

interface EditorProps {
  paperSize?: keyof typeof paperSizes;
  dpi?: keyof typeof paperSizes.a4.pixels;
  orientation?: 'portrait' | 'landscape';
  watermark?: {
    text: string;
    opacity: number;
  };
}

export const Editor = ({ 
  paperSize = 'letter',
  dpi = 'dpi96',
  orientation = 'portrait',
  watermark = { text: 'CONFIDENTIAL', opacity: 0.3 }
}: EditorProps) => {
  const { setEditorContent } = useEditorStore();

  const PADDING = 32; // 2rem = 32px

  const dimensions = paperSizes[paperSize].pixels[dpi];
  const pageSize = {
    width: orientation === 'portrait' ? dimensions.width : dimensions.height,
    height: orientation === 'portrait' ? dimensions.height : dimensions.width
  };

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
          style: 'list-style-type: disc; padding-left: 40px;',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          style: 'list-style-type: decimal; padding-left: 40px;',
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
      ImageExtension,
      Dropcursor.configure({
        width: 2,
      }),
      Placeholder.configure({
        placeholder: 'Write your admission letter template here...',
      }),
      Watermark.configure({
        text: watermark.text,
        opacity: watermark.opacity
      }),
    ],
    onBeforeCreate: ({ editor }) => {
      setTimeout(() => {
        editor.commands.setWatermark({
          text: watermark.text,
          opacity: watermark.opacity
        })
      }, 0)
    },
    content: `
      <h1>Welcome to the Template Editor</h1>
      <p>Start editing your template here. Use the toolbar above to format your text and insert variables from the panel on the right.</p>
    `,
    onUpdate: ({ editor }) => {
      const wrappedContent = wrapContentWithPageConfig(editor.getHTML(), {
        paperSize,
        dpi,
        orientation,
        padding: PADDING
      }, watermark.text, watermark.opacity);
      setEditorContent(wrappedContent);
    },
    editorProps: {
      attributes: {
        style: `min-height: ${pageSize.height - (PADDING * 2)}px; width: ${pageSize.width - (PADDING * 2)}px;`,
      },
    },
  });

  return (
    <Box w="full" bg="white" borderRadius="lg" boxShadow="lg" overflow="hidden">
      <Toolbar editor={editor} />
      <Flex>
        <Box padding="2rem" flex="1">
          <EditorContent
            editor={editor}
            className="prose max-w-none"
            style={{
              padding: "2rem",
              margin: "0 auto",
              width: `${pageSize.width}px`,
              background: "white",
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px, rgba(0, 0, 0, 0.1) 0px 1px 6px'
            }}
          />
        </Box>
        <ImagePicker editor={editor} />
      </Flex>
      <VariableSelector editor={editor} />
    </Box>
  );
};

export default Editor;
