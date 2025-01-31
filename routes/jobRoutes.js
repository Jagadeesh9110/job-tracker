const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

router.get("/", jobController.getIndex);

module.exports = router;
