import monk = require('monk');

const UserCollection = 'userlist';

class MongoUserService implements UserService {    

    constructor(private _db: monk.Monk) {
    }

    getAll(fn: (users: User[]) => void) {
        var collection = this._db.get<User>(UserCollection);

        collection.find({}, {}, function(err, docs){
            fn(docs);
        });
    }

    create(user: User, fn: (result: UserServiceResult) => void) {
        var collection = this._db.get<User>(UserCollection);
    
        collection.insert(user, function(err, result) {
            fn(err === null ? { msg: '' } : { msg: 'error:' + err });
        });
    }

    remove(id: string, fn: (result: UserServiceResult) => void) {
        var collection = this._db.get<User>(UserCollection);

        collection.remove({ _id: id }, function(err: string) {
            fn(err === null ? { msg: '' } : { msg: 'error: ' + err });
        });
    }
}

/**
 * Augment the global monk declarations to add generic support.
 * This could be moved out to a separate declarations file
 * when more services are added.
 */
declare module 'monk' {
    interface CollectionOf<T> {
        insert(data: Partial<T>, fn?: MonkHandler<T>): promise;
        find(needle: Partial<T>, options?: Object, fn?: MonkHandler<T[]>): promise;
        remove(needle: Partial<T> | string, options?: Object, fn?: MonkHandler<T>): promise;
    }

    interface Monk {
        get<T>(collection:string): CollectionOf<T>;
    }

    interface MonkHandler<T> {
        (err: any, docs: T): any;
    }
}

export = MongoUserService