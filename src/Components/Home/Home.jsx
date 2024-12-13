import React, { useEffect, useState } from "react";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import img from "../../assets/f_home.png";
import img2 from "../../assets/swomen.png";
import img3 from "../../assets/training.png";
import { Categories } from "./Categories";
import { Scroller } from "./Categories/Scroller";
import axios from "axios";

// Function to fetch category-specific data
const getData = async (category) => {
  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`,
    );
    return response.data; // Return the product list directly
  } catch (error) {
    console.error("Error fetching category data:", error);
    return []; // Return empty array in case of error
  }
};

export const HomeComp = () => {
  const [arrivalData, setArrivalData] = useState([]); // Holds products for active category
  const [activeArrival, setActiveArrival] = useState("ladies"); // Default active category

  // Function to handle category clicks and fetch data
  const handleArrivals = (category) => {
    setActiveArrival(category); // Set active category
    getData(category).then((data) => {
      setArrivalData(data); // Update state with fetched products
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
        <div>
          <div></div>
          <div>
            <Image src={img} />
          </div>
          <Text
            fontSize="17px"
            color="#ffffff"
            fontWeight="600"
            marginBottom="20px"
          >
            The new collection is out now
          </Text>
          <Flex justifyContent="center" gap="10px" marginBottom="40px">
            <Link to="/category/ladies">
              <Button
                borderRadius="0"
                color="var(--text-color)"
                padding="8px"
                fontSize="14px"
                margin="0"
              >
                Shop Now
              </Button>
            </Link>
            <Button
              borderRadius="0"
              color="var(--text-color)"
              padding="8px"
              fontSize="14px"
              margin="0"
            >
              Get Inspired
            </Button>
          </Flex>
        </div>
      </div>

      {/* Section 2 */}
      <div className={styles.home_section_2}>
        <div>
          <div></div>
          <div>
            <Image src={img2} />
          </div>
          <Text
            fontSize="17px"
            color="#ffffff"
            fontWeight="600"
            marginBottom="20px"
          >
            The new collection is out now
          </Text>
          <Flex justifyContent="center" gap="10px" marginBottom="40px">
            <Link to="/category/ladies">
              <Button
                borderRadius="0"
                color="var(--text-color)"
                padding="8px"
                fontSize="14px"
                margin="0"
              >
                Shop Now
              </Button>
            </Link>
          </Flex>
        </div>
      </div>

      {/* Shop Box */}
      <div className={styles.shop_box}>
        <div>
          <Text color="#ffffff" fontWeight="600">
            The color burst collection
          </Text>
        </div>
        <div>
          <Text color="#ffffff" fontSize="13px">
            All the vibrant fits for this spring!
          </Text>
        </div>
        <div>
          <Flex justifyContent="center" gap="10px" marginBottom="20px">
            <Link to="/category/sports">
              <Button
                borderRadius="0"
                color="var(--text-color)"
                padding="8px"
                fontSize="14px"
                margin="0"
              >
                Shop Now
              </Button>
            </Link>
          </Flex>
        </div>
      </div>

      {/* Categories */}
      <div className={styles.category_box}>
        <Text textAlign="left" fontSize="xl" fontWeight="500">
          Men Bestsellers
        </Text>
        <Categories />
      </div>

      {/* New Arrivals */}
      <div className={styles.new_arrivals}>
        <Text textAlign="left" fontSize="xl" fontWeight="500">
          New Arrivals
        </Text>
        <div className={styles.new_arrivals_category}>
          {["ladies", "men", "jewelery", "electronics"].map((category) => (
            <Text
              key={category}
              marginRight="16px"
              padding="8px 16px"
              marginBottom="10px"
              border="1px solid #222"
              fontWeight="500"
              borderRadius="20px"
              cursor="pointer"
              color={activeArrival === category ? "#fff" : "#222"}
              background={
                activeArrival === category ? "var(--hover-color)" : "#fff"
              }
              onClick={() => handleArrivals(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          ))}
        </div>
        <div className={styles.new_arrivals_slider}>
          <Scroller data={arrivalData} c={activeArrival} />
        </div>
      </div>

      {/* Sports Section */}
      <div className={styles.sports_section}>
        <div>
          <div></div>
          <div>
            <Image src={img3} alt="sport-section" />
          </div>
          <Text
            fontSize="15px"
            color="#ffffff"
            fontWeight="600"
            marginBottom="20px"
          >
            Lightweight training gear with DryMove™, engineered for any run on
            any day
          </Text>
          <Flex justifyContent="center" gap="10px" marginBottom="40px">
            <Link to="/category/sports">
              <Button
                borderRadius="0"
                color="var(--text-color)"
                padding="8px"
                fontSize="14px"
                margin="0"
              >
                Men
              </Button>
            </Link>
            <Link to="/category/sports">
              <Button
                borderRadius="0"
                color="var(--text-color)"
                padding="8px"
                fontSize="14px"
                margin="0"
              >
                Women
              </Button>
            </Link>
          </Flex>
        </div>
      </div>

      {/* Home Care Section */}
      <div className={styles.home_care_section}>
        <div>
          <div></div>
          <div></div>
          <Text
            fontSize="25px"
            color="#ffffff"
            fontWeight="600"
            marginBottom="20px"
          >
            Current crush: Colours!
          </Text>
          <Flex justifyContent="center" gap="10px" marginBottom="40px">
            <Link to="/category/home">
              <Button
                borderRadius="0"
                color="var(--text-color)"
                padding="8px"
                fontSize="14px"
                margin="0"
              >
                Shop Now
              </Button>
            </Link>
          </Flex>
        </div>
      </div>
    </div>
  );
};
