const router = require("express").Router();

const {
  addOrUpdateLocation,
  getUserDetails,
  updateUserDetails,
  userDetailsByUserId,
  getByUserId,
  getUserList,
  assignRoleToUser,
  assignAdminRoleToUser,
} = require("../controllers/user");
const isAuthenticated = require("../middleware/auth");
const { checkRolePrivileges } = require("../middleware/auth/roleCheck");

router.get("/", isAuthenticated, getUserDetails);
router.get("/get_users", isAuthenticated, getUserList);
router.get("/:userId", isAuthenticated, getByUserId); // this api for admin only.
router.get("/details", isAuthenticated, userDetailsByUserId);
router.put("/location", isAuthenticated, addOrUpdateLocation);
router.put("/:userId", isAuthenticated, updateUserDetails);

router.put(
  "/assign/role/admin",
  [isAuthenticated, checkRolePrivileges(["SUPERADMIN"])],
  assignAdminRoleToUser
);

router.put(
  "/assign/role",
  [isAuthenticated, checkRolePrivileges(["SUPERADMIN", "ADMIN"])],
  assignRoleToUser
);

module.exports = router;
