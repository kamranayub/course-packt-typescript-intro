"use strict";
const express = require("express");
var router = express.Router();
/*
 * GET home page.
 */
router.get('/', function (req, res) {
    res.render('index', { title: 'Todo App|Express + MongoDB' });
});
module.exports = router;