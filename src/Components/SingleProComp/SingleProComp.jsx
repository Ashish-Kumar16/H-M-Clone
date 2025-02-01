import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import {
  Box,
  Image,
  Spinner,
  Text,
  Heading,
  Button,
  Flex,
  Icon,
  Collapse,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { CiBag1, CiCircleInfo } from "react-icons/ci";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux"; // Import useSelector
import styles from "./SingleProduct.module.css";

export const SingleProComp = () => {
  const { articleCode } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState(null);
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();
  const [randomReviewCount, setRandomReviewCount] = useState(0);
  const [randomRating, setRandomRating] = useState(0);
  const API = `https://hm-backend-wdt8.onrender.com`;
  const { user, accessToken } = useSelector((state) => state.auth); // Get user from Redux state
  const isAuthenticated = !!user; // Check if the user is authenticated

  // Generate random rating between 1 and 5
  useEffect(() => {
    const generateRandomRating = () => {
      return (Math.random() * 4 + 1).toFixed(1); // Random rating between 1.0 and 5.0
    };
    setRandomRating(generateRandomRating());
  }, []);

  // Generate random review count between 500 and 5000
  useEffect(() => {
    const generateRandomReviewCount = () => {
      return Math.floor(Math.random() * (5000 - 500 + 1)) + 500;
    };
    setRandomReviewCount(generateRandomReviewCount());
  }, []);

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/products/${articleCode}`);
        if (response.data.success && response.data.product) {
          setProduct(response.data.product);
        } else {
          setError("Product not found.");
        }
      } catch (error) {
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [articleCode]);

  // Format the rating count (add 'k' for thousands)
  const formatRatingCount = (count) => {
    return count > 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
  };

  // Render stars based on the rating (including half stars)
  const renderStars = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = totalStars - Math.ceil(rating);

    return (
      <Flex>
        {[...Array(fullStars)].map((_, index) => (
          <StarIcon key={index} color="black" boxSize="1.5rem" />
        ))}
        {hasHalfStar && (
          <StarIcon key={fullStars} color="black" boxSize="1.5rem" />
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <StarIcon
            key={fullStars + index + 1}
            color="gray.300"
            boxSize="1.5rem"
          />
        ))}
      </Flex>
    );
  };

  // Handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  // Handle adding product to cart
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Not Authenticated",
        description: "Please log in to add products to the cart.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      if (!selectedSize) {
        toast({
          title: "Size is required.",
          description: "Please select a size before adding to the cart.",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
        return;
      }

      const response = await axios.post(
        `${API}/carts/add/${product._id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      toast({
        title: "Product Added to Cart",
        description: response.data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to add to cart.",
        description:
          "Something went wrong while adding the product to your cart.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  // Loading state
  if (loading) {
    return (
      <Box textAlign="center" mt="20px">
        <Spinner size="xl" color="teal.500" />
        <Text mt="4">Loading product details...</Text>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box textAlign="center" mt="20px" color="red.500">
        {error}
      </Box>
    );
  }

  // Sizes array for the product
  const sizes = product?.sizes || []; // Fallback to an empty array if no sizes are available

  return (
    <Box className={styles.single_page_container}>
      <Flex className={styles.product_wrapper}>
        <Box className={styles.img_box}>
          <Image src={product.image} alt={product.title} />
        </Box>
        <Box className={styles.single_page_details}>
          <Heading as="h2" className={styles.title}>
            {product?.title}
          </Heading>
          <Text className={styles.price}>
            Rs. {Math.round(product?.price)}.00
          </Text>

          {product.category !== "electronics" && (
            <Box>
              <Text fontWeight="bold" mb={2}>
                Select Size
              </Text>
              <Flex gap={2} wrap="wrap" mb={4}>
                {sizes.map((size) => (
                  <Button
                    key={size}
                    size="lg"
                    style={{
                      backgroundColor: size === selectedSize ? "#000" : "#FFF",
                      color: size === selectedSize ? "#FFF" : "#000",
                      border: "1px solid #000",
                      borderRadius: "0",
                    }}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </Button>
                ))}
              </Flex>
              <Text
                fontSize="sm"
                textDecoration="underline"
                cursor="pointer"
                mb={6}
              >
                Size Guide
              </Text>
            </Box>
          )}

          <Button
            leftIcon={<CiBag1 />}
            style={{
              backgroundColor: "black",
              color: "white",
              fontSize: "1.2rem",
              borderRadius: "0",
              width: "100%",
              padding: "10px",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#333")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>

          <Box display="flex" alignItems="center" gap={2} mt={4}>
            <CiCircleInfo size={20} />
            <Text>Delivery Time: 2-7 days</Text>
          </Box>

          <Box mt={6}>
            <Text fontWeight="bold">Delivery and Payment</Text>
          </Box>

          <Box display="flex" alignItems="center" mt={4}>
            {renderStars(randomRating)} {/* Show random rating stars */}
            <Text ml={2} fontSize="sm" color="gray.500">
              ({formatRatingCount(randomReviewCount)} Reviews)
            </Text>
          </Box>

          <Box mt={8}>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              onClick={onToggle}
              cursor="pointer"
            >
              <Text fontWeight="bold" fontSize="lg">
                Description & fit
              </Text>
              <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon} boxSize={6} />
            </Flex>
            <Collapse in={isOpen} animateOpacity>
              <Text mt={2} color="gray.600" lineHeight="1.8">
                {product.description}
              </Text>
            </Collapse>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
