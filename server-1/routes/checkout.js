const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const checkoutController = require("../controllers/checkout");

router.post(
  "/membership",
  results,
  isAuthenticated,
  checkoutController.checkoutMembership
);
module.exports = router;