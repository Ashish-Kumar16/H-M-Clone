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
  const [discountApplied, setDiscountApplied] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // Fetch cart data and calculate totals
  const fetchCartData = async () => {
    try {
      const cartIds = JSON.parse(localStorage.getItem("cart")) || [];
      const idCounts = cartIds.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      }, {});

      const fetchedData = await Promise.all(
        Object.keys(idCounts).map((id) =>
          fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
            res.json(),
          ),
        ),
      );

      const updatedData = fetchedData.map((item) => ({
        ...item,
        price: Math.ceil(item.price * 20),
        quantity: idCounts[item.id],
      }));

      setCartData(updatedData);
      calculateSum(updatedData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Calculate the total sum
  const calculateSum = (data) => {
    const total = data.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setSum(total);
  };

  // Update local storage and cart state
  const updateCartState = (updatedCart) => {
    const updatedIds = updatedCart.flatMap((item) =>
      Array(item.quantity).fill(item.id),
    );
    localStorage.setItem("cart", JSON.stringify(updatedIds));
    setCartData(updatedCart);
    calculateSum(updatedCart);
  };

  // Handle delete item
  const handleDeleteItem = (id) => {
    const updatedCart = cartData.filter((item) => item.id !== id);
    updateCartState(updatedCart);
    toast({ title: "Item removed", status: "success", duration: 2000 });
  };

  // Update quantity
  const updateQuantity = (id, delta) => {
    const updatedCart = cartData
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 0) }
          : item,
      )
      .filter((item) => item.quantity > 0);

    updateCartState(updatedCart);
  };

  // Apply discount
  const handleDiscount = () => {
    if (discount === "ENJOY100" && !discountApplied) {
      setSum((prev) => prev - 100);
      setDiscountApplied(true);
      toast({ title: "Discount applied!", status: "success", duration: 2000 });
    } else {
      toast({ title: "Invalid code", status: "error", duration: 2000 });
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    localStorage.removeItem("cart");
    setCartData([]);
    setSum(0);
    toast({ title: "Purchase successful!", status: "success", duration: 2000 });
    navigate("/");
  };

  useEffect(() => {
    fetchCartData();
  }, []);

 if (cartData.length === 0) {
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
       <Box
        //  width="50%"
        //  padding="20px"
        //  border="1px solid #ccc"
        //  borderRadius="8px"
        //  boxShadow="lg"
       >
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
          {cartData.map((item) => (
            <Cartcard
              key={item.id}
              el={item}
              handleDelete={handleDeleteItem}
              updateQuantity={updateQuantity}
            />
          ))}
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
