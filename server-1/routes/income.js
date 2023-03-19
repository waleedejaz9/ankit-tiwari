const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const {
  createIncome,
  getIncomes,
  getIncome,
  deleteIncomeById,
  updateIncomeById,
} = require("../controllers/income");

router.post("/", isAuthenticated, createIncome);
router.get("/", isAuthenticated, getIncomes);
router.get("/:id", isAuthenticated, getIncome);
router.patch("/:id", isAuthenticated, updateIncomeById);
router.delete("/:id", isAuthenticated, deleteIncomeById);

module.exports = router;
