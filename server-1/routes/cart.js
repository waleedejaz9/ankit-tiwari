const express = require("express");

const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const {
  addmembership,
  removemembership,
  getitems,
  addUpdateProductToUserCart,
  deleteProductFromUserCart,
  getProductsFromUserCart,
} = require("../controllers/cart");

router.post("/add_membership", isAuthenticated, addmembership);
router.post("/remove_membership/:membershipId", isAuthenticated, removemembership);
router.get("/get_items", isAuthenticated, getitems);
// TODO: gettickets by status, update ticket message.

router.put("/", isAuthenticated, addUpdateProductToUserCart);
router.get("/", isAuthenticated, getProductsFromUserCart);
router.delete("/", isAuthenticated, deleteProductFromUserCart);

module.exports = router;
