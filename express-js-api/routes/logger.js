'use strict';
var express = require('express');
const logController = require("../controllers/logController");
var router = express.Router();

/* GET users listing. */
router
    .get('/', logController.getAllLogs)
    .post('/', logController.createLog)
    .delete('/:id', logController.deleteLog);
module.exports = router;
