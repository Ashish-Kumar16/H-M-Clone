import {
  Button,
  IconButton,
  Image,
  Stack,
  Text,
  useDisclosure,
  useBreakpointValue, // Use this hook for responsive values
} from "@chakra-ui/react";
import React from "react";
import styles from "./Navbar.module.css";
import {
  Drawer,
  DrawerBody,
  // DrawerFooter,
  // DrawerHeader,
  // DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

// Import images directly
import ladiesImg from "../../assets/images/Ladies1.jpeg";
import menImg from "../../assets/images/Men1.jpeg";
import babyImg from "../../assets/images/Baby1.jpeg";
import kidsImg from "../../assets/images/Kids1.jpeg";
import homeImg from "../../assets/images/Home1.jpeg";
import saleImg from "../../assets/images/Sale1 (1).png";

export const MobileNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const navigate = useNavigate();

  // Menu items with image sources
  const menuItems = [
    { label: "Ladies", route: "ladies", imgSrc: ladiesImg },
    { label: "Men", route: "mens", imgSrc: menImg },
    { label: "Baby", route: "baby", imgSrc: babyImg },
    { label: "Kids", route: "kids", imgSrc: kidsImg },
    { label: "Home", route: "home", imgSrc: homeImg },
    { label: "Sale", route: "sale", imgSrc: saleImg },
  ];

  const handleClick = (route) => {
    onClose();
    navigate(`/category/${route}`);
  };

  // Use Chakra's breakpoint system to hide/show based on screen size
  const displayMobileNav = useBreakpointValue({
    base: "block", // Show on mobile
    md: "none", // Hide on medium (tablet) and larger screens
  });

  return (
    <div className={styles.mobile_nav}>
      {/* Display mobile navbar only on small screens (base) */}
      <Button
        ref={btnRef}
        onClick={onOpen}
        as={IconButton}
        colorScheme=""
        icon={<HamburgerIcon fontSize={"20px"} />}
        variant="outline"
        border={"none"}
        display={displayMobileNav} // Only show on mobile (base)
      ></Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xs"
      >
        <DrawerContent background={"var(--color-bg)"}>
          <DrawerCloseButton />
          <DrawerBody>
            <Stack marginTop="20px" gap="20px">
              {menuItems.map((item, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  cursor="pointer"
                  onClick={() => handleClick(item.route)}
                  _hover={{ color: "var(--text-color-hover)" }}
                >
                  <Image
                    src={item.imgSrc}
                    borderRadius="full"
                    boxSize="50px"
                    alt={item.label}
                  />
                  <Text fontSize="lg" fontWeight="500">
                    {item.label}
                  </Text>
                </Stack>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
