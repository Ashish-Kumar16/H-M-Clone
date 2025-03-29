import React, { useEffect, useState } from "react";
import { Box, IconButton, Text, Image, useToast } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Favorite.module.css";
import axios from "axios"; // To make API requests
import { useSelector } from "react-redux"; // Import useSelector for accessing authentication state
import { SignIn } from "../../Components/AuthModal/Signin"; // Import SignIn modal

export const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State to manage modal visibility

  const navigate = useNavigate();
  const toast = useToast();
  const { isAuthenticated } = useSelector((state) => state.auth); // Access authentication state

  // Show toast if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in or sign up to view your favorites.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setIsOpen(true); // Open the SignIn modal when not authenticated
    }
  }, [isAuthenticated, navigate, toast]);

  // Load favorite products from the API on component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Assuming your API endpoint for fetching favorites is `/wishlists`
        const response = await axios.get(
          "https://hm-backend-wdt8.onrender.com/wishlists",
        );
        setFavorites(response.data.myWishlist); // Assuming the API response structure
        setLoading(false);
      } catch (error) {
        setError("Failed to load favorites");
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [isAuthenticated]);

  // Handle remove favorite (sending DELETE request to API)
  const handleFavoriteClick = async (productId) => {
    try {
      // Send DELETE request to remove product from wishlist
      await axios.delete(`http://localhost:5000/wishlists/delete/${productId}`);
      // Update state to remove the product from the list
      setFavorites(favorites.filter((product) => product._id !== productId));
    } catch (error) {
      setError("Failed to remove product from favorites");
    }
  };

  if (loading) {
    return <Text>Loading favorites...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

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
                  e.preventDefault(); // Prevent the link from being clicked
                  handleFavoriteClick(product._id); // Remove from favorites
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
            </Box>
          </Link>
        ))}
      </div>

      {/* Sign In Modal */}
      <SignIn isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
