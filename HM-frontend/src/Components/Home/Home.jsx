import React, { useEffect, useState } from "react";
import { Button, Typography, Box, Stack, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

export const HomeComp = () => {
  const [arrivalData, setArrivalData] = useState([]);
  const [activeArrival, setActiveArrival] = useState("ladies");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading delay. Replace with your API call if needed.
    setTimeout(() => {
      setLoading(false);
      // You can fetch data with axios here if required:
      // axios.get('/your/api/endpoint').then(response => setArrivalData(response.data));
    }, 2000);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 4,
        }}
      >
        {/* Top Info Section Skeleton */}
        <Skeleton
          variant="rectangular"
          sx={{
            width: { xs: "90%", sm: "90%", md: 850 },
            height: 24,
            mx: "auto",
          }}
        />

        {/* Section 1 Skeleton */}
        <Skeleton
          variant="rectangular"
          sx={{
            width: { xs: "90%", sm: "90%", md: 894 },
            height: { xs: 350, md: 640 },
            mx: "auto",
          }}
        />

        {/* Section 2 Skeleton */}
        <Skeleton
          variant="rectangular"
          sx={{
            width: { xs: "90%", sm: "90%", md: 894 },
            height: { xs: 350, md: 640 },
            mx: "auto",
          }}
        />

        {/* Section 3 Skeleton */}
        <Skeleton
          variant="rectangular"
          sx={{
            width: { xs: "90%", sm: "90%", md: 894 },
            height: { xs: 350, md: 640 },
            mx: "auto",
          }}
        />

        {/* Shop Box Skeleton */}
        <Skeleton
          variant="rectangular"
          sx={{
            width: { xs: "90%", sm: "90%", md: 894 },
            height: 132.28,
            mx: "auto",
          }}
        />

        {/* Section 5 Skeleton */}
        <Skeleton
          variant="rectangular"
          sx={{
            width: { xs: "90%", sm: "90%", md: 894 },
            height: { xs: 350, md: 640 },
            mx: "auto",
          }}
        />

        {/* Section 6 Skeleton */}
        <Skeleton
          variant="rectangular"
          sx={{
            width: { xs: "90%", sm: "90%", md: 894 },
            height: { xs: 350, md: 640 },
            mx: "auto",
          }}
        />

        {/* Section 7 Skeleton */}
        <Skeleton
          variant="rectangular"
          sx={{
            width: { xs: "90%", sm: "90%", md: 894 },
            height: { xs: 350, md: 640 },
            mx: "auto",
            mb: 2,
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 4,
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: "90%", md: 850 },
          display: "flex",
          justifyContent: { xs: "center", sm: "space-between" },
          mx: "auto",
          position: "relative",
          fontSize: "13px",
        }}
      >
        <Typography textAlign="center">Free shipping above ₹1999</Typography>
        <Typography
          sx={{ display: { xs: "none", sm: "block" } }}
          textAlign="center"
        >
          Free & flexible 15 days return
        </Typography>
        <Typography
          sx={{ display: { xs: "none", sm: "block" } }}
          textAlign="center"
        >
          Estimated delivery time: 2-7 days
        </Typography>
      </Box>

      {/* Section 1 */}
      <Box
        sx={{
          width: { xs: "90%", sm: "90%", md: 894 },
          height: { xs: 350, md: 640 },
          mx: "auto",
          position: "relative",
          backgroundColor: "#C9002E",
          borderColor: "grey.300",
        }}
      >
        <Box
          sx={{
            width: { xs: "95%", sm: "90%", md: 894 },
            height: { xs: 320, sm: 400, md: 640 },
            mx: "auto",
            position: "relative",
            backgroundColor: "#C9002E",
            borderColor: "grey.300",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            mt: { xs: 3, sm: 0, md: 0 },
            p: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "16px", sm: "20px", md: "28px" },
              color: "white",
            }}
          >
            Online Exclusive
          </Typography>
          <Typography
            fontWeight="bold"
            sx={{
              fontSize: { xs: "32px", sm: "48px", md: "72px" },
              color: "white",
            }}
          >
            Flat 20% Off
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "16px", sm: "20px", md: "28px" },
              color: "white",
            }}
          >
            On min. spends of ₹2999.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "12px", sm: "16px", md: "20px" },
              color: "white",
            }}
          >
            Applies automatically at checkout.
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 10 }}>
            <Button
              component={Link}
              to="/category/mens"
              variant="contained"
              sx={{
                bgcolor: "#E6E6E6",
                color: "black",
                borderRadius: 0,
                px: { xs: 1.5, sm: 2, md: 2.5 },
                py: { xs: 0.8, sm: 1, md: 1.2 },
                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                "&:hover": { bgcolor: "grey.400" },
              }}
            >
              Men
            </Button>
            <Button
              component={Link}
              to="/category/baby"
              variant="contained"
              sx={{
                bgcolor: "#E6E6E6",
                color: "black",
                borderRadius: 0,
                px: { xs: 1.5, sm: 2, md: 2.5 },
                py: { xs: 0.8, sm: 1, md: 1.2 },
                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                "&:hover": { bgcolor: "grey.400" },
              }}
            >
              Baby
            </Button>
            <Button
              component={Link}
              to="/category/kids"
              variant="contained"
              sx={{
                bgcolor: "#E6E6E6",
                color: "black",
                borderRadius: 0,
                px: { xs: 1.5, sm: 2, md: 2.5 },
                py: { xs: 0.8, sm: 1, md: 1.2 },
                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                "&:hover": { bgcolor: "grey.400" },
              }}
            >
              Kids
            </Button>
          </Stack>

          <Typography
            fontWeight="bold"
            sx={{
              fontSize: { xs: "10px", sm: "12px", md: "14px" },
              color: "white",
              mt: 2,
            }}
          >
            Offer applicable on men's, kids and baby wear. Limited time offer.
            *T&C Apply
          </Typography>
        </Box>
      </Box>

      {/* Section 2 */}
      <Box
        sx={{
          width: { xs: "90%", sm: "90%", md: 894 },
          height: { xs: 350, md: 640 },
          mx: "auto",
          position: "relative",
          background:
            "url(https://image.hm.com/content/dam/global_campaigns/season_01/women/ws21eqc/WS21EQC-3x2.jpg) center/cover no-repeat",
          border: "1px solid",
          borderColor: "grey.300",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "35%",
            left: "80%",
            transform: "translate(-50%, -50%)",
            bgcolor: "black",
            color: "white",
            p: 1.25,
            borderRadius: 1,
            fontSize: 14,
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography sx={{ fontSize: { xs: "14px", md: "16px" } }}>
            Rs. 1,899.00
          </Typography>
          <Typography
            fontWeight="bold"
            sx={{ cursor: "pointer", fontSize: { xs: "16px", md: "20px" } }}
          >
            Viscose strappy dress
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: "5%",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 24, md: 42 },
              fontWeight: "bold",
              color: "black",
            }}
          >
            Seasonal edit
          </Typography>
          <Typography
            sx={{ fontSize: { xs: 14, md: 16 }, color: "white", mt: 0 }}
          >
            Everyday apparel with tech details and dynamic graphics.
          </Typography>
          <Stack direction="row" justifyContent="center" sx={{ mt: 0 }}>
            <Button
              component={Link}
              to="/category/ladies"
              variant="contained"
              sx={{
                bgcolor: "black",
                color: "white",
                borderRadius: 0,
                px: { xs: 2, md: 2.5 },
                py: 1,
                fontSize: 14,
                "&:hover": { bgcolor: "grey.800" },
              }}
            >
              Shop now
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Section 3 */}
      <Box
        sx={{
          width: { xs: "90%", sm: "90%", md: 894 },
          height: { xs: 350, md: 640 },
          mx: "auto",
          position: "relative",
          background:
            "url(https://image.hm.com/content/dam/global_campaigns/season_01/baby/ks21e/KS21E-3x2-baby-trend-1.jpg) center/cover no-repeat",
          border: "1px solid",
          borderColor: "grey.300",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "70%",
            transform: "translate(-50%, -50%)",
            bgcolor: "black",
            color: "white",
            p: 1.25,
            borderRadius: 1,
            fontSize: 14,
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography sx={{ fontSize: { xs: "14px", md: "16px" } }}>
            Rs. 699.00
          </Typography>
          <Typography
            fontWeight="bold"
            sx={{ width: "100%", fontSize: { xs: "16px", md: "20px" } }}
          >
            Print-detail cotton top
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: "5%",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "20px", md: "24px" },
              fontWeight: "bold",
              color: "white",
            }}
          >
            Sweet spring
          </Typography>

          <Stack direction="row" justifyContent="center" sx={{ mt: 0 }}>
            <Button
              component={Link}
              to="/category/kids"
              variant="contained"
              sx={{
                bgcolor: "#FFFFFF",
                color: "black",
                borderRadius: 0,
                px: { xs: 2, md: 2.5 },
                py: 1,
                mt: 2,
                fontSize: 14,
                "&:hover": { bgcolor: "grey.200" },
              }}
            >
              Shop now
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Shop Box */}
      <Box
        sx={{
          width: { xs: "90%", sm: "90%", md: 894 },
          height: 132.28,
          mx: "auto",
          backgroundImage: `url('https://www2.hm.com/content/dam/global_campaigns/season_09/ladies/6049a/6049A-3x1-spring-2024.jpg')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: 0.125,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "0.7rem", md: "0.8125rem" },
            fontWeight: "bold",
            color: "#222",
          }}
        >
          Fresh styles from ₹699
        </Typography>
        <Typography
          sx={{ fontSize: { xs: "0.6rem", md: "0.688rem" }, color: "black" }}
        >
          Browse the latest seasonal fashion.
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          sx={{ mt: 2 }}
        >
          {["ladies", "mens", "kids"].map((category) => (
            <Button
              key={category}
              component={Link}
              to={`/category/${category}`}
              variant="contained"
              sx={{
                bgcolor: "transparent",
                color: "black",
                borderRadius: 0,
                fontSize: 14,
                px: { xs: 1, md: 1.5 },
                py: 1,
                border: "1px solid black",
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </Stack>
      </Box>

      {/* Section 5 */}
      <Box
        sx={{
          width: { xs: "90%", sm: "90%", md: 894 },
          height: { xs: 350, md: 640 },
          mx: "auto",
          position: "relative",
          background:
            "url(https://image.hm.com/content/dam/global_campaigns/season_01/men/ms21lh4/MS21LH4-3x2-street-trend.jpg) center/cover no-repeat",
          border: "1px solid",
          borderColor: "grey.300",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "70%",
            transform: "translate(-50%, -50%)",
            bgcolor: "black",
            color: "white",
            p: 1.25,
            borderRadius: 1,
            fontSize: 14,
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography sx={{ fontSize: { xs: "14px", md: "16px" } }}>
            Rs. 1499.00
          </Typography>
          <Typography
            fontWeight="bold"
            sx={{ width: "100%", fontSize: { xs: "16px", md: "20px" } }}
          >
            Loose Fit Printed T-sh...
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "75%",
            left: "5%",
            width: "100%",
            textAlign: "start",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "24px", md: "42px" },
              fontWeight: "bold",
              color: "white",
            }}
          >
            Loose fits
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "15px", md: "20px" },
              fontWeight: "bold",
              color: "white",
            }}
          >
            Heavy-washed styles inspired by American vintage looks.
          </Typography>

          <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2 }}>
            <Button
              component={Link}
              to="/category/ladies"
              variant="contained"
              sx={{
                bgcolor: "#FFFFFF",
                color: "black",
                borderRadius: 0,
                px: { xs: 2, md: 2.5 },
                py: 1,
                fontSize: 14,
                "&:hover": { bgcolor: "grey.200" },
              }}
            >
              Shop now
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Section 6 */}
      <Box
        sx={{
          width: { xs: "90%", sm: "90%", md: 894 },
          height: { xs: 350, md: 640 },
          mx: "auto",
          position: "relative",
          background:
            "url(https://image.hm.com/content/dam/global_campaigns/season_01/women/ws21f/WS21F-3x2.jpg) center/cover no-repeat",
          border: "1px solid",
          borderColor: "grey.300",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "20%",
            transform: "translate(-50%, -50%)",
            bgcolor: "black",
            color: "white",
            p: 1.25,
            borderRadius: 1,
            fontSize: 14,
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography sx={{ fontSize: { xs: "14px", md: "16px" } }}>
            Rs. 2,199.00
          </Typography>
          <Typography
            fontWeight="bold"
            sx={{ width: "100%", fontSize: { xs: "16px", md: "20px" } }}
          >
            Pleated crop top
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: "10%",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 24, md: 42 },
              fontWeight: "bold",
              color: "white",
            }}
          >
            Occasion edit
          </Typography>

          <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
            <Button
              component={Link}
              to="/category/ladies"
              variant="contained"
              sx={{
                bgcolor: "#FFFFFF",
                color: "black",
                borderRadius: 0,
                px: { xs: 2, md: 2.5 },
                py: 1,
                fontSize: 14,
                "&:hover": { bgcolor: "grey.200" },
              }}
            >
              Shop now
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Section 7 */}
      <Box
        sx={{
          width: { xs: "90%", sm: "90%", md: 894 },
          height: { xs: 350, md: 640 },
          mx: "auto",
          position: "relative",
          background:
            "url(https://image.hm.com/content/dam/global_campaigns/season_01/home/7021e/7021E-3x2-patio-terrace-balcony-decorations.jpg) center/cover no-repeat",
          border: "1px solid",
          borderColor: "grey.300",
          mb: 2,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            bgcolor: "black",
            color: "white",
            p: 1.25,
            borderRadius: 1,
            fontSize: 14,
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography sx={{ fontSize: { xs: "14px", md: "16px" } }}>
            Rs. 649.00
          </Typography>
          <Typography
            fontWeight="bold"
            sx={{ width: "100%", fontSize: { xs: "16px", md: "20px" } }}
          >
            Outdoor cushion cover
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: "10%",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 24, md: 42 },
              fontWeight: "bold",
              color: "white",
            }}
          >
            Earthy elegance
          </Typography>

          <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
            <Button
              component={Link}
              to="/category/ladies"
              variant="contained"
              sx={{
                bgcolor: "#FFFFFF",
                color: "black",
                borderRadius: 0,
                px: { xs: 2, md: 2.5 },
                py: 1,
                fontSize: 14,
                "&:hover": { bgcolor: "grey.200" },
              }}
            >
              Shop now
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
