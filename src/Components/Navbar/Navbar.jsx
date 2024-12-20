import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useToast,
} from "@chakra-ui/react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logohm.png";
import { CiUser, CiSearch, CiHeart, CiBag1 } from "react-icons/ci";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MobileNavbar } from "./MobileNavbar";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { NavbarSec } from "./NavbarItems";
import { Link, useNavigate } from "react-router-dom";

// const list = ["hello", "hello", "hello"];
const ladies = [
  {
    key: "Offers",
    key_data: ["Member Exclusive Prices", "Sale", "Special Deals"],
  },
  {
    key: "New Arrivals",
    key_data: ["Women's Clothing", "New In", "View All"],
  },
  {
    key: "Trending Now",
    key_data: ["Trending Now", "View All"],
  },
  {
    key: "Clothing",
    key_data: [
      "Tops",
      "Sweatshirts & Hoodies",
      "Knitwear",
      "Sweaters & Cardigans",
      "Jackets & Coats",
      "Dresses",
      "Shirts & Blouses",
      "Blazers & Waistcoats",
      "Jeans",
      "Trousers",
      "Nightwear",
      "Lingerie",
      "Shorts",
      "Skirts",
      "Basics",
      "Swimwear & Beachwear",
      "H&M Edition",
      "Merch & Graphics",
      "Jumpsuits",
      "Loungewear",
      "Socks & Tights",
      "Maternity Wear",
    ],
  },
  {
    key: "Sale",
    key_data: ["Premium Selection", "Care Products"],
  },
  {
    key: "Sport",
    key_data: [
      "New In",
      "Leggings & Tights",
      "Sport Bras",
      "Tops",
      "Hoodies & Sweatshirts",
      "Trousers & Joggers",
      "Shorts",
      "Dresses",
      "Outerwear",
      "Accessories & Equipment",
      "Socks",
      "Active Swimwear",
      "Maternity",
      "Training & Gym",
      "Running",
      "Yoga & Studio",
      "Hiking",
      "Skiing",
      "Racket Sports",
      "Swimming",
    ],
  },
  {
    key: "Accessories",
    key_data: [
      "Bags",
      "Jewellery",
      "Sunglasses",
      "Hair Accessories",
      "Belts",
      "Gloves",
      "Hats",
      "Scarves",
      "Shoes",
    ],
  },
  {
    key: "Shoes",
    key_data: [
      "Boots",
      "Flats",
      "Heels",
      "Loafers",
      "Sandals",
      "Slippers",
      "Slingback",
    ],
  },
];

