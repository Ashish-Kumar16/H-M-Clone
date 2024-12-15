import React from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";

export const Cartcard = ({ el, handleDelete, updateQuantity }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      padding="10px"
      borderBottom="1px solid #eee"
    >
      <Image src={el.image} boxSize="100px" objectFit="contain" />
      <Box flex="1" marginLeft="10px">
        <Text fontWeight="bold">{el.title}</Text>
        <Text>Price: Rs. {el.price}</Text>
        <Box display="flex" alignItems="center" gap="10px" marginTop="5px">
          <Button size="sm" onClick={() => updateQuantity(el.id, -1)}>
            -
          </Button>
          <Text>{el.quantity}</Text>
          <Button size="sm" onClick={() => updateQuantity(el.id, 1)}>
            +
          </Button>
        </Box>
        <Button
          colorScheme="red"
          size="sm"
          marginTop="5px"
          onClick={() => handleDelete(el.id)}
        >
          Remove
        </Button>
      </Box>
    </Box>
  );
};
