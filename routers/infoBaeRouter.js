
const express = require("express");
const router = express.Router();
        
const infoBaeController = require("../controllers/infoBaeController");
        
router.get("/home", infoBaeController.home);
        
module.exports = router; 