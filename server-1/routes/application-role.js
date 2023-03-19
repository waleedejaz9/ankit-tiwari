const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const { checkRolePrivileges } = require("../middleware/auth/roleCheck");

const {
  createRole,
  getAllRoles,
  getRoleById,
  deleteById,
  updateById,
} = require("../controllers/applicationRole");

router.post("/", [isAuthenticated, checkRolePrivileges(["SUPERADMIN"])], createRole);
router.get("/", [isAuthenticated, checkRolePrivileges(["SUPERADMIN"])], getAllRoles);
router.get("/:id", [isAuthenticated, checkRolePrivileges(["SUPERADMIN"])], getRoleById);
router.delete("/:id", [isAuthenticated, checkRolePrivileges(["SUPERADMIN"])], deleteById);
router.put("/:id", [isAuthenticated, checkRolePrivileges(["SUPERADMIN"])], updateById);

module.exports = router;
