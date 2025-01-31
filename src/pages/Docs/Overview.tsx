import {
  Box,
  Card,
  CardBody,
  Code,
  Divider,
  Heading,
  Icon,
  Image,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { TbForms } from "react-icons/tb";
import { docsTexts } from "../../docsTexts";
import fieldExemple from "../../assets/imagens/fieldExemple.png";

const Overview = () => {
  const accentColor = useColorModeValue("blue.600", "blue.200");
  const codeBg = useColorModeValue("gray.100", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Card bg={cardBg} boxShadow="lg">
      <CardBody>
        <Stack spacing={8}>
          <Heading as="h2" size="xl" color={accentColor}>
            <Icon as={TbForms} mr={3} />
            Overview
          </Heading>

          <Text fontSize="lg" color="gray.600">
            useFormGenerator provides a standardized solution for creating and
            maintaining complex React forms with minimal boilerplate. It
            combines the power of Formik and Yup with a declarative
            configuration API, enabling developers to build robust forms faster
            while maintaining full customization capabilities.
          </Text>

          <Divider />

          {/* Quick Start */}
          <Box>
            <Heading as="h3" size="lg" mb={4}>
              Basic Usage
            </Heading>

            <Tabs variant="enclosed">
              <TabList>
                <Tab outline={"none"}>Code</Tab>
                <Tab outline={"none"}>Preview</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Code
                    whiteSpace="pre-wrap"
                    p={4}
                    bg={codeBg}
                    display="block"
                    borderRadius="md"
                  >
                    {docsTexts.exempleCode}
                  </Code>
                </TabPanel>
                <TabPanel>
                  <Image
                    src={fieldExemple}
                    alt="Form preview"
                    borderRadius="md"
                    boxShadow="sm"
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Overview;
