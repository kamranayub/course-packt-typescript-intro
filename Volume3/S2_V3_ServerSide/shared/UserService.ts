declare interface UserService {
    getAll(fn: (users: User[]) => void): void;
    create(user: User, fn: (result: UserServiceResult) => void): void;
    remove(id: string, fn: (result: UserServiceResult) => void): void;
}

declare interface UserServiceResult {
    msg: string;
}