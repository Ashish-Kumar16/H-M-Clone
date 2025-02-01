import {
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Image,
  Stack,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { AiOutlineAppstore, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Product.module.css";
import axios from "axios";

export const Product = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("recommended");
  const [page, setPage] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 10;
  const toast = useToast();
  const API = "https://hm-backend-wdt8.onrender.com";
  const categoryMap = {
    men: "Men",
    ladies: "Women",
    kids: "Kids",
    home: "All Products", // For "home", we fetch all products
  };

  const fetchProducts = async (selectedCategory, sortOrder, currentPage) => {
    try {
      setLoading(true);
      setIsError(false);
      let url = `${API}/products`; // Default endpoint for all products
      const apiCategory = categoryMap[selectedCategory] || null;

      // For "home" category, fetch all products (no specific category)
      if (selectedCategory === "home") {
        url = `${API}/products?limit=10&page=${currentPage + 1}`;
      }

      // For other categories, use the specific category endpoint
      if (apiCategory && apiCategory !== "All Products") {
        url = `${API}/products/category/${apiCategory}?limit=10&page=${
          currentPage + 1
        }`;
      }

      const response = await axios.get(url);
      const fetchedProducts = Array.isArray(response.data.products)
        ? response.data.products
        : [];

      if (sortOrder === "high_by_price") {
        fetchedProducts.sort((a, b) => b.price - a.price);
      } else if (sortOrder === "low_by_price") {
        fetchedProducts.sort((a, b) => a.price - b.price);
      }

      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setIsError(true);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Use effect hook to fetch products whenever the category, sort, or page changes
  useEffect(() => {
    if (category === "home") {
      fetchProducts("home", sort, page); // Fetch all products when category is "home"
    } else {
      fetchProducts(category, sort, page); // Fetch products for the specific category
    }
  }, [category, sort, page]);

  // Handle the sorting change
  const handleSortChange = (sortType) => {
    setSort(sortType);
    setPage(0);
    setDropdownOpen(false);
  };

  // Handle the page change for pagination
  const handlePageChange = (direction) => {
    const newPage = page + direction;
    if (newPage >= 0) {
      setPage(newPage);
    }
  };

  // Handle adding/removing product to/from wishlist
  const handleAddWish = async (productId) => {
    try {
      // Check if the product is already in the favorites
      if (favorites.includes(productId)) {
        // Remove from wishlist
        await axios.delete(
          `${API}/wishlists/delete/${productId}`,
        );
        setFavorites(favorites.filter((id) => id !== productId));
        toast({
          title: "Removed from Wishlist",
          status: "info",
          duration: 2000,
          isClosable: true,
        });
      } else {
        // Add to wishlist
        await axios.post(`${API}/wishlists/add/${productId}`);
        setFavorites([...favorites, productId]);
        toast({
          title: "Added to Wishlist",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error adding/removing from wishlist:", error);
      toast({
        title: "Error",
        description: "Something went wrong.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <div className={styles.products_box}>
      <div className={styles.products_category_name}>
        <Text fontSize="2xl" fontWeight="bold">
          {category
            ? `PRODUCTS RELATED TO ${category?.toUpperCase()}`
            : "ALL PRODUCTS"}
        </Text>
      </div>
      <div className={styles.products_sort_box}>
        <Menu isOpen={dropdownOpen} onClose={() => setDropdownOpen(false)}>
          <MenuButton
            as={Button}
            background="transparent"
            color="black"
            _hover={{ background: "transparent", color: "black" }}
            _active={{ background: "transparent", color: "black" }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {dropdownOpen ? "Sort By -" : "Sort By +"}
          </MenuButton>
          <MenuList background="white" borderColor="black">
            <MenuItem onClick={() => handleSortChange("recommended")}>
              Recommended
            </MenuItem>
            <MenuItem onClick={() => handleSortChange("low_by_price")}>
              Lowest Price
            </MenuItem>
            <MenuItem onClick={() => handleSortChange("high_by_price")}>
              Highest Price
            </MenuItem>
          </MenuList>
        </Menu>
        <Flex gap={"16px"} alignItems="center">
          <Flex gap={"4px"} alignItems="center">
            <IconButton
              colorScheme="red"
              isDisabled={page === 0}
              variant={"ghost"}
              icon={<ArrowBackIcon />}
              onClick={() => handlePageChange(-1)}
            />
            <Text>{`Page ${page + 1}`}</Text>
            <IconButton
              colorScheme="red"
              variant={"ghost"}
              onClick={() => handlePageChange(1)}
              icon={<ArrowForwardIcon />}
            />
          </Flex>
          <Flex gap={"4px"} alignItems="center">
            <Text>{`${products?.length || 0} items`}</Text>
            <AiOutlineAppstore fontSize={"19px"} />
          </Flex>
        </Flex>
      </div>
      <div className={styles.products_card_box}>
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <Stack key={index} spacing={4}>
                <Skeleton height="250px" />
                <Skeleton height="20px" />
                <Skeleton height="10px" />
              </Stack>
            ))
          : products?.map((product) => (
              <Link key={product._id} to={`/productdetail/${product._id}`}>
                <Box
                  border="1px"
                  borderColor="gray.200"
                  p={3}
                  boxShadow="md"
                  rounded="md"
                  position="relative"
                  _hover={{ boxShadow: "lg" }}
                >
                  <IconButton
                    aria-label="Add to favorites"
                    icon={
                      favorites.includes(product._id) ? (
                        <AiFillHeart color="red" />
                      ) : (
                        <AiOutlineHeart />
                      )
                    }
                    position="absolute"
                    top="8px"
                    right="8px"
                    size="sm"
                    backgroundColor="white"
                    borderRadius="full"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddWish(product._id);
                    }}
                  />
                  <Image
                    src={product.image}
                    alt={product.title}
                    height={200}
                    objectFit="contain"
                  />
                  <Text mt={2} fontWeight="bold" noOfLines={2}>
                    {product.title}
                  </Text>
                  <Text color="black.600" fontWeight="semibold">
                    Rs. {Math.round(product.price)}.00
                  </Text>
                  <Button mt={2} size="sm" colorScheme="teal">
                    Add to Wishlist
                  </Button>
                </Box>
              </Link>
            ))}
      </div>
    </div>
  );
};
