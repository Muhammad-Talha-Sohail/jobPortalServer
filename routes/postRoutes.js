const express = require("express");
const authController = require("../controller/PostJobController");
// const { verifyToken } = require('../utils/jwt');
const router = express.Router();

router.post("/CreatePost/:id", authController.CreateJob);
router.delete("/deletePost/:id", authController.deleteJob);
router.get("/getJobList", authController.JobList);
router.get("/userPosts/:id", authController.userPost);


module.exports = router;
