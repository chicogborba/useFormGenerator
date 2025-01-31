import { Flex, HStack, Text } from "@chakra-ui/react"
import { FaCogs } from "react-icons/fa"
import { IoLogoGithub, IoMdHelpCircle } from "react-icons/io"
import { TbForms } from "react-icons/tb"
import { useNavigate } from "react-router-dom"


const Topbar = () => {

  const navigate = useNavigate();


    return (
        <Flex
        // bg="blue.500"
        bgGradient="linear(to-r, blue.400, purple.600)"
        w="100%"
        p={4}
        color="white"
        textAlign="center"
        justifyContent={"space-between"}
      >
        <HStack gap={2}>
          <TbForms size={"30px"} />
          <Text fontSize="xl" fontWeight="bold">
            React useFormGenerator
          </Text>
        </HStack>
        <HStack gap={8}>
          <HStack gap={2} onClick={() => navigate("/")}>
            <IoMdHelpCircle size={"20px"} />
            <Text fontSize="xl" fontWeight="bold" _hover={{ cursor: "pointer", textDecoration: "underline" }}>
              Docs
            </Text>
          </HStack>
          <HStack gap={2} onClick={() => navigate("/generator")}>
            <FaCogs size={"20px"} />
            <Text fontSize="xl" fontWeight="bold" _hover={{ cursor: "pointer", textDecoration: "underline" }}>
              Generator
            </Text>
          </HStack>
          <HStack gap={2} onClick={() => navigate("/")}>
            <IoLogoGithub size={"20px"} />
            <Text fontSize="xl" fontWeight="bold" _hover={{ cursor: "pointer", textDecoration: "underline" }}>
              Github
            </Text>
          </HStack>
        </HStack>
      </Flex>
    )
}

export default Topbar