import React from 'react';
import { Editor } from '@tiptap/react';
import { Variable as VariableIcon } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

interface VariableSelectorProps {
  editor: Editor | null;
}

export const VariableSelector: React.FC<VariableSelectorProps> = ({ editor }) => {
  const { variables } = useEditorStore();

  if (!editor) return null;

  const insertVariable = (variable: string) => {
    editor
      .chain()
      .focus()
      .insertContent(`{{${variable}}}`)
      .run();
  };

  return (
    <Box borderBottom="1px" borderColor="gray.200" bg="white" p={2}>
      <Flex gap={2} flexWrap="wrap" alignItems="center">
        <Text fontSize="sm" fontWeight="medium" color="gray.700">
          Variables:
        </Text>
        {variables.map((variable) => (
          <Button
            key={variable.id}
            onClick={() => insertVariable(variable.name)}
            size="sm"
            variant="ghost"
            bg="blue.50"
            color="blue.700"
            _hover={{ bg: 'blue.100' }}
            display="inline-flex"
            alignItems="center"
            gap={1}
            px={2}
            py={1}
            borderRadius="md"
          >
            <VariableIcon style={{ width: '12px', height: '12px' }} />
            {variable.label}
          </Button>
        ))}
      </Flex>
    </Box>
  );
};