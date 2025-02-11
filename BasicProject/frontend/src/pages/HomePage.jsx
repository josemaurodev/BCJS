import { Container, VStack, Text, Heading } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Container maxW="container.sm" py={12}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={"8"}>
          Current Products
        </Heading>
      </VStack>
    </Container>
  );
};

export default HomePage;
