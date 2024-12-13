import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import kitty from "../../assets/categories/imgGirl.jpg";
const HelloKittyBanner = () => {
  return (
    <Box
      className="home_section_1"
      w="690px"
      h="693.98px"
      bgImage={kitty}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="20px"
      border="1px solid var(--color-bg)"
    >
      <Box>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          Hello Kitty and Friends X H&M
        </Text>
        <Text fontSize="md" color="white">
          Discover our latest collaboration
        </Text>
      </Box>
      <Button
        alignSelf="flex-start"
        bg="white"
        color="black"
        _hover={{ bg: "black", color: "white" }}
        mt="10px"
      >
        Shop now
      </Button>
    </Box>
  );
};

export default HelloKittyBanner;
