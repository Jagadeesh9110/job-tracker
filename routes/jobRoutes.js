const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

// Route for the home page
router.get("/", jobController.getIndex);

// Route to display the "Add Job" form
router.get("/addJob", jobController.getCreateJob);

// Route to handle the form submission for adding a new job
router.post("/addJob", jobController.postCreateJob);

router.get("/dashboard", jobController.getDashboard);

module.exports = router;
