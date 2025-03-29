import {
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import styles from "./NavbarItems.module.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavbarSec = ({ comp, list, onClick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`category/${onClick}`);
      onClose(); 
  };

  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        mx={1}
        py={[1, 2, 2]}
        px={4}
        onClick={handleClick}
        zIndex="10000000000"
        _hover={{
          bg: useColorModeValue("gray.100", "gray.800"),
          borderBottom: "1px solid var(--text-color)",
        }}
        _focus={{
          border: "1px solid var(--text-color)",
        }}
        fontWeight="400"
        color={"var(--text-color)"}
        fontSize={"16px"}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        transition="all 0.2 ease"
      >
        {comp}
      </MenuButton>

      <MenuList
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        zIndex="10000000000"
        border="none"
        boxShadow="lg"
        borderRadius="md"
        backgroundColor="var(--color-bg)"
        borderBottom="2px solid var(--text-color)"
        minWidth="180px" // Reduced width to make MenuList smaller
        py={2} // Added padding to give some breathing space
      >
        <div className={styles.nav_drop_down}>
          {list.map((el, i) => (
            <Stack key={i} spacing={2} px={3} py={2} align="flex-start">
              <Text
                fontWeight="500"
                fontSize="16px"
                color="gray.600"
                _hover={{ color: "var(--text-color)" }}
              >
                {el.key}
              </Text>
              {el?.key_data?.map((item) => (
                <Link to={`/category/${onClick}`} key={item}>
                  <Text
                    cursor="pointer"
                    _hover={{ color: "var(--text-color)" }}
                    fontSize="14px"
                    color="gray.500"
                    textAlign="left" // Ensure text is left-aligned
                  >
                    {item}
                  </Text>
                </Link>
              ))}
            </Stack>
          ))}
        </div>
      </MenuList>
    </Menu>
  );
};
