const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
  createFinanceCategory,
  getFinanceCategory,
  deleteFinanceCategoryById,
} = require("../controllers/financeCategory");

router.post("/", isAuthenticated, createFinanceCategory);
router.get("/", isAuthenticated, getFinanceCategory);
router.delete("/:id", isAuthenticated, deleteFinanceCategoryById);

module.exports = router;
