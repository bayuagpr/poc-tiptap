import { Box, Heading } from '@chakra-ui/react';
import { useEditorStore } from '../store/editorStore';
import DOMPurify from 'dompurify';

export function Preview() {
  const { editorContent, variables } = useEditorStore();

  const getPreviewContent = () => {
    let previewText = editorContent;
    variables.forEach((variable) => {
      const regex = new RegExp(`{{\\s*${variable.name}\\s*}}`, 'g');
      previewText = previewText.replace(regex, variable.value || `{{${variable.label}}}`);
    });
    return previewText;
  };

  return (
    <Box bg="white" borderRadius="lg" boxShadow="base" p={6}>
      <Heading as="h2" size="md" mb={4}>Preview</Heading>
      <Box>
        <Box
          bg="white"
          boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px, rgba(0, 0, 0, 0.1) 0px 1px 6px"
          w="fit-content"
        >
          <div
            style={{ width: "fit-content" }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(getPreviewContent())
            }}
          />
        </Box>
      </Box>
    </Box>
  );
} 