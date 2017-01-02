"use strict";
var express = require("express");
var router = express.Router();
/*
 * GET userlist.
 */
router.get('/userlist', function (req, res) {
    req.userService.getAll(function (users) {
        res.json(users);
    });
});
/*
 * POST to adduser.
 */
router.post('/adduser', function (req, res) {
    req.userService.create(req.body, function (result) {
        res.send(result);
    });
});
/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function (req, res) {
    req.userService.remove(req.params.id, function (result) {
        res.send(result);
    });
});
module.exports = router;
