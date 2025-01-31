import {
  Box,
  Card,
  CardBody,
  Code,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { GiHook } from "react-icons/gi";
import { TbDatabase, TbLanguage, TbListSearch } from "react-icons/tb";

const data = {
  useFormFormat: [
    {
      name: "updateOptions",
      params: [
        "selectData: { [key: string]: string[] }",
        "formFields: FormField<InputRenderList>[]",
      ],
      description: "Updates select options with dynamic data",
      example: `updateOptions({ country: ['Brazil', 'Urugay'] }, formConfig)`,
      icon: TbListSearch,
    },
    {
      name: "updateLabels",
      params: [
        "labelsData:  { [key: string]: string }",
        "formFields: FormConfig",
      ],
      description: "Updates field labels, useful for translations",
      example: `updateLabels({ country: 'País' }, formConfig)`,
      icon: TbLanguage,
    },
    {
      name: "updateInitialValues",
      params: [
        "initialValues:  { [key: string]: string }",
        "formFields: FormConfig",
      ],
      description:
        "Updates form initial values with dynamic data, useful for editing forms with existing data from an API",
      example: `updateInitialValues({ country: 'Brazil' }, formConfig)`,
      icon: TbDatabase,
    },
  ],
};

const Hooks = () => {
  const accentColor = useColorModeValue("blue.600", "blue.200");
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
              Utility Hooks
            </Heading>
            <Stack spacing={"5rem"}>
              {/* useFormFormat Hook */}
              <Box>
                <Heading as="h3" fontSize="2xl" mb={4} color="gray.700">
                  <Code colorScheme="blue" fontSize="inherit">
                    useFormFormat()
                  </Code>
                  <Text as="span" ml={2} fontSize="md" color="gray.500">
                    Core Utility Hook
                  </Text>
                </Heading>

                <Text fontSize="lg" color="gray.600" mb={6}>
                  Provides dynamic form configuration utilities for handling
                  API-driven form elements and dynamic data, like translations.
                  Essential for managing asynchronous data in complex forms. 
                  ATENTION - For this hook to work, you need to have enableReinitialize set to true in the useFormGenerator hook.
                </Text>

                <Stack spacing={8}>
                  {/* Function Cards */}
                  {data.useFormFormat.map((func, idx) => (
                    <Box
                      key={idx}
                      pl={4}
                      borderLeft="4px solid"
                      borderColor={accentColor}
                    >
                      <Stack spacing={4}>
                        <HStack spacing={3}>
                          <Icon as={func.icon} boxSize={6} color="blue.500" />
                          <Code fontSize="lg" colorScheme="blue">
                            {func.name}
                          </Code>
                        </HStack>

                        <Text fontSize="md" color="gray.600">
                          {func.description}
                        </Text>

                        <Box bg={codeBg} p={4} borderRadius="md">
                          <Text fontSize="sm" color="gray.500" mb={2}>
                            Function Signature
                          </Text>
                          <Code whiteSpace="pre-wrap" colorScheme="gray">
                            {`(${func.params.join(", ")}): FormConfig`}
                          </Code>
                        </Box>

                        <Box>
                          <Text fontSize="sm" color="gray.500" mb={2}>
                            Usage Example
                          </Text>
                          <Code whiteSpace="pre-wrap" colorScheme="green">
                            {func.example}
                          </Code>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Box>
              
            </Stack>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Hooks;
