"use strict";
var UserCollection = 'userlist';
var MongoUserService = (function () {
    function MongoUserService(_db) {
        this._db = _db;
    }
    MongoUserService.prototype.getAll = function (fn) {
        var collection = this._db.get(UserCollection);
        collection.find({}, {}, function (err, docs) {
            fn(docs);
        });
    };
    MongoUserService.prototype.create = function (user, fn) {
        var collection = this._db.get(UserCollection);
        collection.insert(user, function (err, result) {
            fn(err === null ? { msg: '' } : { msg: 'error:' + err });
        });
    };
    MongoUserService.prototype.remove = function (id, fn) {
        var collection = this._db.get(UserCollection);
        collection.remove({ _id: id }, function (err) {
            fn(err === null ? { msg: '' } : { msg: 'error: ' + err });
        });
    };
    return MongoUserService;
}());
module.exports = MongoUserService;
