import { Editor } from '@tiptap/react';
import { useState } from 'react';

interface Image {
  id: string;
  base64: string;
}

interface ImagePickerProps {
  editor: Editor | null;
}

export const ImagePicker = ({ editor }: ImagePickerProps) => {
  const [images, setImages] = useState<Image[]>([]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = {
          id: crypto.randomUUID(),
          base64: reader.result as string,
        };
        setImages(prev => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const insertImage = (base64: string) => {
    if (editor) {
      editor.chain().focus().setImage({ src: base64 }).run();
    }
  };

  return (
    <div className="w-64 border-l border-gray-200 p-4">
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.base64}
            alt="Uploaded image"
            className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
            onClick={() => insertImage(image.base64)}
          />
        ))}
      </div>
    </div>
  );
}; 