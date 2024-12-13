import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Cart.module.css";
import { Cartcard } from "./Cartcard";

export const CartComp = () => {
  const [cartData, setCartData] = useState([]);
  const [sum, setSum] = useState(0);
  const [discount, setDiscount] = useState("");
  const [disbtn, setDisBtn] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const fetchCartData = async () => {
    try {
      const cartIds = JSON.parse(localStorage.getItem("cart")) || [];
      const fetchedData = await Promise.all(
        cartIds.map((id) =>
          fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
            res.json(),
          ),
        ),
      );

      // Modify price here: multiply by 20 and round up
      const updatedData = fetchedData.map((item) => ({
        ...item,
        price: Math.ceil(item.price * 20), // Multiply price by 20 and round it up
      }));

      setCartData(updatedData);
      const total = updatedData.reduce((acc, item) => acc + item.price, 0);
      setSum(total);
    } catch (error) {
      console.error("Failed to fetch cart data", error);
    }
  };

  const handleDeleteItem = (id) => {
    const updatedCart = cartData.filter((item) => item.id !== id);
    const updatedIds = updatedCart.map((item) => item.id);

    localStorage.setItem("cart", JSON.stringify(updatedIds));
    setCartData(updatedCart);
    const total = updatedCart.reduce((acc, item) => acc + item.price, 0);
    setSum(total);

    toast({
      title: "Item removed from cart successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDiscount = () => {
    if (discount === "") {
      toast({
        title: `Please Add a valid Code`,
        status: "error",
        isClosable: true,
        duration: 2000,
        variant: "top-accent",
      });
    } else if (discount === "ENJOY100") {
      setSum(sum - 100);
      setDisBtn(true);
      toast({
        title: `Discount Applied`,
        status: "success",
        isClosable: true,
        duration: 2000,
        variant: "top-accent",
      });
    } else {
      toast({
        title: `Invalid Discount Code`,
        status: "error",
        isClosable: true,
        duration: 2000,
        variant: "top-accent",
      });
    }
  };

  const handleCheckout = () => {
    localStorage.removeItem("cart");
    setCartData([]);
    setSum(0);

    toast({
      title: `Thanks for giving your time`,
      status: "success",
      isClosable: true,
      duration: 2000,
      variant: "top-accent",
    });

    navigate("/");
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  if (cartData.length === 0) {
    return (
      <Box>
        <Image
          src="https://e-commediallc.com/static/version1655842013/frontend/Magedukan/matsandrunner/en_US/images/cart-empty.png"
          width={"50%"}
          margin="auto"
          marginTop={"20px"}
          objectFit="contain"
          height={"400px"}
        />
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", lg: "4xl" }}
          textAlign="center"
          marginTop="10px"
        >
          <Text as="span" color={"red.400"}>
            Your Cart is Empty
          </Text>
        </Heading>
        <Link to="/">
          <Button
            width={"200px"}
            marginTop="10px"
            colorScheme={"orange"}
            borderRadius="0"
          >
            Shop Now
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <div className={styles.cart_container}>
      <Text fontSize={"sm"}>HM.com/Shopping bag</Text>
      <div className={styles.cart_text_box}>
        <Text>Estimated delivery time: 2-7 days</Text>
        <Text>Download the H&M App</Text>
      </div>
      <Text fontSize={"4xl"} fontWeight="700" color={"var(--text-color)"}>
        Shopping bag
      </Text>

      <div className={styles.cart_box}>
        <div className={styles.details_box}>
          {cartData.map((item) => (
            <Cartcard key={item.id} el={item} handleDelete={handleDeleteItem} />
          ))}
        </div>
        <div className={styles.checkout_box}>
          <Text>Add a discount code</Text>
          <div className={styles.discount_box}>
            <Input
              placeholder="Add Code"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              focusBorderColor="green.400"
              borderRadius={"0"}
            />
            <Button
              onClick={handleDiscount}
              borderRadius={"0"}
              colorScheme="blackAlpha"
              background={"#000"}
              isDisabled={disbtn}
            >
              Apply
            </Button>
          </div>
          <div>
            <Text>Order value</Text>
            <Text>Rs. {sum}</Text>
          </div>
          <div>
            <Text>Discount</Text>
            <Text>Rs. {disbtn ? 100 : 0}</Text>
          </div>
          <div>
            <Text>Delivery</Text>
            <Text>FREE</Text>
          </div>

          <div className={styles.total_value}>
            <Text fontSize={"18px"} fontWeight="500">
              Total value
            </Text>
            <Text fontSize={"18px"} fontWeight="500">
              Rs. {sum - (disbtn ? 100 : 0)}
            </Text>
          </div>
          <div className={styles.checkout_btn}>
            <Button
              borderRadius={"0"}
              colorScheme="blackAlpha"
              background={"#000"}
              width="100%"
              marginTop={"15px"}
              onClick={handleCheckout}
            >
              Checkout Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
