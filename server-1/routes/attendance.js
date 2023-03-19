const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
  createClass,
  getClasses,
  deleteClass,
  updateClass,
  markAttendance,
  getAttendance,
  deleteAttendance,
  updateWholeSeries,
} = require("../controllers/classAttendance");
// Create event updateWholeSeries
router.post("/create/", isAuthenticated, createClass);
router.post("/update/", isAuthenticated, updateClass);
router.post("/updateWholeSeries/", isAuthenticated, updateWholeSeries);
router.get("/all/:userId", isAuthenticated, getClasses);
router.delete("/:type/:classId", isAuthenticated, deleteClass);

//Add attendance
router.post("/mark-attendance/", isAuthenticated, markAttendance);
router.get("/get-attendance/:classId", isAuthenticated, getAttendance);
router.delete("/delete-attendance/:attendanceId", isAuthenticated, deleteAttendance);
/*router.post("/add-guests", isAuthenticated, addNewGuests)
router.get("/info/:eventId", isAuthenticated, getEventInfo); */

module.exports = router;
