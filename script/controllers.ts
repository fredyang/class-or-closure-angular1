///common interface of controller
//implementing IUser is optional, seems the expression
//in html view is not strong typed yet.
interface IUser {
    isAuthenticated: boolean;
    userName: string;
    password: string;
    login(): ng.IPromise<boolean>
}

///------controller implemented by class-----------
class ClassController implements IUser{
    constructor(private classBackend:IBackend) {
    }

    isAuthenticated = false;
    userName = 'Fred Yang';
    password = '123';

    login() {
        return this.classBackend.login(this.userName, this.password)
            .then((isAuthenticated) => {
                //need to arrow function to access 'this'
                this.isAuthenticated = isAuthenticated;
                return isAuthenticated;
            });
    }
}

angular.module('app').controller('ClassController', ClassController);

/////---------controller implemented by closure--------------
//implementing IUser is optional
angular.module('app').controller('ClosureController',
    function (closureBackend:IBackend) : IUser {

    //here I want to avoid to use "this.xxx = yyy"
    // and explicitly return an object instead implicitly return this
    // so that I can use closure
    var rtn = {
        isAuthenticated: false,
        userName: 'Fred Yang',
        password: '123',
        login: function () {
            return closureBackend.login(this.userName, this.password)
                .then(function (isAuthenticated) {
                    //access isAuthenticated via closure variable,
                    //without using arrow function
                    rtn.isAuthenticated = isAuthenticated;
                    return isAuthenticated
                });
        }
    };

    return rtn;
});
