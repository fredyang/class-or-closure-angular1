///------controller implemented by class-----------
var ClassController = (function () {
    function ClassController(classBackend) {
        this.classBackend = classBackend;
        this.isAuthenticated = false;
        this.userName = 'Fred Yang';
        this.password = '123';
    }
    ClassController.$inject = ["classBackend"];
    ClassController.prototype.login = function () {
        var _this = this;
        return this.classBackend.login(this.userName, this.password)
            .then(function (isAuthenticated) {
            //need to arrow function to access 'this'
            _this.isAuthenticated = isAuthenticated;
            return isAuthenticated;
        });
    };
    return ClassController;
})();
angular.module('app').controller('ClassController', ClassController);
/////---------controller implemented by closure--------------
angular.module('app').controller('ClosureController', ["closureBackend", function (closureBackend) {
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
                return isAuthenticated;
            });
        }
    };
    return rtn;
}]);
