import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import tshirt from "../../assets/categories/10221.png";
import trouser from "../../assets/categories/10222.png";
import shoes from "../../assets/categories/10226.png";
import shirt from "../../assets/categories/10227.png";
import jeans from "../../assets/categories/10229.png";
import jac from "../../assets/categories/10230.png";
import hoodie from "../../assets/categories/10231.png";
import newsr from "../../assets/categories/10245.png";
import pres from "../../assets/categories/10252.png";

const StyledImage = styled("img")({
  margin: "auto",
  padding: "10px",
  transition: "transform 400ms",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

const PreviousBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIos sx={{ color: "rgba(0, 0, 0, 0.54)", fontSize: 20 }} />
    </div>
  );
};

const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIos sx={{ color: "rgba(0, 0, 0, 0.54)", fontSize: 20 }} />
    </div>
  );
};

const settings = {
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  infinite: false,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

const categories = [
  { name: "T-shirts & Tanks", img: tshirt, item: "Men" },
  { name: "Hoodies & Sweatshirts", img: hoodie, item: "Men" },
  { name: "Trousers", img: trouser, item: "Men" },
  { name: "Shirts", img: shirt, item: "Men" },
  { name: "Clothes", img: newsr, item: "Men" },
  { name: "Shoes", img: shoes, item: "Men" },
  { name: "Jeans", img: jeans, item: "Men" },
  { name: "Jacket", img: jac, item: "Men" },
  { name: "Premium Selection", img: pres, item: "Men" },
];

export const Categories = () => {
  return (
    <div>
      <Slider {...settings}>
        {categories?.map((item, i) => (
          <Link to="/category/mens" key={i}>
            <Box sx={{ m: 0.5, textAlign: "center" }}>
              <StyledImage src={item.img} alt={item.name} />
              <Typography fontWeight={500}>{item.item}</Typography>
              <Typography>{item.name}</Typography>
            </Box>
          </Link>
        ))}
      </Slider>
    </div>
  );
};
