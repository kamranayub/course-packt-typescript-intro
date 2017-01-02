/// <reference path="../augmentations/monk.d.ts" />

import express = require('express');
// Interfaces
import User = require('../interfaces/User');
import { AppRequest, AppRequestWithBody, AppRequestWithParams } from '../interfaces/AppRequest';

var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req: AppRequest, res) {
    var db = req.db;
    var collection = db.get<User>('userlist');

    collection.find({}, {}, function(err, docs){
        res.json(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req: AppRequestWithBody<User>, res) {
    var db = req.db;
    var collection = db.get<User>('userlist');
    
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req: AppRequestWithParams<{ id: string }>, res) {
    var db = req.db;
    var collection = db.get<User>('userlist');
    var userToDelete = req.params.id;

    collection.remove({ _id: userToDelete }, function(err: string) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

export = router;