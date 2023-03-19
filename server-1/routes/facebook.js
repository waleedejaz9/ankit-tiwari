const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const {
  getCode,
  getAccessToken,
  getFacebookPages,
  getFacebookPagePosts,
  createCommnetOnFacebookPage,
  createFacebookPost
} = require("../controllers/facebook");

router.get("/auth", isAuthenticated, getCode);
router.get("/auth/callback/:code", isAuthenticated, getAccessToken);
router.get("/get-pages/:access_token", isAuthenticated, getFacebookPages);
router.get("/get-page-posts/:access_token/:pageId", isAuthenticated, getFacebookPagePosts);
router.post("/create-page-posts/:access_token/:message", isAuthenticated, createCommnetOnFacebookPage);
router.post("/comment-on-post/:access_token/:postId/:message", isAuthenticated, createFacebookPost);

module.exports = router;
