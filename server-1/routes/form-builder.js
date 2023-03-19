const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const { createForm, getForms, deleteForm, editForm, getForm, addLeads } = require("../controllers/formBuilder");

router.get("/forms/:id",isAuthenticated, getForms); // id==userId
router.post("/create", isAuthenticated, createForm);
router.get("/preview/:id", getForm);
router.delete("/delete/:id", isAuthenticated, deleteForm);
router.put("/edit/:id", isAuthenticated, editForm);
router.post("/addleads/:id", addLeads);

module.exports = router;
