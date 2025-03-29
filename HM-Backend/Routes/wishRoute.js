const express = require("express");
const router = express.Router();
const wishListController = require("../controllers/wishListController");
const { auth } = require("../Middlewares/auth");

router.post("/", auth, wishListController.addToWishlist);
router.get("/", auth, wishListController.getWishlist);
router.delete("/:productCode", auth, wishListController.removeFromWishlist); // Use productCode

module.exports = router;
