"use strict";
var UserCollection = 'userlist';
var UserMongoService = (function () {
    function UserMongoService(_db) {
        this._db = _db;
    }
    UserMongoService.prototype.getAll = function (fn) {
        var collection = this._db.get(UserCollection);
        collection.find({}, {}, function (err, docs) {
            fn(docs);
        });
    };
    UserMongoService.prototype.create = function (user, fn) {
        var collection = this._db.get(UserCollection);
        collection.insert(user, function (err, result) {
            fn(err === null ? { msg: '' } : { msg: 'error:' + err });
        });
    };
    UserMongoService.prototype.remove = function (id, fn) {
        var collection = this._db.get(UserCollection);
        collection.remove({ _id: id }, function (err) {
            fn(err === null ? { msg: '' } : { msg: 'error: ' + err });
        });
    };
    return UserMongoService;
}());
module.exports = UserMongoService;
