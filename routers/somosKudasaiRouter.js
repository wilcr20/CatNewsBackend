const express = require("express");
const router = express.Router();

const somosKudasaiController = require("../controllers/somosKudasaiController");

router.get("/home", somosKudasaiController.home);

module.exports = router;
