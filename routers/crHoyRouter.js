const express = require("express");
const router = express.Router();

const crHoyController = require("../controllers/crHoyController");

router.get("/home", crHoyController.home);

module.exports = router;
