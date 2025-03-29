import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Collapse,
  IconButton,
  Skeleton,
} from "@mui/material";
import {
  ShoppingBagOutlined,
  Info,
  ExpandMore,
  ExpandLess,
  Storefront,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  fetchProductById,
  clearCurrentProduct,
} from "../../redux/productSlice";
import { addToCart } from "../../redux/cartSlice";
import { getWishlist } from "../../redux/wishSlice";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import styles from "./SingleProduct.module.css";

export const SingleProComp = () => {
  const { id, variantCode, articleCode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    currentProduct: product,
    status,
    error,
  } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = !!user && !!user.id;
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [openSection, setOpenSection] = useState(null);
  const [isVariantLoading, setIsVariantLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let fetchId = id;
    let fetchVariantCode = variantCode;

    if (articleCode) {
      const [parsedId, parsedVariantCode] = articleCode.split("/");
      fetchId = parsedId || articleCode;
      fetchVariantCode = parsedVariantCode;
    }

    setIsVariantLoading(true);
    dispatch(fetchProductById({ id: fetchId, variantCode: fetchVariantCode }))
      .then((result) => {
        if (result.meta.requestStatus === "fulfilled" && result.payload) {
          const variantIndex = fetchVariantCode
            ? result.payload.variants.findIndex(
                (v) => v.productCode === fetchVariantCode,
              )
            : 0;
          setSelectedVariantIndex(variantIndex >= 0 ? variantIndex : 0);
          console.log(
            "Fetched product variants:",
            result.payload.variants.map((v) => ({
              productCode: v.productCode,
              sizes: Object.keys(v.size || {}),
            })),
          );
        }
        setIsVariantLoading(false);
      })
      .catch((err) => {
        console.error("Product fetch error:", err);
        setIsVariantLoading(false);
      });

    if (isAuthenticated) {
      dispatch(getWishlist());
    }

    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [id, variantCode, articleCode, dispatch, isAuthenticated]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    console.log("Size selected:", size);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      enqueueSnackbar("Please log in to add products to the cart.", {
        variant: "warning",
      });
      // navigate("/signin");
      return;
    }

    const selectedVariant = product.variants[selectedVariantIndex];
    const sizeData = selectedVariant?.size[selectedSize];

    const cartData = {
      productId: product._id,
      productCode: selectedVariant.productCode,
      sizeFilter: selectedSize,
      sizeData,
      quantity: 1,
    };

    dispatch(addToCart(cartData))
      .unwrap()
      .then(() =>
        enqueueSnackbar("Item added to cart successfully!", {
          variant: "success",
        }),
      )
      .catch((err) =>
        enqueueSnackbar(err.message || "Failed to add to cart.", {
          variant: "error",
        }),
      );
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleSwatchClick = (index) => {
    const newVariantCode = product.variants[index].productCode;
    setSelectedVariantIndex(index);
    setIsVariantLoading(true);
    setSelectedSize(null);
    navigate(`/product/${product._id}/${newVariantCode}`, { replace: true });
  };

  const isLoading = status === "loading" || isVariantLoading;

  if (isLoading) {
    return (
      <Box
        className={styles.single_page_container}
        sx={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          className={styles.product_wrapper}
          sx={{ maxWidth: "100%", padding: { xs: 0, sm: "0 10px" } }}
        >
          <Box className={styles.img_box}>
            <div className={styles.image_grid}>
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width="100%"
                  height={400}
                  sx={{ mb: 1 }}
                />
              ))}
            </div>
          </Box>
          <Box
            className={styles.single_page_details}
            sx={{
              width: { xs: "100%", md: "auto" },
              maxWidth: { xs: "100%", md: "500px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Skeleton variant="text" width={200} height={40} />
              <Skeleton variant="circular" width={30} height={30} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textAlign: "left",
              }}
            >
              <Skeleton variant="text" width={150} height={20} />
              <Skeleton variant="text" width={100} height={30} />
            </Box>
            <Box mt={2} sx={{ width: "100%", textAlign: "left" }}>
              <Skeleton variant="text" width={150} height={20} />
              <div className={styles.color_swatch_grid}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={70}
                    height={105}
                  />
                ))}
              </div>
            </Box>
            <Box mt={2} sx={{ width: "100%", textAlign: "left" }}>
              <Skeleton variant="text" width={100} height={20} />
              <div className={styles.size_grid}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={80}
                    height={44}
                  />
                ))}
              </div>
            </Box>
            <Box sx={{ width: "100%", textAlign: "right", mb: 1 }}>
              <Skeleton variant="text" width={80} height={20} />
            </Box>
            <Skeleton variant="rectangular" width="100%" height={50} />
            <Box mt={2}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Skeleton
                  variant="circular"
                  width={20}
                  height={20}
                  sx={{ mr: 1 }}
                />
                <Skeleton variant="text" width={100} height={20} />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Skeleton
                  variant="circular"
                  width={20}
                  height={20}
                  sx={{ mr: 1 }}
                />
                <Skeleton variant="text" width={200} height={20} />
              </Box>
            </Box>
            {["description", "materials", "careGuide", "delivery"].map(
              (section, index) => (
                <Box key={index} mt={2}>
                  <div className={styles.section_header}>
                    <Skeleton variant="text" width={150} height={30} />
                    <Skeleton variant="circular" width={24} height={24} />
                  </div>
                </Box>
              ),
            )}
          </Box>
        </Stack>
      </Box>
    );
  }

  if (status === "failed" || !product) {
    return (
      <Box sx={{ textAlign: "center", mt: 2, color: "error.main" }}>
        <Typography>{error || "Product not found."}</Typography>
      </Box>
    );
  }

  const selectedVariant =
    product.variants[selectedVariantIndex] || product.variants[0];
  const colorVariants = product.variants.map((variant, index) => ({
    color: variant.color,
    image: variant.images.find(
      (img) => img.assetType === "DESCRIPTIVESTILLLIFE",
    )?.url,
    index,
  }));
  const lookbookImages = selectedVariant?.images.filter(
    (img) => img.assetType === "LOOKBOOK",
  );
  const secondaryImages = selectedVariant?.images.filter(
    (img) =>
      img.assetType === "DESCRIPTIVESTILLLIFE" ||
      img.assetType === "DESCRIPTIVEDETAIL",
  );
  const hasCareGuide = selectedVariant?.careInstructions?.length > 0;

  return (
    <Box
      className={styles.single_page_container}
      sx={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        className={styles.product_wrapper}
        sx={{ maxWidth: "100%", padding: { xs: 0, sm: "0 10px" } }}
      >
        <Box className={styles.img_box}>
          <div className={styles.image_grid}>
            {lookbookImages.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={`${product.title} Lookbook ${index + 1}`}
                className={styles.main_image}
                onError={(e) => (e.target.src = "/fallback-image.jpg")}
                style={{ maxWidth: "100%" }}
              />
            ))}
            {secondaryImages.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={
                  img.assetType === "DESCRIPTIVESTILLLIFE"
                    ? "Product Still"
                    : "Fabric Detail"
                }
                className={styles.secondary_image}
                style={{ maxWidth: "100%" }}
              />
            ))}
          </div>
        </Box>

        <Box
          className={styles.single_page_details}
          sx={{
            width: { xs: "100%", md: "auto" },
            maxWidth: { xs: "100%", md: "500px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="h5" className={styles.title}>
              {product.title}
            </Typography>
            <FavoriteButton
              productId={product._id}
              variantIndex={selectedVariantIndex}
              size={selectedSize || "S"} // Default to "S" if no size selected
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
            }}
          >
            <Typography variant="body1" className={styles.mrp_text}>
              MRP Inclusive of all taxes
            </Typography>
            <Typography className={styles.price}>
              Rs.{" "}
              {parseFloat(
                selectedVariant?.price.replace("Rs. ", "") || 0,
              ).toFixed(2)}
            </Typography>
          </Box>

          <Box mt={2} sx={{ width: "100%", textAlign: "left" }}>
            <Typography className={styles.color_label}>
              Colour: {selectedVariant?.color}
            </Typography>
            <div className={styles.color_swatch_grid} role="radiogroup">
              {colorVariants.map((variant) => (
                <div
                  key={variant.index}
                  className={`${styles.color_swatch} ${
                    variant.index === selectedVariantIndex
                      ? styles.color_swatch_selected
                      : ""
                  }`}
                  onClick={() => handleSwatchClick(variant.index)}
                  title={`View in ${variant.color}`}
                  role="radio"
                  aria-checked={variant.index === selectedVariantIndex}
                >
                  <div className={styles.color_swatch_border}></div>
                  <div className={styles.color_swatch_image_container}>
                    <img
                      src={variant.image}
                      alt={variant.color}
                      style={{ display: "block" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Box>

          <Box mt={2} sx={{ width: "100%", textAlign: "left" }}>
            <Typography fontWeight="bold" mb={1}>
              Select Size
            </Typography>
            <div className={styles.size_grid}>
              {Object.keys(selectedVariant?.size || {}).length > 0 ? (
                Object.keys(selectedVariant.size).map((size) => (
                  <Button
                    key={size}
                    variant={size === selectedSize ? "contained" : "outlined"}
                    onClick={() => handleSizeSelect(size)}
                    className={
                      size === selectedSize
                        ? styles.size_button_selected
                        : styles.size_button
                    }
                  >
                    {size}
                  </Button>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No sizes available for this variant
                </Typography>
              )}
            </div>
          </Box>

          <Box sx={{ width: "100%", textAlign: "right", mb: 1 }}>
            <Typography variant="body2" className={styles.size_guide}>
              Size guide
            </Typography>
          </Box>

          <Button
            startIcon={<ShoppingBagOutlined />}
            variant="contained"
            className={styles.add_to_cart}
            onClick={handleAddToCart}
            sx={{ color: "black" }}
            disabled={!selectedSize} // Disable if no size selected
          >
            Add
          </Button>

          <Box mt={2}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Storefront fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                Find in store
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Info fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                Delivery Time: {selectedVariant?.deliveryTime}
              </Typography>
            </Box>
          </Box>

          <div className={styles.section}>
            <div
              className={styles.section_header}
              onClick={() => toggleSection("description")}
            >
              <Typography
                variant="h6"
                className={`${styles.section_title} ${
                  openSection === "description" ? styles.section_title_open : ""
                }`}
              >
                Description & fit
              </Typography>
              {openSection === "description" ? <ExpandLess /> : <ExpandMore />}
            </div>
            <Collapse in={openSection === "description"}>
              <div className={styles.section_content}>
                <Typography sx={{ mb: 1 }} fontSize={"0.8125rem"}>
                  {selectedVariant?.description}
                </Typography>
                <Typography sx={{ mb: 1 }} fontSize={"0.8125rem"}>
                  <strong>Art. No.:</strong> {selectedVariant?.productCode}
                </Typography>
                {Object.keys(selectedVariant?.size || {}).length > 0 && (
                  <>
                    <Typography
                      sx={{ mb: 1, fontWeight: "bold" }}
                      fontSize={"0.8125rem"}
                    >
                      SIZE:
                    </Typography>
                    <ul
                      className={styles.details_list}
                      style={{ marginBottom: "8px" }}
                    >
                      {Object.entries(selectedVariant.size).map(
                        ([sizeKey, sizeData]) => (
                          <li key={sizeData._id}>
                            {sizeKey}: {sizeData.sizeFilter} (Code:{" "}
                            {sizeData.sizeCode})
                          </li>
                        ),
                      )}
                    </ul>
                  </>
                )}
                {selectedVariant?.fit && (
                  <Typography sx={{ mb: 1 }} fontSize={"0.8125rem"}>
                    <strong>Fit:</strong> {selectedVariant?.fit}
                  </Typography>
                )}
                {selectedVariant?.neckline && (
                  <Typography sx={{ mb: 1 }} fontSize={"0.8125rem"}>
                    <strong>Neckline:</strong> {selectedVariant?.neckline}
                  </Typography>
                )}
                {selectedVariant?.price && (
                  <Typography sx={{ mb: 1 }} fontSize={"0.8125rem"}>
                    <strong>Price (MRP):</strong> {selectedVariant?.price} incl.
                    of all taxes
                  </Typography>
                )}
                {selectedVariant?.countryOfProduction && (
                  <Typography sx={{ mb: 1 }} fontSize={"0.8125rem"}>
                    <strong>Country of production:</strong>{" "}
                    {selectedVariant?.countryOfProduction}
                  </Typography>
                )}
                {selectedVariant?.genericName && (
                  <Typography sx={{ mb: 1 }} fontSize={"0.8125rem"}>
                    <strong>Common generic name:</strong>{" "}
                    {selectedVariant?.genericName}
                  </Typography>
                )}
                {selectedVariant?.netQuantity && (
                  <Typography sx={{ mb: 1 }} fontSize={"0.8125rem"}>
                    <strong>Net Quantity:</strong>{" "}
                    {selectedVariant?.netQuantity}
                  </Typography>
                )}
                {selectedVariant?.Manufacturedby && (
                  <Typography sx={{ mb: 1 }} fontSize={"0.8125rem"}>
                    <strong>Manufactured by:</strong>{" "}
                    {selectedVariant?.Manufacturedby}
                  </Typography>
                )}
                {selectedVariant?.marketedBy && (
                  <Typography sx={{ mb: 1 }} fontSize={"0.8125rem"}>
                    <strong>Marketed or imported by:</strong>{" "}
                    {selectedVariant?.marketedBy}
                  </Typography>
                )}
                {selectedVariant?.dateOfManufacture && (
                  <Typography sx={{ mb: 1 }} fontSize={"0.8125rem"}>
                    <strong>Date of manufacture:</strong>{" "}
                    {selectedVariant?.dateOfManufacture}
                  </Typography>
                )}
                {selectedVariant?.dateOfImport && (
                  <Typography sx={{ mb: 1 }} fontSize={"0.8125rem"}>
                    <strong>Date of import:</strong>{" "}
                    {selectedVariant?.dateOfImport}
                  </Typography>
                )}
                <Typography sx={{ mb: 1 }} fontSize={"0.8125rem"}>
                  <strong>Customer service:</strong> In case of consumer
                  complaint, write to H&M Hennes & Mauritz Retail PVT. Ltd, A
                  Wing, D3, 2nd Floor, District Center, Saket, New Delhi 110017,
                  India or call Telephone: 1800-889-8000.
                </Typography>
                <Typography sx={{ mb: 1 }} fontSize={"0.8125rem"}>
                  <strong>Disclaimer:</strong> This information is based on
                  sample of the product...
                </Typography>
              </div>
            </Collapse>
          </div>

          <div className={styles.section}>
            <div
              className={styles.section_header}
              onClick={() => toggleSection("materials")}
            >
              <Typography
                variant="h6"
                className={`${styles.section_title} ${
                  openSection === "materials" ? styles.section_title_open : ""
                }`}
              >
                Materials
              </Typography>
              {openSection === "materials" ? <ExpandLess /> : <ExpandMore />}
            </div>
            <Collapse in={openSection === "materials"}>
              <div className={styles.section_content}>
                {selectedVariant.materials?.composition && (
                  <>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      Composition
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                      {selectedVariant.materials.composition
                        .map((comp) => `${comp.name} ${comp.percentage}%`)
                        .join(", ")}
                    </Typography>
                  </>
                )}
              </div>
            </Collapse>
          </div>

          {hasCareGuide && (
            <div className={styles.section}>
              <div
                className={styles.section_header}
                onClick={() => toggleSection("careGuide")}
              >
                <Typography
                  variant="h6"
                  className={`${styles.section_title} ${
                    openSection === "careGuide" ? styles.section_title_open : ""
                  }`}
                >
                  Care guide
                </Typography>
                {openSection === "careGuide" ? <ExpandLess /> : <ExpandMore />}
              </div>
              <Collapse in={openSection === "careGuide"}>
                <div className={styles.section_content}>
                  <Typography paragraph sx={{ mb: 2 }}>
                    You too can help the environment and make fashion more
                    sustainable...
                  </Typography>
                  <ul
                    className={styles.care_instructions}
                    style={{
                      listStyleType: "disc",
                      paddingLeft: "20px",
                      margin: 0,
                    }}
                  >
                    {selectedVariant?.careInstructions?.map(
                      (instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ),
                    )}
                  </ul>
                </div>
              </Collapse>
            </div>
          )}

          <div className={styles.section}>
            <div
              className={styles.section_header}
              onClick={() => toggleSection("delivery")}
            >
              <Typography
                variant="h6"
                className={`${styles.section_title} ${
                  openSection === "delivery" ? styles.section_title_open : ""
                }`}
              >
                Delivery and Payment
              </Typography>
              {openSection === "delivery" ? <ExpandLess /> : <ExpandMore />}
            </div>
            <Collapse in={openSection === "delivery"}>
              <div className={styles.section_content}>
                <Typography fontSize="small" sx={{ mb: 1 }}>
                  Delivery Time: {selectedVariant?.deliveryTime}
                </Typography>
                <Typography fontSize="small">
                  Due to additional health and safety measures...
                </Typography>
              </div>
            </Collapse>
          </div>
        </Box>
      </Stack>
    </Box>
  );
};
