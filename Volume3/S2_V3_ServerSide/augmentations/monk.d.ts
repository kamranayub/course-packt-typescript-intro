/// <reference path="../node_modules/@types/monk/index.d.ts" />

import 'monk';

declare module "monk" {
    interface CollectionOf<T> {
        insert(data: Partial<T>, fn?: MonkHandler<T>): promise;
        insert(data: Partial<T>, options?: Object, fn?: MonkHandler<T>): promise;
        find(needle: Partial<T>, options?: Object, fn?: MonkHandler<T[]>): promise;
        findOne(needle: Partial<T>, options?: Object, fn?: MonkHandler<T>): promise;
        remove(needle: Partial<T> | string, options?: Object, fn?: MonkHandler<T>): promise;
    }

    interface Monk {
        get<T>(collection:string): CollectionOf<T>;
    }

    interface MonkHandler<T> {
        (err: any, docs: T): any;
    }
}