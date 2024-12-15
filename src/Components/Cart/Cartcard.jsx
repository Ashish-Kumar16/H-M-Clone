import { Image, Text } from "@chakra-ui/react";
import React from "react";
import styles from "./Cartcard.module.css";
import { RiDeleteBin5Line } from "react-icons/ri";

export const Cartcard = ({ el, handleDelete }) => {
  return (
    <div className={styles.cart_card}>
      {/* Image */}
      <Image
        src={el?.image} // Using el?.img for the image
        alt={el?.title} // Using el?.name for the alt text
        boxSize="150px"
        objectFit="contain"
      />

      {/* Title and Price */}
      <div>
        <Text fontSize="xl" fontWeight="600">
          {el?.title || "Untitled Product"} {/* Using el?.name for the title */}
        </Text>
        <Text fontSize="lg" fontWeight="500" color="gray.600">
          Rs. {el?.price || "0.00"} {/* Using el?.price for the price */}
        </Text>
      </div>

      {/* Delete Button */}
      <RiDeleteBin5Line
        className={styles.delete_btn}
        fontSize="20px"
        onClick={() => handleDelete(el.id)} // Using el?._id for the delete functionality
        cursor="pointer"
      />
    </div>
  );
};
