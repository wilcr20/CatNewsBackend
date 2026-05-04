
const express = require("express");
const router = express.Router();
        
const japanTodayController = require("../controllers/japanTodayController");
        
router.get("/home", japanTodayController.home);
        
module.exports = router; 