import express = require('express');

import { AppRequest, AppRequestWithBody, AppRequestWithParams } from '../server/AppRequest';

var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req: AppRequest, res) {
    req.userService.getAll(function (users) {
        res.json(users);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req: AppRequestWithBody<User>, res) {
    req.userService.create(req.body, function (result) {
        res.send(result);
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req: AppRequestWithParams<{ id: string }>, res) {
    req.userService.remove(req.params.id, function (result) {
        res.send(result);
    });
});

export = router;