/// <reference path="../../shared/User.ts" />
/// <reference path="../../shared/UserService.ts" />

class UserAjaxService implements UserService {

    getAll(fn: (users: User[]) => void) {
        $.getJSON('/users/userlist', fn);
    }

    create(user: User, fn: (result: UserServiceResult) => void) {
        $.ajax({
            type: 'POST',
            data: user,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(fn);
    }

    remove(id: string, fn: (result: UserServiceResult) => void) {
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + id
        }).done(fn);
    }
}