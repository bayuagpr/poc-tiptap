import { Editor } from '@tiptap/react';
import { useState } from 'react';
import { Box, Input, Grid, Image } from '@chakra-ui/react';

interface Image {
  id: string;
  base64: string;
  width: number;
  height: number;
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
        const img = new window.Image();
        img.onload = () => {
          const newImage = {
            id: crypto.randomUUID(),
            base64: reader.result as string,
            width: img.width,
            height: img.height
          };
          setImages(prev => [...prev, newImage]);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const insertImage = (base64: string, width: number, height: number) => {
    if (editor) {
      // editor.chain().focus().setImage({ src: base64 }).run();
      editor.commands.setImage({
        src: base64,
        align: 'center',
        float: false,
        width,
        height
      })
    }
  };

  return (
    <Box w="64" borderLeft="1px" borderColor="gray.200" p={4}>
      <Box mb={4}>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          variant="unstyled"
          sx={{
            '::file-selector-button': {
              mr: 4,
              py: 2,
              px: 4,
              borderRadius: 'full',
              border: 'none',
              fontSize: 'sm',
              fontWeight: 'semibold',
              bg: 'blue.50',
              color: 'blue.700',
              _hover: { bg: 'blue.100' }
            }
          }}
        />
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        {images.map((image) => (
          <Image
            key={image.id}
            src={image.base64}
            alt="Uploaded image"
            h="24"
            objectFit="cover"
            borderRadius="md"
            cursor="pointer"
            _hover={{ opacity: 0.8 }}
            onClick={() => insertImage(image.base64, image.width, image.height)}
          />
        ))}
      </Grid>
    </Box>
  );
}; 