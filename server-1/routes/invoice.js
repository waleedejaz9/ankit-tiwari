const router = require("express").Router();
const {
  createInvoice,
  getInvoices,
  updateInvoiceById,
  getInvoiceById,
  deleteInvoiceById,
  sendInvoiceEmail,
  filterInvoice,
  filterByStatusInvoice,
  searchTextInvoice,
} = require("../controllers/invoice");
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl } = require("../middleware/upload");


router.post("/", isAuthenticated, singleUploadControl, createInvoice);
router.get("/", isAuthenticated, getInvoices);
router.get("/:id", isAuthenticated, getInvoiceById);
router.get("/search/invoice", isAuthenticated, searchTextInvoice);
router.get("/filter/invoice/:TypeOfDate", isAuthenticated, filterInvoice);
router.get("/filter-status/invoice/:statusType", isAuthenticated, filterByStatusInvoice);
// router.post("/send-invoice", isAuthenticated, sendInvoiceEmail);
router.patch("/:id", isAuthenticated, updateInvoiceById);
router.delete("/:id", isAuthenticated, deleteInvoiceById);

module.exports = router;
