import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  Image,
  Stack,
} from "@chakra-ui/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Favorite.module.css";

export const Favorites = ({ favorites, toggleFavorite }) => {
  if (favorites.length === 0) {
    return (
      <Box className={styles.empty_favorites}>
        <Text fontSize="xl" fontWeight="bold">
          Your Favorites List is Empty
        </Text>
      </Box>
    );
  }

  return (
    <div className={styles.favorites_container}>
      <Text className={styles.favorites_header}>Your Favorites</Text>
      <div className={styles.favorites_grid}>
        {favorites.map((product) => (
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
                aria-label="Remove from favorites"
                icon={<AiFillHeart color="red" />}
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