const men = [
  {
    key: "Offers",
    key_data: [
      "Member Exclusive Prices",
      "Sweats & Hoodies: From ₹799",
      "Sale",
      "Special Deals",
    ],
  },
  {
    key: "New Arrivals",
    key_data: ["View All", "Clothes", "Shoes & Accessories"],
  },
  {
    key: "Trending Now",
    key_data: [
      "Outdoor Apparel",
      "Core Comfort",
      "Christmas Shop",
      "The Holiday Shop",
      "Gift Guide for Him",
    ],
  },
  {
    key: "Clothing",
    key_data: [
      "View All",
      "Hoodies & Sweatshirts",
      "Shirts",
      "T-shirts & Tops",
      "Jackets & Coats",
      "Trousers",
      "Jeans",
      "Sweaters & Cardigans",
      "Polos",
      "Basics",
      "Blazers & Suits",
      "Shorts",
      "Underwear",
      "Premium Selection",
      "Sleepwear & Loungewear",
      "Swimwear",
      "Socks",
    ],
  },
  {
    key: "Sport",
    key_data: [
      "New In",
      "Tops",
      "Sweatshirts & Hoodies",
      "Trousers & Joggers",
      "Shorts",
      "Outerwear",
      "Accessories & Equipment",
      "Sport Socks",
      "Training & Gym",
      "Running",
      "Hiking",
      "Racket Sports",
    ],
  },
  {
    key: "Accessories",
    key_data: [
      "View All",
      "Bags",
      "Belts & Suspenders",
      "Gloves",
      "Hats & Caps",
      "Jewellery",
      "Scarves",
      "Sunglasses",
      "Ties & Bowties",
      "Shoes",
    ],
  },
  {
    key: "Sustainability",
    key_data: ["H&M Take Care", "Learn More", "Sustainable Materials"],
  },
  {
    key: "The Essentials",
    key_data: ["About", "Core Collection"],
  },
  {
    key: "Spring Lookbook",
    key_data: [
      "Casual Looks",
      "Smart Looks",
      "Street Looks",
      "Party Wear",
      "Office Wear",
      "Loungewear",
    ],
  },
];
const home = [
  {
    key: "Offers",
    key_data: ["Member Exclusive Prices", "Sale", "Special Deals"],
  },
  {
    key: "New Arrivals",
    key_data: ["New Products", "Christmas Shop", "Holiday Shop", "Gifts"],
  },
  {
    key: "Shop by Room",
    key_data: [
      "Bedroom",
      "Living Room",
      "Bathroom",
      "Nursery",
      "Kids Room",
      "Kitchen",
      "Balcony & Outdoor",
    ],
  },
  {
    key: "Shop by Product",
    key_data: [
      "View All",
      "Interior Textiles",
      "Bedding & Blankets",
      "Decorations",
      "Cooking & Dining",
      "Bath & Shower",
      "Storage",
      "Sleep & Loungewear",
      "Kids & Baby",
      "Room Fragrance",
    ],
  },
  {
    key: "Trending Now",
    key_data: [
      "Home Essentials",
      "Colorburst Collection",
      "Scented Candles",
      "Latest Trends",
    ],
  },
  {
    key: "Sustainability",
    key_data: ["Meet the Maker", "Eco-Friendly Products"],
  },
  {
    key: "Magazine",
    key_data: ["Magazine", "Style Guides", "Home Inspiration"],
  },
];

const kids = [
  {
    key: "Offers",
    key_data: ["Member Exclusive Prices", "Shop Now", "Sale"],
  },
  {
    key: "Trending Now",
    key_data: ["Christmas Shop", "H&M Adorables", "The Character Shop"],
  },
  {
    key: "New Arrivals",
    key_data: [
      "Kids 2-8Y",
      "Kids 9-14Y",
      "Girls 2-8Y",
      "Boys 2-8Y",
      "Girls 9-14Y",
      "Boys 9-14Y",
    ],
  },
  {
    key: "Clothing",
    key_data: [
      "Outerwear",
      "Accessories",
      "H&M Adorables",
      "Sportswear",
      "Sale",
    ],
  },
  {
    key: "Shop by Product",
    key_data: [
      "View all",
      "New Arrivals",
      "Clothing",
      "Outerwear",
      "Accessories",
      "Shoes",
      "Sale",
    ],
  },
  {
    key: "Sustainability",
    key_data: ["H&M Take Care", "Learn More"],
  },
];

