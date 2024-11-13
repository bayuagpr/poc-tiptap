import { Box, Heading } from '@chakra-ui/react';
import { useEditorStore } from '../store/editorStore';
import DOMPurify from 'dompurify';
import { wrapContentWithPageConfig } from '../utils/editorUtils';
import { useMemo, useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';

export function Preview() {
  const { editorContent, variables, config } = useEditorStore();
  
  // Create a ref to store the current content for debouncing
  const contentRef = useRef(editorContent);
  const [debouncedContent, setDebouncedContent] = useState(editorContent);

  // Update ref when content changes
  useEffect(() => {
    contentRef.current = editorContent;
  }, [editorContent]);

  // Create debounced update function
  const debouncedUpdate = useMemo(
    () => debounce((content: string) => {
      setDebouncedContent(content);
    }, 300),
    []
  );

  // Apply debouncing to content updates
  useEffect(() => {
    debouncedUpdate(editorContent);
    return () => {
      debouncedUpdate.cancel();
    };
  }, [editorContent, debouncedUpdate]);

  // Memoize preview content generation using debounced content
  const previewContent = useMemo(() => {
    let previewText = debouncedContent;
    variables.forEach((variable) => {
      const regex = new RegExp(`{{\\s*${variable.name}\\s*}}`, 'g');
      previewText = previewText.replace(regex, variable.value || `{{${variable.label}}}`);
    });

    return DOMPurify.sanitize(
      wrapContentWithPageConfig(previewText, {
        paperSize: config.paperSize,
        dpi: config.dpi,
        orientation: config.orientation,
        padding: config.padding
      }, config.watermark)
    );
  }, [debouncedContent, variables, config]);

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
              __html: previewContent
            }}
          />
        </Box>
      </Box>
    </Box>
  );
} 