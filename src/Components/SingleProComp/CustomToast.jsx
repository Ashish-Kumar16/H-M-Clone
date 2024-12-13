import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

export const CustomToast = ({ products, cartToast, articleCode }) => {
  // Find the product by filtering the articles list
  const productData = products?.articlesList?.find(
    (el) => el?.code === articleCode,
  );

  return (
    <Box
      display={cartToast} // Ensure it's only shown when the variable resolves correctly
      position="absolute"
      right="10px"
      top="0"
      marginTop="100px"
      background="white"
      boxShadow="md"
      padding="10px"
      height="150px"
      width="240px"
      borderRadius="8px"
    >
      <Box display="flex" alignItems="center" gap="8px">
        {productData?.galleryDetails?.[0]?.baseUrl ? (
          <Image
            src={productData.galleryDetails[0].baseUrl}
            width="40%"
            height="auto"
            borderRadius="4px"
            objectFit="contain"
          />
        ) : (
          <Box
            width="40%"
            height="40px"
            background="gray.200"
            borderRadius="4px"
          />
        )}

        <Box flex="1">
          <Text
            textOverflow="ellipsis"
            fontSize="15px"
            whiteSpace="nowrap"
            overflow="hidden"
            fontWeight="bold"
          >
            {productData?.name || "Product Name"}
          </Text>
          <Text fontWeight="500" fontSize="14px" color="gray.700">
            Rs. {productData?.whitePrice?.price || "0"}.00
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
