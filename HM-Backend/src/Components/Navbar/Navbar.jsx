import React, { useState } from "react";
import {
  Flex,
  Text,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { CiUser, CiSearch, CiHeart, CiBag1 } from "react-icons/ci";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/auth/authSlice"; // Importing Redux slice
import logo from "../../assets/logohm.png";
import { MobileNavbar } from "./MobileNavbar";
import { SignIn } from "../AuthModal/Signin";
import { NavbarSec } from "./NavbarItems";
import { ladies, men, kids, sale, home } from "./subCategory"; // Subcategories import
import styles from "./Navbar.module.css"; // Your CSS file

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // Access Redux store for authentication and cart
  // const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart.items);
  const isAuthenticated = !!user;

  const handleSignOut = () => {
    dispatch(signOut()); // Dispatch logout action
    toast({
      title: "Logged out successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    navigate("/"); // Redirect to home page
  };

  return (
    <div className={styles.navbar_box}>
      <div className={styles.nav}>
        <div className={styles.mobile_nav}>
          <MobileNavbar />
        </div>
        <div className={styles.navbar_box_1}>
          <div className={styles.navbar_left}>
            <Text className={styles.navbar_box_1_text}>Sustainability</Text>
            <Text className={styles.navbar_box_1_text}>Customer Service</Text>
            <Text className={styles.navbar_box_1_text}>Newsletter</Text>
            <Text className={styles.navbar_box_1_text}>
              <BiDotsHorizontalRounded fontSize={"20px"} />
            </Text>
          </div>

          <div className={styles.navbar_logo}>
            <Link to="/">
              <Image src={logo} className={styles.website_logo} alt="hm_logo" />
            </Link>
          </div>

          <div className={styles.navbar_right}>
            {isAuthenticated ? (
              <Menu>
                <MenuButton>
                  <Flex alignItems={"center"}>
                    <CiUser fontSize={"24px"} />
                    <Text className={styles.navbar_box_1_text}>
                      {user?.firstName || "My Account"}
                    </Text>
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Flex alignItems={"center"} onClick={() => setIsOpen(true)}>
                <CiUser fontSize={"24px"} />
                <Text className={styles.navbar_box_1_text}>Sign In</Text>
              </Flex>
            )}

            <Link to="/favourite">
              <Flex alignItems={"center"}>
                <CiHeart fontSize={"24px"} />
                <Text className={styles.navbar_box_1_text}>Favourites</Text>
              </Flex>
            </Link>

            <Flex alignItems={"center"} className={styles.mobile_search}>
              <CiSearch fontSize={"24px"} />
            </Flex>

            <Link to="/cart">
              <Flex alignItems={"center"}>
                <CiBag1 fontSize={"24px"} />
                <Text className={styles.navbar_box_1_text}>
                  Shopping Bag ({Array.isArray(cart) ? cart.length : 0})
                </Text>
              </Flex>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.navbar_box_2}>
        <div></div>
        <div className={styles.navbar_items}>
          <NavbarSec comp="Ladies" list={ladies} onClick="ladies" key={10} />
          <NavbarSec comp="Men" list={men} onClick="mens" key={20} />
          <NavbarSec comp="Kids" list={kids} onClick="kids" key={40} />
          <NavbarSec comp="HOME" list={home} onClick="home" key={50} />
          <NavbarSec comp="Sale" list={sale} onClick="sale" key={60} />
        </div>
        <div className={styles.comp_searchbar}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<CiSearch fontSize={"27px"} />}
            />
            <Input
              variant={"flushed"}
              placeholder="Search products"
              focusBorderColor="gray.100"
              fontSize={"16px"}
            />
          </InputGroup>
        </div>
      </div>

      {/* Sign In Modal */}
      <SignIn isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
