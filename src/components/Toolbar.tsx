import React from 'react';
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Minus, Undo2, Redo2
} from 'lucide-react';
import { Editor } from '@tiptap/react';

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  const setFontSize = (size: string) => {
    editor.chain().focus().setMark('textStyle', { fontSize: size }).run();
  };

  return (
    <div className="border-b border-gray-200 bg-gray-50 p-2 flex items-center gap-1 flex-wrap">
      <select 
        onChange={e => editor.chain().focus().setFontFamily(e.target.value).run()}
        className="h-8 rounded border border-gray-300 text-sm"
        value={editor.getAttributes('textStyle').fontFamily || ''}
      >
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
      </select>

      <select
        onChange={e => setFontSize(e.target.value)}
        className="h-8 w-20 rounded border border-gray-300 text-sm"
        value={editor.getAttributes('textStyle').fontSize || '16px'}
      >
        {[8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72]
          .map(size => (
            <option key={size} value={`${size}px`}>
              {size}
            </option>
          ))
        }
      </select>

      <div className="h-4 w-px bg-gray-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1 rounded hover:bg-gray-200 ${
          editor.isActive('bold') ? 'bg-gray-200' : ''
        }`}
      >
        <Bold className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1 rounded hover:bg-gray-200 ${
          editor.isActive('italic') ? 'bg-gray-200' : ''
        }`}
      >
        <Italic className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-1 rounded hover:bg-gray-200 ${
          editor.isActive('underline') ? 'bg-gray-200' : ''
        }`}
      >
        <Underline className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-1 rounded hover:bg-gray-200 ${
          editor.isActive('strike') ? 'bg-gray-200' : ''
        }`}
      >
        <Strikethrough className="w-4 h-4" />
      </button>

      <div className="h-4 w-px bg-gray-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-1 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
        }`}
      >
        <AlignLeft className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-1 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
        }`}
      >
        <AlignCenter className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-1 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
        }`}
      >
        <AlignRight className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`p-1 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200' : ''
        }`}
      >
        <AlignJustify className="w-4 h-4" />
      </button>

      <div className="h-4 w-px bg-gray-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1 rounded hover:bg-gray-200 ${
          editor.isActive('bulletList') ? 'bg-gray-200' : ''
        }`}
      >
        <List className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1 rounded hover:bg-gray-200 ${
          editor.isActive('orderedList') ? 'bg-gray-200' : ''
        }`}
      >
        <ListOrdered className="w-4 h-4" />
      </button>

      <div className="h-4 w-px bg-gray-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="p-1 rounded hover:bg-gray-200"
      >
        <Minus className="w-4 h-4" />
      </button>

      <div className="h-4 w-px bg-gray-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className={`p-1 rounded hover:bg-gray-200 disabled:opacity-50`}
      >
        <Undo2 className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className={`p-1 rounded hover:bg-gray-200 disabled:opacity-50`}
      >
        <Redo2 className="w-4 h-4" />
      </button>
    </div>
  );
};