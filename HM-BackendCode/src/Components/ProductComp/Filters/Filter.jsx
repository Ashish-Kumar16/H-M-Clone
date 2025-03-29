import { Text } from "@chakra-ui/react";
import React from "react";
import styles from "./Filter.module.css";

export const Filter = () => {
  return (
    <div className={styles.filter_comp}>
      {/* Offers Section */}
      <div className={styles.filter_section}>
        <Text className={styles.filter_heading}>Offers</Text>
        <Text className={styles.filter_text}>Member Exclusive Prices</Text>
        <Text className={styles.filter_text}>Sweats & Hoodies: From ₹799</Text>
      </div>

      {/* New In Section */}
      <div className={styles.filter_section}>
        <Text className={styles.filter_heading}>New In</Text>
        <Text className={styles.filter_text}>View All</Text>
        <Text className={styles.filter_text}>Accessories</Text>
        <Text className={styles.filter_text}>Shoes</Text>
        <Text className={styles.filter_text}>Clothes</Text>
      </div>

      {/* Trending Now Section */}
      <div className={styles.filter_section}>
        <Text className={styles.filter_heading}>Trending now</Text>
        <Text className={styles.filter_text}>Outdoor apparel</Text>
        <Text className={styles.filter_text}>Core comfort</Text>
        <Text className={styles.filter_text}>Trending Now</Text>
      </div>

      {/* Christmas Shop Section */}
      <div className={styles.filter_section}>
        <Text className={styles.filter_heading}>Christmas Shop</Text>
        <Text className={styles.filter_text}>The Holiday Shop</Text>
        <Text className={styles.filter_text}>Gift guide for him</Text>
      </div>

      {/* Clothing Section */}
      <div className={styles.filter_section}>
        <Text className={styles.filter_heading}>Clothing</Text>
        <Text className={styles.filter_text}>View All</Text>
        <Text className={styles.filter_text}>Hoodies & Sweatshirts</Text>
        <Text className={styles.filter_text}>Shirts</Text>
        <Text className={styles.filter_text}>T-shirts & Tops</Text>
        <Text className={styles.filter_text}>Jackets & Coats</Text>
        <Text className={styles.filter_text}>Trousers</Text>
        <Text className={styles.filter_text}>Jeans</Text>
        <Text className={styles.filter_text}>Sweaters & Cardigans</Text>
        <Text className={styles.filter_text}>Polos</Text>
        <Text className={styles.filter_text}>Basics</Text>
        <Text className={styles.filter_text}>Blazers & Suits</Text>
        <Text className={styles.filter_text}>Shorts</Text>
        <Text className={styles.filter_text}>Underwear</Text>
        <Text className={styles.filter_text}>Premium Selection</Text>
        <Text className={styles.filter_text}>Sleepwear & Loungewear</Text>
        <Text className={styles.filter_text}>Swimwear</Text>
        <Text className={styles.filter_text}>Socks</Text>
        <Text className={styles.filter_text}>Sport</Text>
        <Text className={styles.filter_text}>Care products</Text>
        <Text className={styles.filter_text}>Sale</Text>
      </div>

      {/* Accessories Section */}
      <div className={styles.filter_section}>
        <Text className={styles.filter_heading}>Accessories</Text>
        <Text className={styles.filter_text}>View All</Text>
        <Text className={styles.filter_text}>Bags</Text>
        <Text className={styles.filter_text}>Belts and Suspenders</Text>
        <Text className={styles.filter_text}>Gloves</Text>
        <Text className={styles.filter_text}>Hats and Caps</Text>
        <Text className={styles.filter_text}>Jewellery</Text>
        <Text className={styles.filter_text}>Scarves</Text>
        <Text className={styles.filter_text}>Sunglasses</Text>
        <Text className={styles.filter_text}>Ties & Bowties</Text>
      </div>

      {/* Shoes Section */}
      <div className={styles.filter_section}>
        <Text className={styles.filter_heading}>Shoes</Text>
        <Text className={styles.filter_text}>View All</Text>
        <Text className={styles.filter_text}>Slippers</Text>
        <Text className={styles.filter_text}>Trainers</Text>
      </div>

      {/* Sport Section */}
      <div className={styles.filter_section}>
        <Text className={styles.filter_heading}>Sport</Text>
        <Text className={styles.filter_text}>View All</Text>
        <Text className={styles.filter_text}>New In</Text>
        <Text className={styles.filter_text}>Tops</Text>
        <Text className={styles.filter_text}>Sweatshirts & Hoodies</Text>
        <Text className={styles.filter_text}>Trousers & Joggers</Text>
        <Text className={styles.filter_text}>Shorts</Text>
        <Text className={styles.filter_text}>Outerwear</Text>
        <Text className={styles.filter_text}>Accessories & Equipment</Text>
        <Text className={styles.filter_text}>Sport Socks</Text>
        <Text className={styles.filter_text}>Training & Gym</Text>
        <Text className={styles.filter_text}>Running</Text>
        <Text className={styles.filter_text}>Hiking</Text>
        <Text className={styles.filter_text}>Racketsports</Text>
      </div>
    </div>
  );
};
