import React from "react";
import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaInstagram,
  FaTiktok,
  FaSpotify,
  FaYoutube,
  FaFacebook,
} from "react-icons/fa";
import logo from "../../assets/logohm.png";
// ListHeader Component
const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

// Footer Component
export const FooterC = () => {
  return (
    <Box bg={"#E4E4E4"} color={useColorModeValue("gray.700", "gray.200")}>
      {/* Typing SVG Section */}
      {/* <Image
        // src="https://readme-typing-svg.demolab.com/?font=Fira+Code&pause=1000&width=435&lines=Made+By+Ashish+Kumar"
        alt="Typing SVG"
        margin={"auto"}
        paddingTop={"15px"}
      /> */}

      {/* Footer Links & Content Section */}
      <Container as={Stack} maxW={{ base: "90%", md: "6xl" }} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          {/* Shop Section */}
          <Stack align={"flex-start"}>
            <ListHeader>Shop</ListHeader>
            <Link href={"#"}>Ladies</Link>
            <Link href={"#"}>Men</Link>
            <Link href={"#"}>Baby</Link>
            <Link href={"#"}>Kids</Link>
            <Link href={"#"}>Home</Link>
            <Link href={"#"}>Magazine</Link>
          </Stack>

          {/* Corporate Info Section */}
          <Stack align={"flex-start"}>
            <ListHeader>Corporate Info</ListHeader>
            <Link href={"#"}>Career at H&M</Link>
            <Link href={"#"}>About H&M Group</Link>
            <Link href={"#"}>Sustainability H&M Group</Link>
            <Link href={"#"}>Press</Link>
            <Link href={"#"}>Investor relations</Link>
            <Link href={"#"}>Corporate governance</Link>
          </Stack>

          {/* Help Section */}
          <Stack align={"flex-start"}>
            <ListHeader>Help</ListHeader>
            <Link href={"#"}>Customer Service</Link>
            <Link href={"#"}>My H&M</Link>
            <Link href={"#"}>Find a store</Link>
            <Link href={"#"}>Legal & privacy</Link>
            <Link href={"#"}>Contact</Link>
            <Link href={"#"}>Report a scam</Link>
            <Link href={"#"}>Cookie Notice</Link>
            <Link href={"#"}>Cookie Settings</Link>
          </Stack>

          {/* Social Media Signup Section */}
          <Stack align={"flex-start"}>
            <Text fontSize={"sm"}>
              Sign up now and be the first to know about exclusive offers,
              latest fashion news & style tips!
            </Text>
            <Link href={"#"} fontWeight={"bold"} fontSize={"sm"}>
              Read more →
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>

      {/* Social Media Icons Section */}
      <Flex justify={"center"} py={5}>
        <Stack direction={"row"} spacing={6}>
          <Link href="https://instagram.com" isExternal>
            <FaInstagram size={24} color="#000000" />
          </Link>
          <Link href="https://tiktok.com" isExternal>
            <FaTiktok size={24} color="#000000" />
          </Link>
          <Link href="https://spotify.com" isExternal>
            <FaSpotify size={24} color="#000000" />
          </Link>
          <Link href="https://youtube.com" isExternal>
            <FaYoutube size={24} color="#000000" />
          </Link>
          <Link href="https://facebook.com" isExternal>
            <FaFacebook size={24} color="#000000" />
          </Link>
        </Stack>
      </Flex>

      {/* Copyright Section */}
      <Text fontSize={"xs"} textAlign={"center"} mt={5}>
        The content of this site is copyright-protected and is the property of H
        & M Hennes & Mauritz AB.
      </Text>

      {/* Company Logo Section */}
      <Flex justify={"center"} mt={5}>
        <Image src={logo} alt="H&M Logo" boxSize="39px" height="26px" />
      </Flex>

      <Text fontSize={"xs"} textAlign={"center"} mt={2}>
        INDIA | Rs.
      </Text>
    </Box>
  );
};
