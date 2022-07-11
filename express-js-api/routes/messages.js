'use strict';
var express = require("express");
const messagesController = require("../controllers/messagesController");
var router = express.Router();

router  
      .get("/", messagesController.getAllMessages)
      .post("/", messagesController.createMessage)
      .delete("/", messagesController.deleteMessage);
    
module.exports = router;