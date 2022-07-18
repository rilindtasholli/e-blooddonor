'use strict';
var express = require('express');
const notificationsController = require("../controllers/notificationsController");
var router = express.Router();

/* GET notifications listing. */
router
    .get('/', notificationsController.getAllNotifications)
    .post('/', notificationsController.createNotifications)
    .delete('/:id', notificationsController.deleteNotifications);
module.exports = router;
