
const express = require("express");
const router = express.Router();
        
const noticiasNipponJpController = require("../controllers/noticiasNipponJpController");
        
router.get("/home", noticiasNipponJpController.home);
        
module.exports = router; 