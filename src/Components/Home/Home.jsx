import React, { useEffect, useState } from "react";
import { Button, Flex, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { Categories } from "./Categories";
import axios from "axios";

// Function to fetch category-specific data
const getData = async (category) => {
  try {
    const response = await axios.get(
      // `https://fakestoreapi.com/products/category/${category}`,
      `https://hm-backend-wdt8.onrender.com/products/${category}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching category data:", error);
    return [];
  }
};

export const HomeComp = () => {
  const [arrivalData, setArrivalData] = useState([]);
  const [activeArrival, setActiveArrival] = useState("ladies");

  // Function to handle category clicks and fetch data
  const handleArrivals = (category) => {
    setActiveArrival(category);
    getData(category).then((data) => {
      setArrivalData(data);
    });
  };

  // Fetch the default "ladies" category on component mount
  useEffect(() => {
    handleArrivals("ladies");
  }, []);

  return (
    <div className={styles.home}>
      {/* Section 1 */}
      <div className={styles.home_section_1}>
        <Box className={styles.price_box}>
          <Text>Rs. 2,999.00</Text>
          <Text fontWeight="bold" cursor="pointer">
            Appliquéd Jacket &gt;
          </Text>
        </Box>

        <Box className={styles.overlay_text}>
          <Text className={styles.title}>Winter neutrals</Text>
          <Flex justifyContent="center" mt="10px">
            <Link to="/category/Women">
              <Button className={styles.button} _hover={{ bg: "gray.700" }}>
                Shop now
              </Button>
            </Link>
          </Flex>
        </Box>
      </div>

      {/* Section 2 */}
      <div className={styles.home_section_2}>
        <Box className={styles.price_box}>
          <Text>Rs. 2,299.00</Text>
          <Text fontWeight="bold" cursor="pointer">
            Loose Fit Printed hoo...
          </Text>
        </Box>

        <Box className={styles.overlay_text}>
          <Text className={styles.title}>Sleek sport</Text>
          <Text className={styles.subtitle}>
            Everyday apparel with tech details and dynamic graphics.
          </Text>
          <Flex justifyContent="flex-start" mt="10px">
            <Link to="/category/ladies">
              <Button className={styles.button} _hover={{ bg: "gray.700" }}>
                Shop now
              </Button>
            </Link>
          </Flex>
        </Box>
      </div>

      {/* Shop Box */}
      <div className={styles.shop_box}>
        <Text className={styles.title}>Sweats & hoodies season</Text>
        <Text className={styles.subtitle}>
          Discover the perfect winter essentials starting at ₹799
        </Text>
        <Flex justifyContent="center" gap="10px" mt="20px">
          <Link to="/category/ladies">
            <Button className={styles.button}>Ladies</Button>
          </Link>
          <Link to="/category/men">
            <Button className={styles.button}>Men</Button>
          </Link>
          <Link to="/category/kids-baby">
            <Button className={styles.button}>Kids & Baby</Button>
          </Link>
        </Flex>
      </div>

      {/* Categories */}
      <div className={styles.category_box}>
        <Text textAlign="left" fontSize="xl" fontWeight="500">
          Men Bestsellers
        </Text>
        <Categories />
      </div>

      {/* Section 3 */}
      <div className={styles.home_section_3}>
        <Box className={styles.price_box}>
          <Text color="red" fontWeight="bold">
            Out of stock
          </Text>
          <Text>Rs. 2,699.00</Text>
          <Text fontWeight="bold" cursor="pointer">
            Jacquard-weave A-line...
          </Text>
        </Box>

        <Box className={styles.overlay_text}>
          <Text className={styles.title}>Limited edition</Text>
          <Text className={styles.subtitle}>
            Exclusive party wear, accessories, dresses, tights and more.
          </Text>
          <Flex justifyContent="flex-start" mt="10px">
            <Link to="/category/kids">
              <Button className={styles.button} _hover={{ bg: "gray.700" }}>
                Shop 2–8y
              </Button>
            </Link>
          </Flex>
        </Box>
      </div>

      {/* Gift Box */}
      <div className={styles.gift_box}>
        <Text className={styles.title}>Holiday gift guide</Text>
        <Text className={styles.subtitle}>
          Find the perfect presents this holiday season.
        </Text>
        <Flex justifyContent="center" gap="10px" mt="10px">
          <Link to="/category/ladies">
            <Button className={styles.button}>Ladies</Button>
          </Link>
          <Link to="/category/men">
            <Button className={styles.button}>Men</Button>
          </Link>
          <Link to="/category/baby">
            <Button className={styles.button}>Baby</Button>
          </Link>
          <Link to="/category/kids">
            <Button className={styles.button}>Kids</Button>
          </Link>
          <Link to="/category/home">
            <Button className={styles.button}>Home</Button>
          </Link>
        </Flex>
      </div>
      {/* section-4 */}
      <div className={styles.home_section_4}>
        {/* Overlay Text */}
        <Box className={styles.overlay_text}>
          <Text className={styles.title}>A winter knit curation</Text>
          <Text className={styles.subtitle}>
            Discover your look with our staple knitwear styles
          </Text>
          <Flex justifyContent="flex-start" mt="10px">
            <Link to="/category/winter-knit">
              <Button className={styles.button} _hover={{ bg: "gray.700" }}>
                Shop now
              </Button>
            </Link>
          </Flex>
        </Box>
      </div>
    </div>
  );
};
