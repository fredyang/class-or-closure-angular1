///-------service implemented by class---
var ClassBackend = (function () {
    //save $q for reference
    function ClassBackend($q) {
        this.$q = $q;
    }
    ClassBackend.$inject = ["$q"];
    ClassBackend.prototype.login = function (userName, password) {
        //access $q via 'this' reference
        return this.$q.when(password === '123');
    };
    return ClassBackend;
})();
//use module.service method, as it will use 'new' to call class ClassBackend
// which it is essentially a constructor function
angular.module('app').service('classBackend', ClassBackend);
///------service implemented by closure----
angular.module('app').factory('closureBackend', ["$q", function ($q) {
    return {
        login: function (userName, password) {
            //access $q via closure
            return $q.when(password === '123');
        }
    };
}]);
