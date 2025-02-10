import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import CreatePage from "./pages/createPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { useColorModeValue } from "./components/ui/color-mode";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("blue.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
      </Routes>
    </Box>
  );
}

export default App;
