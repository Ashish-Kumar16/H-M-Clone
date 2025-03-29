import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./Filter.module.css";

export const Filter = () => {
  return (
    <div className={styles.filter_comp}>
      {/* Offers Section */}
      <div className={styles.filter_section}>
        <Typography className={styles.filter_heading}>Offers</Typography>
        <Typography className={styles.filter_text}>
          Member Exclusive Prices
        </Typography>
        <Typography className={styles.filter_text}>
          Sweats & Hoodies: From ₹799
        </Typography>
      </div>

      {/* New In Section */}
      <div className={styles.filter_section}>
        <Typography className={styles.filter_heading}>New In</Typography>
        <Typography className={styles.filter_text}>View All</Typography>
        <Typography className={styles.filter_text}>Accessories</Typography>
        <Typography className={styles.filter_text}>Shoes</Typography>
        <Typography className={styles.filter_text}>Clothes</Typography>
      </div>

      {/* Trending Now Section */}
      <div className={styles.filter_section}>
        <Typography className={styles.filter_heading}>Trending now</Typography>
        <Typography className={styles.filter_text}>Outdoor apparel</Typography>
        <Typography className={styles.filter_text}>Core comfort</Typography>
        <Typography className={styles.filter_text}>Trending Now</Typography>
      </div>

      {/* Christmas Shop Section */}
      <div className={styles.filter_section}>
        <Typography className={styles.filter_heading}>
          Christmas Shop
        </Typography>
        <Typography className={styles.filter_text}>The Holiday Shop</Typography>
        <Typography className={styles.filter_text}>
          Gift guide for him
        </Typography>
      </div>

      {/* Clothing Section */}
      <div className={styles.filter_section}>
        <Typography className={styles.filter_heading}>Clothing</Typography>
        <Typography className={styles.filter_text}>View All</Typography>
        <Typography className={styles.filter_text}>
          Hoodies & Sweatshirts
        </Typography>
        <Typography className={styles.filter_text}>Shirts</Typography>
        <Typography className={styles.filter_text}>T-shirts & Tops</Typography>
        <Typography className={styles.filter_text}>Jackets & Coats</Typography>
        <Typography className={styles.filter_text}>Trousers</Typography>
        <Typography className={styles.filter_text}>Jeans</Typography>
        <Typography className={styles.filter_text}>
          Sweaters & Cardigans
        </Typography>
        <Typography className={styles.filter_text}>Polos</Typography>
        <Typography className={styles.filter_text}>Basics</Typography>
        <Typography className={styles.filter_text}>Blazers & Suits</Typography>
        <Typography className={styles.filter_text}>Shorts</Typography>
        <Typography className={styles.filter_text}>Underwear</Typography>
        <Typography className={styles.filter_text}>
          Premium Selection
        </Typography>
        <Typography className={styles.filter_text}>
          Sleepwear & Loungewear
        </Typography>
        <Typography className={styles.filter_text}>Swimwear</Typography>
        <Typography className={styles.filter_text}>Socks</Typography>
        <Typography className={styles.filter_text}>Sport</Typography>
        <Typography className={styles.filter_text}>Care products</Typography>
        <Typography className={styles.filter_text}>Sale</Typography>
      </div>

      {/* Accessories Section */}
      <div className={styles.filter_section}>
        <Typography className={styles.filter_heading}>Accessories</Typography>
        <Typography className={styles.filter_text}>View All</Typography>
        <Typography className={styles.filter_text}>Bags</Typography>
        <Typography className={styles.filter_text}>
          Belts and Suspenders
        </Typography>
        <Typography className={styles.filter_text}>Gloves</Typography>
        <Typography className={styles.filter_text}>Hats and Caps</Typography>
        <Typography className={styles.filter_text}>Jewellery</Typography>
        <Typography className={styles.filter_text}>Scarves</Typography>
        <Typography className={styles.filter_text}>Sunglasses</Typography>
        <Typography className={styles.filter_text}>Ties & Bowties</Typography>
      </div>

      {/* Shoes Section */}
      <div className={styles.filter_section}>
        <Typography className={styles.filter_heading}>Shoes</Typography>
        <Typography className={styles.filter_text}>View All</Typography>
        <Typography className={styles.filter_text}>Slippers</Typography>
        <Typography className={styles.filter_text}>Trainers</Typography>
      </div>

      {/* Sport Section */}
      <div className={styles.filter_section}>
        <Typography className={styles.filter_heading}>Sport</Typography>
        <Typography className={styles.filter_text}>View All</Typography>
        <Typography className={styles.filter_text}>New In</Typography>
        <Typography className={styles.filter_text}>Tops</Typography>
        <Typography className={styles.filter_text}>
          Sweatshirts & Hoodies
        </Typography>
        <Typography className={styles.filter_text}>
          Trousers & Joggers
        </Typography>
        <Typography className={styles.filter_text}>Shorts</Typography>
        <Typography className={styles.filter_text}>Outerwear</Typography>
        <Typography className={styles.filter_text}>
          Accessories & Equipment
        </Typography>
        <Typography className={styles.filter_text}>Sport Socks</Typography>
        <Typography className={styles.filter_text}>Training & Gym</Typography>
        <Typography className={styles.filter_text}>Running</Typography>
        <Typography className={styles.filter_text}>Hiking</Typography>
        <Typography className={styles.filter_text}>Racketsports</Typography>
      </div>
    </div>
  );
};
