import { Box, Button, Heading, Input, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Cart.module.css";
import { Cartcard } from "./Cartcard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCartItems,
  deleteProductFromCart,
} from "../../redux/cart/cartSlice";

export const CartComp = () => {
  const [discount, setDiscount] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  // Access cart state from Redux store
  const { cartItems = [], status } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(fetchAllCartItems());
  }, [dispatch]);

  const validCartItems = cartItems.filter(
    (item) => item.productId && item.productId._id,
  );

  console.log("Redux Cart Items:", cartItems); // Debugging: Check cart items in Redux store
  console.log("Redux Status:", status); // Debugging: Check status of fetch

  // Ensure cartItems is always an array
  const cartLength = cartItems?.length || 0;

  console.log("Cart Length:", cartLength); // Debugging: Check if cart has items

  // Calculate sum based on cart items
  const calculateSum = () => {
    return cartItems.reduce((acc, item) => {
      const price = item.productId?.price || 0;
      const quantity = item.quantity || 1;
      return acc + price * quantity;
    }, 0);
  };

  const sum = calculateSum();
  console.log("Calculated Sum:", sum); // Debugging: Check the sum calculation

  // Check cart items and ensure each has a valid productId
  const handleDeleteItem = (itemId) => {
    if (itemId) {
      console.log("Deleting item with Product ID:", itemId);
      dispatch(deleteProductFromCart(itemId));
      toast({ title: "Item removed", status: "success", duration: 2000 });
    } else {
      console.error("Item ID is undefined!");
    }
  };

  // Update quantity of items in the cart locally
  const updateQuantity = (id, delta) => {
    const updatedCartItems = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
        : item,
    );
    console.log(
      "Updated quantity of item with ID:",
      id,
      "to",
      updatedCartItems.find((item) => item._id === id).quantity,
    ); // Debugging: Check quantity update
    // Update the cartItems in the Redux store (if you need to persist it)
    dispatch(fetchAllCartItems(updatedCartItems)); // Assuming this action persists the update
  };

  // Apply discount code
  const handleDiscount = () => {
    console.log("Discount code entered:", discount); // Debugging: Check entered discount code
    if (discount === "ENJOY100" && !discountApplied) {
      toast({ title: "Discount applied!", status: "success", duration: 2000 });
      setDiscountApplied(true);
    } else if (discountApplied) {
      toast({
        title: "Discount already applied",
        status: "warning",
        duration: 2000,
      });
    } else {
      toast({ title: "Invalid code", status: "error", duration: 2000 });
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    console.log(
      "Checkout initiated. Total:",
      sum - (discountApplied ? 100 : 0),
    ); // Debugging: Check total at checkout
    // Reset cart and redirect to home page after successful purchase
    toast({ title: "Purchase successful!", status: "success", duration: 2000 });
    navigate("/"); // Navigate to home after successful checkout
  };

  // Handle empty cart case
  if (cartLength === 0) {
    console.log("Cart is empty."); // Debugging: Check if cart is empty
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        height="100vh"
        padding="20px"
        flexDirection="row"
      >
        {/* Empty Cart Section */}
        <Box width="50%" padding="20px" textAlign="center">
          <Heading color="red.400" marginBottom="20px">
            Your Cart is Empty
          </Heading>
          <Link to="/">
            <Button colorScheme="orange" marginBottom="20px">
              Shop Now
            </Button>
          </Link>
        </Box>

        {/* Checkout Card Section */}
        <Box>
          <div className={styles.checkout_box}>
            <Input
              placeholder="Discount Code"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              marginBottom="10px"
              isDisabled
            />
            <Button onClick={handleDiscount} isDisabled>
              Apply Discount
            </Button>
            <Text mt="10px">Order Value: Rs. {sum}</Text>
            <Text>Discount: Rs. {discountApplied ? 100 : 0}</Text>
            <Text>Delivery: FREE</Text>
            <Text
              fontWeight="bold"
              borderTop="1px solid #ccc"
              mt="10px"
              pt="10px"
            >
              Total: Rs. {sum - (discountApplied ? 100 : 0)}
            </Text>
            <Button
              marginTop="15px"
              colorScheme="blackAlpha"
              color="white"
              backgroundColor="black"
              isDisabled
              onClick={handleCheckout}
            >
              Continue to checkout
            </Button>
          </div>
        </Box>
      </Box>
    );
  }

  return (
    <div className={styles.cart_container}>
      <Text fontSize="sm">HM.com / Shopping Bag</Text>
      <Text fontSize="4xl" fontWeight="700">
        Shopping Bag
      </Text>
      <div className={styles.cart_box}>
        <div className={styles.details_box}>
          {cartItems?.length > 0 ? (
            cartItems.map((item) => {
              // Ensure item and item.productId are valid before rendering
              if (item.productId && item.productId._id) {
                return (
                  <Cartcard
                    key={item._id}
                    el={item}
                    handleDelete={() => handleDeleteItem(item.productId._id)} // Pass productId._id
                    updateQuantity={updateQuantity}
                  />
                );
              } else {
                console.error("Invalid cart item or missing productId", item);
                return null; // Skip invalid items
              }
            })
          ) : (
            <Text>No items in the cart</Text>
          )}
        </div>
        <div className={styles.checkout_box}>
          <Input
            placeholder="Discount Code"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            marginBottom="10px"
          />
          <Button onClick={handleDiscount} isDisabled={discountApplied}>
            Apply Discount
          </Button>
          <Text mt="10px">Order Value: Rs. {sum}</Text>
          <Text>Discount: Rs. {discountApplied ? 100 : 0}</Text>
          <Text>Delivery: FREE</Text>
          <Text
            fontWeight="bold"
            borderTop="1px solid #ccc"
            mt="10px"
            pt="10px"
          >
            Total: Rs. {sum - (discountApplied ? 100 : 0)}
          </Text>
          <Button
            marginTop="15px"
            colorScheme="blackAlpha"
            color="white"
            backgroundColor="black"
            onClick={handleCheckout}
          >
            Continue to checkout
          </Button>
        </div>
      </div>
    </div>
  );
};