const sale = [
  {
    key: "Men",
    key_data: [
      "View All",
      "T-shirts & Tank Tops",
      "Shirts",
      "Trousers",
      "Hoodies & Sweatshirts",
      "Jeans",
      "Shoes",
      "Shorts",
      "Cardigans & Jumpers",
      "Jackets & Coats",
      "Knitwear",
      "Basics",
      "Suits & Blazers",
      "Underwear & Innerwear",
      "Socks",
      "Accessories",
      "Sportswear",
      "Care Products",
      "Sleepwear & Loungewear",
    ],
  },
  {
    key: "Women",
    key_data: [
      "View All",
      "Tops & T-shirts",
      "Dresses",
      "Trousers",
      "Blazers",
      "Shirts & Blouses",
      "Jeans",
      "Shoes",
      "Accessories",
      "Lingerie",
      "Nightwear",
      "Sweatshirts & Hoodies",
      "Cardigans & Sweaters",
      "Knitwear",
      "Jackets & Coats",
      "Loungewear",
      "Sportswear",
      "Skirts",
      "Shorts",
      "Basics",
    ],
  },
  {
    key: "Dividend",
    key_data: [
      "View All",
      "Tops",
      "Jeans",
      "Dresses",
      "Shirts & Blouses",
      "Accessories",
      "Divided - Basics",
      "Trousers & Leggings",
      "Divided - Skirts",
      "Shorts",
      "Underwear & Nightwear",
      "Swimwear",
      "Shoes",
      "Cardigans & Jumpers",
      "Hoodies & Sweatshirts",
      "Jackets & Coats",
      "Care Products",
      "Sale",
    ],
  },
  {
    key: "Kids",
    key_data: [
      "View All",
      "New Arrivals",
      "Clothing",
      "Outerwear",
      "Accessories",
      "Shoes",
      "Sale",
    ],
  },
  {
    key: "Sports",
    key_data: [
      "View All",
      "New Arrivals",
      "Clothing",
      "Outerwear",
      "Accessories & Equipment",
    ],
  },
];

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  // Function for Sign Out
  const signOut = () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    toast({
      title: "Logged out successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    navigate("/"); // Redirect to home page after logout
  };

  // Function for Sign In
  const handleSignIn = () => {
    // Check if email and password are correct (just for demonstration, you can implement actual logic)
    const user = { email, password: pass }; // You can enhance this logic to validate credentials
    localStorage.setItem("user", JSON.stringify(user)); // Save user data to localStorage
    toast({
      title: "Logged in successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };

  // Function to go to the sign up page
  const goToSignUp = () => {
    onClose();
    navigate("/signup");
  };

  // Get the user data from localStorage to check if the user is authenticated
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuth = user !== null;

  return (
    <div className={styles.navbar_box}>
      <div className={styles.nav}>
        <div className={styles.mobile_nav}>
          <MobileNavbar />
        </div>
        <div className={styles.navbar_box_1}>
          <div>
            <Text className={styles.navbar_box_1_text}>Sustainability</Text>
            <Text className={styles.navbar_box_1_text}>Customer Service</Text>
            <Text className={styles.navbar_box_1_text}>Newsletter</Text>
            <Text className={styles.navbar_box_1_text}>
              <BiDotsHorizontalRounded fontSize={"20px"} />
            </Text>
          </div>
          <div>
            <Link to="/">
              <Image src={logo} className={styles.website_logo} alt="hm_logo" />
            </Link>
          </div>
          <div>
            {isAuth ? (
              <Menu>
                <MenuButton>
                  <Flex alignItems={"center"}>
                    <CiUser fontSize={"24px"} />
                    <Text className={styles.navbar_box_1_text}>My Account</Text>
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={signOut}>Log Out</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Flex alignItems={"center"} onClick={onOpen}>
                <CiUser fontSize={"24px"} />
                <Text className={styles.navbar_box_1_text}>Sign In</Text>
              </Flex>
            )}

            {/* Modal for Sign In */}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent borderRadius={"0"} background="var(--color-bg)">
                <ModalHeader>Sign In</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    Become a member — don’t miss out on deals, offers,
                    discounts, and bonus vouchers.
                  </Text>
                  <FormControl isRequired>
                    <FormLabel fontWeight={"400"} marginTop="14px">
                      Email
                    </FormLabel>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      borderRadius={"0"}
                      focusBorderColor="green.400"
                      colorScheme={"green"}
                    />
                    <FormHelperText>
                      We'll never share your email.
                    </FormHelperText>
                    <FormLabel fontWeight={"400"} marginTop="14px">
                      Password
                    </FormLabel>
                    <InputGroup>
                      <Input
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        type={show ? "text" : "password"}
                        borderRadius={"0"}
                        focusBorderColor="green.400"
                        colorScheme={"green"}
                      />
                      <InputRightElement width="4.5rem">
                        <Text size="sm" onClick={handleClick} cursor="pointer">
                          {show ? "Hide" : "Show"}
                        </Text>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <Text
                    color={"GrayText"}
                    _hover={{ textDecoration: "underline" }}
                    cursor="pointer"
                    marginTop={"10px"}
                    onClick={goToSignUp}
                  >
                    Not a member yet? Join here!
                  </Text>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme={"blackAlpha"}
                    background="var(--text-color)"
                    width={"100%"}
                    borderRadius="0"
                    onClick={handleSignIn} // Sign in logic
                  >
                    Sign In
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

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
                  Shopping Bag (
                  {JSON.parse(localStorage.getItem("cart"))?.length || 0})
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
    </div>
  );
};
