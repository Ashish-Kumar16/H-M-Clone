import React, { useEffect, useState } from "react";
import { Button, Typography, Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { Categories } from "./Categories";
import axios from "axios";

// const getData = async (category) => {
//   try {
//     const response = await axios.get(
//       `https://hm-backend-wdt8.onrender.com/products/${category}`,
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching category data:", error);
//     return [];
//   }
// };

export const HomeComp = () => {
  const [arrivalData, setArrivalData] = useState([]);
  const [activeArrival, setActiveArrival] = useState("ladies");

  // const handleArrivals = (category) => {
  //   setActiveArrival(category);
  //   getData(category).then((data) => setArrivalData(data));
  // };

  // useEffect(() => {
  //   handleArrivals("ladies");
  // }, []);

  return (
    <div className={styles.home}>
      {/* Section 1 */}
      <div className={styles.home_section_1}>
        <Box className={styles.price_box}>
          <Typography>Rs. 2,999.00</Typography>
          <Typography fontWeight="bold" sx={{ cursor: "pointer" }}>
            Appliquéd Jacket &gt;
          </Typography>
        </Box>
        <Box className={styles.overlay_text}>
          <Typography className={styles.title}>Winter neutrals</Typography>
          <Stack direction="row" justifyContent="center" sx={{ mt: 1 }}>
            <Button
              component={Link}
              to="/category/Women"
              variant="contained"
              className={styles.button}
              sx={{ "&:hover": { bgcolor: "grey.700" } }}
            >
              Shop now
            </Button>
          </Stack>
        </Box>
      </div>

      {/* Section 2 */}
      <div className={styles.home_section_2}>
        <Box className={styles.price_box}>
          <Typography>Rs. 2,299.00</Typography>
          <Typography fontWeight="bold" sx={{ cursor: "pointer" }}>
            Loose Fit Printed hoo...
          </Typography>
        </Box>
        <Box className={styles.overlay_text}>
          <Typography className={styles.title}>Sleek sport</Typography>
          <Typography className={styles.subtitle}>
            Everyday apparel with tech details and dynamic graphics.
          </Typography>
          <Stack direction="row" justifyContent="flex-start" sx={{ mt: 1 }}>
            <Button
              component={Link}
              to="/category/ladies"
              variant="contained"
              className={styles.button}
              sx={{ "&:hover": { bgcolor: "grey.700" } }}
            >
              Shop now
            </Button>
          </Stack>
        </Box>
      </div>

      {/* Shop Box */}
      <div className={styles.shop_box}>
        <Typography className={styles.title}>
          Sweats & hoodies season
        </Typography>
        <Typography className={styles.subtitle}>
          Discover the perfect winter essentials starting at ₹799
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          sx={{ mt: 2 }}
        >
          <Button
            component={Link}
            to="/category/ladies"
            variant="contained"
            className={styles.button}
          >
            Ladies
          </Button>
          <Button
            component={Link}
            to="/category/men"
            variant="contained"
            className={styles.button}
          >
            Men
          </Button>
          <Button
            component={Link}
            to="/category/kids-baby"
            variant="contained"
            className={styles.button}
          >
            Kids & Baby
          </Button>
        </Stack>
      </div>

      {/* Categories */}
      <div className={styles.category_box}>
        <Typography variant="h6" fontWeight={500} align="left">
          Men Bestsellers
        </Typography>
        <Categories />
      </div>

      {/* Section 3 */}
      <div className={styles.home_section_3}>
        <Box className={styles.price_box}>
          <Typography color="error" fontWeight="bold">
            Out of stock
          </Typography>
          <Typography>Rs. 2,699.00</Typography>
          <Typography fontWeight="bold" sx={{ cursor: "pointer" }}>
            Jacquard-weave A-line...
          </Typography>
        </Box>
        <Box className={styles.overlay_text}>
          <Typography className={styles.title}>Limited edition</Typography>
          <Typography className={styles.subtitle}>
            Exclusive party wear, accessories, dresses, tights and more.
          </Typography>
          <Stack direction="row" justifyContent="flex-start" sx={{ mt: 1 }}>
            <Button
              component={Link}
              to="/category/kids"
              variant="contained"
              className={styles.button}
              sx={{ "&:hover": { bgcolor: "grey.700" } }}
            >
              Shop 2–8y
            </Button>
          </Stack>
        </Box>
      </div>

      {/* Gift Box */}
      <div className={styles.gift_box}>
        <Typography className={styles.title}>Holiday gift guide</Typography>
        <Typography className={styles.subtitle}>
          Find the perfect presents this holiday season.
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          sx={{ mt: 1 }}
        >
          <Button
            component={Link}
            to="/category/ladies"
            variant="contained"
            className={styles.button}
          >
            Ladies
          </Button>
          <Button
            component={Link}
            to="/category/men"
            variant="contained"
            className={styles.button}
          >
            Men
          </Button>
          <Button
            component={Link}
            to="/category/baby"
            variant="contained"
            className={styles.button}
          >
            Baby
          </Button>
          <Button
            component={Link}
            to="/category/kids"
            variant="contained"
            className={styles.button}
          >
            Kids
          </Button>
          <Button
            component={Link}
            to="/category/home"
            variant="contained"
            className={styles.button}
          >
            Home
          </Button>
        </Stack>
      </div>

      {/* Section 4 */}
      <div className={styles.home_section_4}>
        <Box className={styles.overlay_text}>
          <Typography className={styles.title}>
            A winter knit curation
          </Typography>
          <Typography className={styles.subtitle}>
            Discover your look with our staple knitwear styles
          </Typography>
          <Stack direction="row" justifyContent="flex-start" sx={{ mt: 1 }}>
            <Button
              component={Link}
              to="/category/winter-knit"
              variant="contained"
              className={styles.button}
              sx={{ "&:hover": { bgcolor: "grey.700" } }}
            >
              Shop now
            </Button>
          </Stack>
        </Box>
      </div>
    </div>
  );
};
