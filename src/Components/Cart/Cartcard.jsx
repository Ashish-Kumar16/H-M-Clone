import React from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";

export const Cartcard = ({ el, handleDelete, updateQuantity }) => {
  console.log("Cartcard Data:", el); // Log to inspect the data

  return (
    <Box
      display="flex"
      alignItems="center"
      padding="10px"
      borderBottom="1px solid #eee"
    >
      <Image
        src={el.productId?.image || "https://via.placeholder.com/100"} // Fallback image
        boxSize="100px"
        objectFit="contain"
      />
      <Box flex="1" marginLeft="10px">
        <Text fontWeight="bold">
          {el.productId?.title || "Untitled Product"}
        </Text>
        <Text>Price: Rs. {el.productId?.price || 0}</Text>
        <Box display="flex" alignItems="center" gap="10px" marginTop="5px">
          <Button
            size="sm"
            onClick={() =>
              el.quantity > 1 && updateQuantity(el._id, el.quantity - 1)
            }
          >
            -
          </Button>
          <Text>{el.quantity || 1}</Text>
          <Button
            size="sm"
            onClick={() => updateQuantity(el._id, el.quantity + 1)}
          >
            +
          </Button>
        </Box>
        <Button
          colorScheme="red"
          size="sm"
          marginTop="5px"
          onClick={() => handleDelete(el._id)}
        >
          Remove
        </Button>
      </Box>
    </Box>
  );
};
