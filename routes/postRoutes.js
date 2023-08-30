const express = require("express");
const authController = require("../controller/PostJobController");
// const { verifyToken } = require('../utils/jwt');
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in the "uploads" directory.
  },
  filename: (req, file, cb) => {
    // Generate a unique name for the uploaded file.
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/CreatePost/:id", upload.single("postImg"),authController.CreateJob);
router.delete("/deletePost/:id", authController.deleteJob);
router.get("/getJobList", authController.JobList);
router.get("/userPosts/:id", authController.userPost);

module.exports = router;
