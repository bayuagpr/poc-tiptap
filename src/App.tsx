import React, { useEffect } from 'react';
import Editor from './components/Editor';
import VariableForm from './components/VariableForm';
import { useEditorStore } from './store/editorStore';
import { FileText } from 'lucide-react';
import { Variable } from './types';
import DOMPurify from 'dompurify';
import { saveFile } from './utils/saveFile';
import { 
  Box, 
  Container, 
  Flex, 
  Heading, 
  Button, 
  Grid, 
  VStack,
} from '@chakra-ui/react';

// Mock data for demonstration
const MOCK_VARIABLES: Variable[] = [
  { id: '1', name: 'learner_id', type: 'text', label: 'Learner ID', value: '' },
  { id: '2', name: 'learner_name', type: 'text', label: 'Learner Name', value: '' },
  { id: '3', name: 'course_name', type: 'text', label: 'Course Name', value: '' },
];

function App() {
  const { setVariables, editorContent, variables } = useEditorStore();

  useEffect(() => {
    // In a real app, this would be fetched from your API
    setVariables(MOCK_VARIABLES);
  }, []);

  const getPreviewContent = () => {
    let previewText = editorContent;
    variables.forEach((variable) => {
      const regex = new RegExp(`{{\\s*${variable.name}\\s*}}`, 'g');
      previewText = previewText.replace(regex, variable.value || `{{${variable.label}}}`);
    });
    return previewText;
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Box as="header" bg="white" boxShadow="sm">
        <Container maxW="7xl" px={4} py={4}>
          <Flex justify="space-between" align="center">
            <Flex align="center">
              <FileText style={{ width: "2rem", height: "2rem", color: "blue.600" }} />
              <Heading as="h1" ml={2} size="lg">Template Editor</Heading>
            </Flex>
            <Button
              onClick={() => saveFile(editorContent)}
              colorScheme="blue"
              _hover={{ bg: 'blue.700' }}
              _focus={{ ring: 2, ringOffset: 2, ringColor: 'blue.500' }}
            >
              Save Template
            </Button>
          </Flex>
        </Container>
      </Box>

      <Container as="main" maxW="1400px" px={4} py={8}>
        <Grid templateColumns={{ base: "1fr", lg: "auto 300px" }} gap={8}>
          <VStack spacing={8} align="stretch">
            <Box overflow="auto">
              <Editor />
            </Box>
            <Box bg="white" borderRadius="lg" boxShadow="base" p={6}>
              <Heading as="h2" size="md" mb={4}>Preview</Heading>
              <Box overflow="auto">
                <Box
                  mx="auto"
                  p={8}
                  minH="1056px"
                  w="816px"
                  bg="white"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px, rgba(0, 0, 0, 0.1) 0px 1px 6px"
                >
                  <Box position="relative">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(getPreviewContent())
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </VStack>
          <VStack spacing={8} align="stretch">
            <VariableForm />
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;