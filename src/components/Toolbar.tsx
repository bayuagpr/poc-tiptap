import React from 'react';
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Undo2, Redo2
} from 'lucide-react';
import { Editor } from '@tiptap/react';
import {
  Select,
  Divider,
  Flex,
  IconButton,
} from '@chakra-ui/react';

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  const setFontSize = (size: string) => {
    editor.chain().focus().setMark('textStyle', { fontSize: size }).run();
  };

  return (
    <Flex 
      borderBottom="1px" 
      borderColor="gray.200" 
      bg="gray.50" 
      p={2} 
      gap={1} 
      flexWrap="wrap" 
      alignItems="center"
    >
      <Select
        size="sm"
        w="auto"
        onChange={e => editor.chain().focus().setFontFamily(e.target.value).run()}
        value={editor.getAttributes('textStyle').fontFamily || ''}
      >
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
      </Select>

      <Select
        size="sm"
        w="20"
        onChange={e => setFontSize(e.target.value)}
        value={editor.getAttributes('textStyle').fontSize || '16px'}
      >
        {[8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72]
          .map(size => (
            <option key={size} value={`${size}px`}>{size}</option>
          ))
        }
      </Select>

      <Divider orientation="vertical" h="4" mx={1} />

      <IconButton
        aria-label="Bold"
        icon={<Bold size={16} />}
        size="sm"
        variant={editor.isActive('bold') ? 'solid' : 'ghost'}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />

      <IconButton
        aria-label="Italic"
        icon={<Italic size={16} />}
        size="sm"
        variant={editor.isActive('italic') ? 'solid' : 'ghost'}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />

      <IconButton
        aria-label="Underline"
        icon={<Underline size={16} />}
        size="sm"
        variant={editor.isActive('underline') ? 'solid' : 'ghost'}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      />

      <IconButton
        aria-label="Strikethrough"
        icon={<Strikethrough size={16} />}
        size="sm"
        variant={editor.isActive('strike') ? 'solid' : 'ghost'}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />

      <Divider orientation="vertical" h="4" mx={1} />

      <IconButton
        aria-label="Align Left"
        icon={<AlignLeft size={16} />}
        size="sm"
        variant={editor.isActive({ textAlign: 'left' }) ? 'solid' : 'ghost'}
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
      />

      <IconButton
        aria-label="Align Center"
        icon={<AlignCenter size={16} />}
        size="sm"
        variant={editor.isActive({ textAlign: 'center' }) ? 'solid' : 'ghost'}
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      />

      <IconButton
        aria-label="Align Right"
        icon={<AlignRight size={16} />}
        size="sm"
        variant={editor.isActive({ textAlign: 'right' }) ? 'solid' : 'ghost'}
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      />

      <IconButton
        aria-label="Justify"
        icon={<AlignJustify size={16} />}
        size="sm"
        variant={editor.isActive({ textAlign: 'justify' }) ? 'solid' : 'ghost'}
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
      />

      <Divider orientation="vertical" h="4" mx={1} />

      <IconButton
        aria-label="Bullet List"
        icon={<List size={16} />}
        size="sm"
        variant={editor.isActive('bulletList') ? 'solid' : 'ghost'}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />

      <IconButton
        aria-label="Ordered List"
        icon={<ListOrdered size={16} />}
        size="sm"
        variant={editor.isActive('orderedList') ? 'solid' : 'ghost'}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />

      <Divider orientation="vertical" h="4" mx={1} />

      <IconButton
        aria-label="Undo"
        icon={<Undo2 size={16} />}
        size="sm"
        variant="ghost"
        isDisabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      />

      <IconButton
        aria-label="Redo"
        icon={<Redo2 size={16} />}
        size="sm"
        variant="ghost"
        isDisabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      />
    </Flex>
  );
};