const router = require("express").Router();

const {
  createProject,
  getProjects,
  deleteProject,
  updateProjectTitle,
  addProjectManagement,
  updateProjectManagement,
  addRowProjectManagement,
  addColumnProjectManagement,
  deleteTableProjectManagement,
  deleteRowProjectManagement,
  deleteColumnProjectManagement,
  ActivityAndLastSeen
} = require("../controllers/projectManager");
let results = require("../validators");
let isAuthenticated = require("../middleware/auth");
let ProjectLastSeen = require("../middleware/lastseen/lastseen");

router.post("/createproject", results, isAuthenticated, ProjectLastSeen, createProject);
router.get("/getprojects", results, isAuthenticated, ProjectLastSeen, getProjects);
router.delete("/deleteProject", results, isAuthenticated, ProjectLastSeen, deleteProject);
router.put("/updateProject", results, isAuthenticated, ProjectLastSeen, updateProjectTitle);

router.post("/createTable", results, isAuthenticated, ProjectLastSeen, addProjectManagement);
router.put("/update", results, isAuthenticated, updateProjectManagement);
router.post("/addRow", results, isAuthenticated, ProjectLastSeen, addRowProjectManagement);
router.post("/addColumn", results, isAuthenticated, ProjectLastSeen, addColumnProjectManagement);
router.delete(
  "/deleteTable",
  results,
  isAuthenticated,
  ProjectLastSeen,
  deleteTableProjectManagement
);
router.delete("/deleteRow", results, isAuthenticated, ProjectLastSeen, deleteRowProjectManagement);
router.delete(
  "/deleteColumn",
  results,
  isAuthenticated,
  ProjectLastSeen,
  deleteColumnProjectManagement
);
router.get(
  "/getActivity", 
  results, 
  isAuthenticated, 
  ProjectLastSeen, 
  ActivityAndLastSeen
  );


module.exports = router;
