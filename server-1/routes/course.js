const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course");

const {
  createQuiz,
  getQuizByCourse,
  submitQuizSolution,
  checkQuizSolution,
} = require("../controllers/courseQuiz");

const {
  createAssignment,
  getAssignmentById,
  updateAssignment,
  getAssignmentByCourse,
  uploadAssignmentSolution,
  assignmentGrading,
} = require("../controllers/courseAssignment");
const {
  createLesson,
  deleteLesson,
  getLesson,
} = require("../controllers/courseLesson");
const{
  createVideo,
  deleteVideo,
} = require("../controllers/courseVideo");

const { singleUploadControl } = require("../middleware/upload");

router.post("/create", isAuthenticated, singleUploadControl, results, createCourse);
router.get("/", isAuthenticated, results, getCourses);
router.get("/courseId/:id", isAuthenticated, results, getCourse);
router.put("/courseId/:id", isAuthenticated, singleUploadControl, results, updateCourse);
router.delete("/courseId/:id", isAuthenticated, results, deleteCourse);

// quiz routes
router.post("/courseId/:id/quiz", isAuthenticated, createQuiz);
router.get("/courseId/:id/quiz", isAuthenticated, getQuizByCourse);
router.get("/courseId/:id/quiz/:quizId/check-solution", isAuthenticated, checkQuizSolution);
router.put("/courseId/:id/quiz/:quizId/submit", isAuthenticated, submitQuizSolution);

// assignment routes
router.post("/courseId/:id/assignment", isAuthenticated, createAssignment);
router.get("/courseId/:id/assignment/:assignmentId", isAuthenticated, getAssignmentById);
router.put("/courseId/:id/assignment/:assignmentId", isAuthenticated, updateAssignment);
router.get("/courseId/:id/assignment", isAuthenticated, getAssignmentByCourse);
router.put(
  "/courseId/:id/assignment/:assignmentId/submit",
  isAuthenticated,
  uploadAssignmentSolution
);
router.put(
  "/courseId/:id/assignment/:assignmentId/solution/:solutionId/score",
  isAuthenticated,
  assignmentGrading
);
// lessons routes
router.post("/lesson/:courseId",isAuthenticated,results,createLesson);
router.delete("/lessonId/:lessonId",isAuthenticated,results,deleteLesson);
router.get("/lesson/:courseId",isAuthenticated,results,getLesson);
// courseVideo Routes
router.post("/coursevideo/:lessonId",isAuthenticated,results,createVideo);
router.delete("/coursevideo/:videoId",isAuthenticated,results,deleteVideo);
// router.put("/coursevideo/:videoId",isAuthenticated,results,updateVideo);

module.exports = router;
