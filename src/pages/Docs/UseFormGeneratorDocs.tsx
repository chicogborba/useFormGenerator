import {
    Box,
    Card,
    CardBody,
    Code,
    Divider,
    Heading,
    HStack,
    Icon,
    Stack,
    Text,
    useColorModeValue,
    UnorderedList,
    ListItem,
  } from "@chakra-ui/react";
  import { GiHook } from "react-icons/gi";
  import { TbListDetails, TbPlugConnected } from "react-icons/tb";
  
  const hookData = {
    parameters: [
      {
        name: "formFields",
        type: "FormField<InputRenderList>[]",
        description: "Array of form field configurations",
        required: true,
        icon: TbListDetails,
      },
      {
        name: "onSubmit",
        type: "(values: { [key: string]: string }) => void",
        description: "Form submission handler",
        required: true,
        icon: TbPlugConnected,
      },
      {
        name: "validateOnBlur",
        type: "boolean (optional)",
        description: "Enables validation onBlur",
        default: "true",
        icon: TbListDetails,
      },
      {
        name: "validateOnChange",
        type: "boolean (optional)",
        description: "Enables validation onChange",
        icon: TbListDetails,
      },
      {
        name: "enableReinitialize",
        type: "boolean (optional)",
        description: "Enables field reinitialization",
        icon: TbListDetails,
      },
    ],
    returns: [
      {
        name: "formik",
        type: "FormikContextType<any>",
        description: "Complete Formik instance",
      },
      {
        name: "handleSubmit",
        type: "(e?: React.FormEvent) => void",
        description: "Form submission handler",
      },
      {
        name: "values",
        type: "{ [key: string]: string }",
        description: "Current form values",
      },
      {
        name: "errors",
        type: "{ [key: string]: string }",
        description: "Current validation errors",
      },
      {
        name: "touched",
        type: "{ [key: string]: boolean }",
        description: "Fields that have been interacted with",
      },
      {
        name: "setFieldValue",
        type: "(field: string, value: any) => void",
        description: "Function to programmatically update field values",
      },
      
    ],
  };
  
  const UseFormGeneratorDocs = () => {
    const accentColor = useColorModeValue("purple.600", "purple.200");
    const codeBg = useColorModeValue("gray.100", "gray.700");
  
    return (
      <Box as="section" mt={12}>
        <Card bg={"white"} boxShadow="lg" borderRadius="2xl">
          <CardBody p={{ base: 6, md: 8 }}>
            <Stack spacing={8}>
              <Heading
                as="h2"
                fontSize="3xl"
                fontWeight="bold"
                color={accentColor}
                display="flex"
                alignItems="center"
                gap={3}
              >
                <Icon as={GiHook} boxSize={8} />
                useFormGenerator()
              </Heading>
  
              <Text fontSize="lg" color="gray.600">
                Main hook for managing dynamic forms. Automatically integrates
                validation, submission, and form state using Formik and Yup.
              </Text>
  
              <Divider />
  
              {/* Parameters Section */}
              <Box>
                <Heading as="h3" fontSize="xl" mb={4} color={accentColor}>
                  Parameters
                </Heading>
  
                <Stack spacing={6}>
                  {hookData.parameters.map((param, idx) => (
                    <Box
                      key={idx}
                      pl={4}
                      borderLeft="4px solid"
                      borderColor={accentColor}
                    >
                      <Stack spacing={3}>
                        <HStack spacing={3}>
                          <Icon as={param.icon} boxSize={6} color={accentColor} />
                          <Code fontSize="md" colorScheme="purple">
                            {param.name}
                          </Code>
                          <Text fontSize="sm" color="gray.500">
                            {param.type}
                          </Text>
                          {param.default && (
                            <Text fontSize="sm" color="green.600">
                              Default: {param.default}
                            </Text>
                          )}
                        </HStack>
  
                        <Text fontSize="md" color="gray.600">
                          {param.description}
                        </Text>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Box>
  
              <Divider />
  
              {/* Return Values Section */}
              <Box>
                <Heading as="h3" fontSize="xl" mb={4} color={accentColor}>
                  Return Values
                </Heading>
  
                <UnorderedList spacing={3}>
                  {hookData.returns.map((ret, idx) => (
                    <ListItem key={idx} ml={4}>
                      <HStack align="baseline" spacing={3}>
                        <Code fontSize="md" colorScheme="purple">
                          {ret.name}
                        </Code>
                        <Text fontSize="sm" color="gray.500">
                          {ret.type}
                        </Text>
                      </HStack>
                      <Text fontSize="md" color="gray.600" ml={7}>
                        {ret.description}
                      </Text>
                    </ListItem>
                  ))}
                </UnorderedList>
              </Box>
  
              <Divider />
  
              {/* Usage Example */}
              <Box>
                <Heading as="h3" fontSize="xl" mb={4} color={accentColor}>
                  Usage Example
                </Heading>
  
                <Box bg={codeBg} p={4} borderRadius="md">
                  <Code whiteSpace="pre-wrap" display="block" colorScheme="gray">
                    {`const MyForm = () => {
      const { formik } = useFormGenerator({ formFields, onSubmit });
    
      return (
        <FormGenerator
          formFields={finalFormFields}
          inputTypes={inputTypes} // inputTypes is an object with input component types
          templateColumns="repeat(2, 1fr)"
          gap={4}
          formik={formik}
        />
      );
    };`}
                  </Code>
                </Box>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    );
  };
  
  export default UseFormGeneratorDocs;