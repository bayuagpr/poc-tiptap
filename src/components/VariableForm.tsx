import { Box, VStack, Heading, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useEditorStore } from '../store/editorStore';

export const VariableForm = () => {
  const { variables, updateVariable } = useEditorStore();

  return (
    <Box maxW="md" mx="auto" bg="white" borderRadius="lg" boxShadow="lg" p={6}>
      <Heading size="md" mb={4} fontWeight="semibold">Template Variables</Heading>
      <VStack spacing={4}>
        {variables.map((variable) => (
          <FormControl key={variable.id}>
            <FormLabel htmlFor={variable.id}>
              {variable.label}
            </FormLabel>
            <Input
              type={variable.type}
              id={variable.id}
              value={variable.value}
              onChange={(e) => updateVariable(variable.id, e.target.value)}
              focusBorderColor="blue.500"
            />
          </FormControl>
        ))}
      </VStack>
    </Box>
  );
};

export default VariableForm;