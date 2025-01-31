import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import GridSelector from "./pages/GridSelector";
import Instructions from "./pages/Instructions";
import { ChakraProvider, Flex, Stack, Box } from "@chakra-ui/react";
import Topbar from "./components/Topbar";
import Docs from "./pages/Docs/Docs";

const pages = [
  {
    name: "FormObjectGenerator",
    path: "/generator",
    component: (
      <Stack gap={8}>
        <GridSelector />
        <Instructions />
      </Stack>
    ),
  },
  {
    name: "documentation",
    path: "/",
    component: <Docs />,
  },
  // Adicione mais rotas aqui se necessário
];

function App() {


  return (
    <ChakraProvider>
      <Router>
        <Flex
          gap={"4rem"}
          flexDir={"column"}
          bg={"gray.200"}
          h={"100vh"}
          overflow={"auto"}
          pb={"5rem"}
          w={"100vw"}
          alignItems={"center"}
        >
          <Topbar />
          <Box flex={1} w="100%" maxW="1200px" px={4}>
            <Routes>
              {pages.map((page, index) => (
                <Route key={index} path={page.path} element={page.component} />
              ))}
            </Routes>
          </Box>
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
