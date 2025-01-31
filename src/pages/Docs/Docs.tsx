import {
  Box,
  Stack,
  Text,
  Heading,
  Code,
  SimpleGrid,
  useColorModeValue,
  HStack,
  Icon,
  Card,
  CardBody,
  Divider,
} from "@chakra-ui/react";
import {
  TbForms,
  TbGitBranch,
  TbCode,
  TbChecklist,
  TbBrandTypescript,
  TbFile,
  TbFolder,
} from "react-icons/tb";
import Hooks from "./Hooks";
import Overview from "./Overview";
import UseFormGeneratorDocs from "./UseFormGeneratorDocs";

const Docs = () => {
  const accentColor = useColorModeValue("blue.600", "blue.200");
  const codeBg = useColorModeValue("gray.100", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");

  const features = [
    {
      title: "Automatic Validation",
      icon: TbChecklist,
      description: "Dynamic Yup schema generation based on form configuration",
    },
    {
      title: "Formik Integration",
      icon: TbForms,
      description: "Seamless integration with Formik for state management",
    },
    {
      title: "Custom Components",
      icon: TbCode,
      description: "Use your input components with full customization",
    },
    {
      title: "Type Safety",
      icon: TbBrandTypescript,
      description: "Full TypeScript support with generated type definitions",
    },
  ];

  return (
    <Box maxWidth="1280px" mx="auto" p={{ base: 4, md: 8 }}>
      <Stack spacing={12}>
        {/* Hero Section */}
        <Box textAlign="center" py={16}>
          <HStack spacing={6} justifyContent="center" mb={6}>
            <Icon as={TbForms} boxSize={20} color={accentColor} />
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="extrabold"
              bgGradient="linear(to-r, blue.400, purple.600)"
              bgClip="text"
            >
              useFormGenerator
            </Heading>
          </HStack>
          <Text fontSize="xl" color="gray.500" maxW="800px" mx="auto">
            Simple form-generator for React applications
          </Text>
        </Box>

        {/* Features Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={16}>
          {features.map((feature, index) => (
            <Card key={index} bg={cardBg} boxShadow="md">
              <CardBody>
                <Stack align="center" textAlign="center" spacing={4}>
                  <Icon as={feature.icon} boxSize={8} color={accentColor} />
                  <Heading size="md">{feature.title}</Heading>
                  <Text fontSize="sm" color="gray.500">
                    {feature.description}
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {/* Main Content */}
        <Stack spacing={12} textAlign={"left"}>
          <Overview/>
          {/* Installation */}
          <Card bg={cardBg} boxShadow="lg">
            <CardBody>
              <Stack spacing={6}>
                <Heading as="h2" size="xl" color={accentColor}>
                  <Icon as={TbGitBranch} mr={3} />
                  Installation & Setup
                </Heading>

                {/* Installation Command */}
                <Box>
                  <Text fontSize="lg" color="gray.600" mb={2}>
                    Install from GitHub repository:
                  </Text>
                  <Code p={4} bg={codeBg} display="block" borderRadius="md">
                    npm install
                    git+https://github.com/yourusername/use-form-generator.git
                  </Code>
                </Box>

                <Divider />

                {/* File Structure */}
                <Box>
                  <Heading as="h3" size="lg" mb={4}>
                    Project Structure
                  </Heading>

                  <Text fontSize="lg" color="gray.600" mb={4}>
                    Create this directory structure in your project and copy
                    these core files:
                  </Text>

                  {/* File Tree Visualization */}
                  <Box
                    bg={codeBg}
                    p={4}
                    borderRadius="md"
                    fontFamily="monospace"
                    fontSize="md"
                  >
                    <Stack spacing={1}>
                      <HStack>
                        <Icon as={TbFolder} color="blue.500" boxSize={4} />
                        <Text>src/</Text>
                      </HStack>

                      <Box pl={6}>
                        <HStack>
                          <Icon as={TbFolder} color="blue.500" boxSize={4} />
                          <Text>forms/</Text>
                        </HStack>

                        <Box pl={6}>
                          <HStack>
                            <Icon as={TbFile} color="green.500" boxSize={4} />
                            <Text>FormGenerator.tsx</Text>
                          </HStack>
                          <HStack>
                            <Icon as={TbFile} color="green.500" boxSize={4} />
                            <Text>formTypes.ts</Text>
                          </HStack>
                          <HStack>
                            <Icon as={TbFile} color="green.500" boxSize={4} />
                            <Text>utils.ts</Text>
                          </HStack>
                          <HStack>
                            <Icon as={TbFolder} color="blue.500" boxSize={4} />
                            <Text>hooks/</Text>
                          </HStack>
                        </Box>
                      </Box>
                    </Stack>
                  </Box>

                  <Text mt={4} fontSize="sm" color="gray.500">
                    Required core files:
                    <Code mx={1}>FormGenerator.tsx</Code>,
                    <Code mx={1}>formTypes.ts</Code>,
                    <Code mx={1}>utils.ts</Code>
                  </Text>
                </Box>

                <Divider />

                {/* Custom Components */}
                <Box>
                  <Heading as="h3" size="lg" mb={4}>
                    Custom Inputs
                  </Heading>

                  <Text fontSize="lg" color="gray.600" mb={2}>
                    Create your custom input components in:
                  </Text>

                  <HStack bg={codeBg} p={4} borderRadius="md">
                    <Icon as={TbFile} color="green.500" boxSize={5} />
                    <Code>src/forms/inputTypes.tsx</Code>
                  </HStack>

                  <Text mt={4} fontSize="sm" color="gray.500">
                    Example structure:
                    <Code
                      display="block"
                      mt={2}
                      p={4}
                      bg={codeBg}
                      whiteSpace="pre-wrap"
                    >
                      {`export const inputTypes = {
  text: (props: RenderFormInputProps) => <YourTextInput {...props} />,
  // Add your custom components here
};`}
                    </Code>
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>

          <UseFormGeneratorDocs/>
          <Hooks />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Docs;
