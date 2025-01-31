import { Box, Text, Flex, HStack, VStack, Code } from "@chakra-ui/react";
import {
  PiKeyReturnBold,
  PiMouseLeftClickFill,
  PiMouseRightClickFill,
} from "react-icons/pi";
import { FaRegTrashCan } from "react-icons/fa6";
import { AiTwotoneEdit } from "react-icons/ai";

const InstructionCard = ({
  icon,
  text,
  color,
}: {
  icon: React.ReactNode;
  text: string;
  color: string;
}) => (
  <Flex
    flexDir="column"
    align="center"
    bg="white"
    p={4}
    borderRadius={8}
    boxShadow="md"
    border="1px solid"
    borderColor="gray.200"
    w="120px"
  >
    <Box fontSize="3xl" color={color}>
      {icon}
    </Box>
    <Text fontSize="sm" fontWeight="medium" mt={2} textAlign="center">
      {text}
    </Text>
  </Flex>
);

const Instructions = () => {
  return (
    <Flex
      alignSelf={"center"}
      flexDir="column"
      gap={6}
      bg="gray.50"
      p={6}
      borderRadius={8}
      boxShadow="sm"
      border="1px solid"
      borderColor="gray.200"
      w="fit-content"
    >
      {/* Title */}
      <Text fontWeight="bold" fontSize="3xl" textAlign="center">
        📝 Instructions
      </Text>

      {/* Controls */}
      <VStack align="stretch" spacing={4}>
        <Text
          fontSize="lg"
          fontWeight="semibold"
          textAlign={"left"}
          ml={"2rem"}
        >
          🎮 Controls
        </Text>
        <HStack justifyContent="center" gap={4} wrap="wrap">
          <InstructionCard
            icon={<PiMouseLeftClickFill />}
            text="Select cell"
            color="blue.500"
          />
          <InstructionCard
            icon={<PiMouseRightClickFill />}
            text="Remove cell"
            color="red.500"
          />
          <InstructionCard
            icon={<AiTwotoneEdit />}
            text="Edit field"
            color="green.500"
          />
          <InstructionCard
            icon={<FaRegTrashCan />}
            text="Remove field"
            color="red.500"
          />
          <InstructionCard
            icon={<PiKeyReturnBold />}
            text="Add field"
            color="purple.500"
          />
        </HStack>
      </VStack>

      {/* How to Use */}
      <Box
        bg="white"
        p={4}
        borderRadius={8}
        boxShadow="md"
        border="1px solid"
        borderColor="gray.200"
        maxW="700px"
      >
        <Text
          fontSize="lg"
          fontWeight="semibold"
          textAlign={"left"}
          ml={"0.725rem"}
        >
          📖 How to Use
        </Text>
        <Text fontSize="lg" textAlign={"left"} color="gray.700" mt={2}>
          The initial idea is to select the ideal number of columns for your
          field. After that, simply press <Code>Enter</Code> to add a new field
          and fill in the necessary inputs. Once the entire form is complete,
          copy the generated code object below the grid and paste it into the{" "}
          <Code colorScheme={"cyan"}>formFields</Code> of the{" "}
          <Code colorScheme={"cyan"}>useFormGenerator</Code>.
        </Text>
      </Box>
    </Flex>
  );
};

export default Instructions;
