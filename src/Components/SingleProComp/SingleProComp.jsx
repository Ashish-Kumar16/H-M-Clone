import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
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
import styles from "./SingleProduct.module.css";
import { useDispatch } from "react-redux";
import { saveData, loadData } from "../../utils/accesslocalStorage"; // Import the saveData function

export const SingleProComp = () => {
  const { articleCode } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState(null);
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://fakestoreapi.com/products/${articleCode}`,
        );
        setProduct(response.data);
      } catch (error) {
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [articleCode]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (product) {
      // Save the product ID to local storage
      const cartItems = loadData("cart") || [];
      saveData("cart", [...cartItems, product.id]);

      // Show toast notification
      toast({
        title: "Added to cart successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt="20px">
        <Spinner size="xl" color="teal.500" />
        <Text mt="4">Loading product details...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt="20px" color="red.500">
        {error}
      </Box>
    );
  }

  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <Flex>
        {[...Array(totalStars)].map((_, index) => (
          <StarIcon
            key={index}
            color={index < Math.round(rating) ? "yellow.400" : "gray.300"}
          />
        ))}
      </Flex>
    );
  };

  return (
    <Box className={styles.single_page_container}>
      <Flex className={styles.product_wrapper}>
        <Box className={styles.img_box}>
          <Image src={product.image} alt={product.title} />
        </Box>
        <Box className={styles.single_page_details}>
          <Heading as="h2" className={styles.title}>
            {product.title}
          </Heading>
          <Text className={styles.price}>
            Rs. {Math.round(product.price * 20)}.00
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
            Add
          </Button>

          <Box display="flex" alignItems="center" gap={2} mt={4}>
            <CiCircleInfo size={20} />
            <Text>Delivery Time: 2-7 days</Text>
          </Box>

          <Box mt={6}>
            <Text fontWeight="bold">Delivery and Payment</Text>
          </Box>

          <Box display="flex" alignItems="center" mt={4}>
            {renderStars(product.rating.rate)}
            <Text ml={2} fontSize="sm" color="gray.500">
              ({product.rating.count} Reviews)
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
