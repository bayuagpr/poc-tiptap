import React, { useEffect, useState } from 'react';
import Editor from './components/Editor';
import VariableForm from './components/VariableForm';
import { useEditorStore } from './store/editorStore';
import { FileText } from 'lucide-react';
import { Variable } from './types';
import { saveFile, importFile } from './utils/saveFile';
import { 
  Box, 
  Container, 
  Flex, 
  Heading, 
  Button, 
  Grid, 
  VStack,
} from '@chakra-ui/react';
import { Preview } from './components/Preview';
import { extractContent, extractWatermarkDetails } from './utils/editorUtils';

// Mock data for demonstration
const MOCK_VARIABLES: Variable[] = [
  { id: '1', name: 'learner_id', type: 'text', label: 'Learner ID', value: '' },
  { id: '2', name: 'learner_name', type: 'text', label: 'Learner Name', value: '' },
  { id: '3', name: 'course_name', type: 'text', label: 'Course Name', value: '' },
];

function App() {
  const { setVariables, editorContent, setEditorContent } = useEditorStore();
  const [content, setContent] = useState('');

  useEffect(() => {
    setVariables(MOCK_VARIABLES);
  }, []);

  const handleImport = async () => {
    const content = await importFile();
    if (content) {
      setContent(content);
      setEditorContent(content);
    }
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
            <Flex gap={2}>
              <Button onClick={handleImport} colorScheme="gray">
                Import Template
              </Button>
              <Button
                onClick={() => saveFile(editorContent)}
                colorScheme="blue"
                _hover={{ bg: 'blue.700' }}
                _focus={{ ring: 2, ringOffset: 2, ringColor: 'blue.500' }}
              >
                Save Template
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Container as="main" maxW="1400px" px={4} py={8}>
        <Grid templateColumns={{ base: "1fr", lg: "auto 300px" }} gap={8}>
          <VStack spacing={8} align="stretch">
            <Box overflow="auto">
              <Editor 
                initialContent={extractContent(content)}
                watermark={extractWatermarkDetails(editorContent)}
                onChange={setEditorContent}
              />
            </Box>
            <Preview />
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