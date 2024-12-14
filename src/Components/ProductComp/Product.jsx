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
} from "@chakra-ui/react";
import {
  // ChevronDownIcon,
  // ChevronUpIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";
import { AiOutlineAppstore, AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Add Heart Icons
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Product.module.css";
import axios from "axios";

export const Product = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]); // New State for Favorites
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("recommended");
  const [page, setPage] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 10;

  // Map user-friendly categories to FakeStoreAPI's categories
  const categoryMap = {
    men: "men's clothing",
    ladies: "women's clothing",
    jewelery: "jewelery",
    electronics: "electronics",
  };

  const fetchProducts = async (selectedCategory, sortOrder, currentPage) => {
    try {
      setLoading(true);
      setIsError(false);

      const apiCategory = categoryMap[selectedCategory] || null;
      let url = `https://fakestoreapi.com/products?limit=${itemsPerPage}&offset=${
        currentPage * itemsPerPage
      }`;

      if (apiCategory) {
        url = `https://fakestoreapi.com/products/category/${apiCategory}?limit=${itemsPerPage}&offset=${
          currentPage * itemsPerPage
        }`;
      }

      const response = await axios.get(url);
      let fetchedProducts = response.data;

      if (sortOrder === "high_by_price") {
        fetchedProducts = fetchedProducts.sort((a, b) => b.price - a.price);
      } else if (sortOrder === "low_by_price") {
        fetchedProducts = fetchedProducts.sort((a, b) => a.price - b.price);
      }

      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Failed to fetch products", error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(category, sort, page);
  }, [category, sort, page]);

  const handleSortChange = (sortType) => {
    setSort(sortType);
    setPage(0);
    setDropdownOpen(false);
  };

  const handlePageChange = (direction) => {
    const newPage = page + direction;
    if (newPage >= 0) {
      setPage(newPage);
    }
  };

  const toggleFavorite = (product) => {
    if (favorites.find((item) => item.id === product.id)) {
      setFavorites(favorites.filter((item) => item.id !== product.id)); // Remove from favorites
    } else {
      setFavorites([...favorites, product]); // Add to favorites
    }
  };

  if (isError) {
    return (
      <Box>
        <Image
          objectFit={"contain"}
          width="50%"
          margin={"auto"}
          marginTop="20px"
          src="https://img.freepik.com/free-vector/400-error-bad-request-concept-illustration_114360-1921.jpg?w=996&t=st=1680264699~exp=1680265299~hmac=1e25e41a7b9788ac0f17907336152ff780cec607dd867d577e96987100cb3f00"
          alt="Error Image"
        />
      </Box>
    );
  }

  return (
    <div className={styles.products_box}>
      {/* Header */}
      <div className={styles.products_category_name}>
        <Text fontSize="2xl" fontWeight="bold">
          {category
            ? `PRODUCTS RELATED TO ${category?.toUpperCase()}`
            : "ALL PRODUCTS"}
        </Text>
      </div>

      {/* Sorting and Pagination Controls */}
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
            <MenuItem
              onClick={() => handleSortChange("recommended")}
              background="transparent"
              color="black"
              _hover={{ background: "#F4F4F4", color: "black" }}
            >
              <Flex alignItems="center">
                <Box
                  as="span"
                  boxSize="16px"
                  border="2px solid black"
                  borderRadius="full"
                  mr="8px"
                  backgroundColor={sort === "recommended" ? "black" : "white"}
                />
                Recommended
              </Flex>
            </MenuItem>
            <MenuItem
              onClick={() => handleSortChange("low_by_price")}
              background="transparent"
              color="black"
              _hover={{ background: "#F4F4F4", color: "black" }}
            >
              <Flex alignItems="center">
                <Box
                  as="span"
                  boxSize="16px"
                  border="2px solid black"
                  borderRadius="full"
                  mr="8px"
                  backgroundColor={sort === "low_by_price" ? "black" : "white"}
                />
                Lowest Price
              </Flex>
            </MenuItem>
            <MenuItem
              onClick={() => handleSortChange("high_by_price")}
              background="transparent"
              color="black"
              _hover={{ background: "#F4F4F4", color: "black" }}
            >
              <Flex alignItems="center">
                <Box
                  as="span"
                  boxSize="16px"
                  border="2px solid black"
                  borderRadius="full"
                  mr="8px"
                  backgroundColor={sort === "high_by_price" ? "black" : "white"}
                />
                Highest Price
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>

        <Flex gap={"16px"} alignItems="center">
          {/* Pagination Controls */}
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

          {/* Total Items */}
          <Flex gap={"4px"} alignItems="center">
            <Text>{`${products?.length || 0} items`}</Text>
            <AiOutlineAppstore fontSize={"19px"} />
          </Flex>
        </Flex>
      </div>

      {/* Products Grid */}
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
              <Link key={product.id} to={`/singleproduct/${product.id}`}>
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
                      favorites.find((fav) => fav.id === product.id) ? (
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
                    border="1px solid black"
                    borderRadius="full"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product);
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
                    Rs. {Math.round(product.price * 20)}.00
                  </Text>
                </Box>
              </Link>
            ))}
      </div>
    </div>
  );
};
