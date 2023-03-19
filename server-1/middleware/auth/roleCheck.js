const { ApplicationRole } = require("../../models/index/index");

const isSuperAdmin = async (req, res, next) => {
  try {
    const role = await ApplicationRole.findOne({ roleName: "SUPERADMIN" });
    if (req.user.role.toString() === role._id.toString()) {
      next();
    } else {
      return res.status(403).json({ message: "Access Denied: Unauthorized token" });
    }
  } catch (error) {
    return res.status(403).json({
      errors: { common: { msg: "Access Denied: Invalid token" } },
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const role = await ApplicationRole.findOne({ roleName: "ADMIN" });
    if (req.user.role.toString() === role._id.toString()) {
      next();
    } else {
      return res.status(403).json({ message: "Access Denied: Unauthorized token" });
    }
  } catch (error) {
    return res.status(403).json({
      errors: { common: { msg: "Access Denied: Invalid token" } },
    });
  }
};

const checkRolePrivileges =
  (role = []) =>
  async (req, res, next) => {
    try {
      const rolesFound = await ApplicationRole.find(
        {
          roleName: { $in: role },
        },
        { _id: 1, roleName: 1 }
      );
      if (roleValidator(rolesFound, req.user.role)) {
        next();
      } else {
        return res.status(403).json({ message: "Access Denied: Unauthorized token" });
      }
    } catch (error) {
      console.log(error);
      return res.status(403).json({
        errors: { common: { msg: "Access Denied: Invalid token" } },
      });
    }
  };

const roleValidator = (rolesFound, userRole) => {
  let flag = false;
  rolesFound.forEach((role) => {
    if (role._id.toString() === userRole.toString()) {
      flag = true;
    }
  });
  return flag;
};

module.exports = { isSuperAdmin, isAdmin, checkRolePrivileges };
