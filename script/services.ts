// common interface of Backend service
// implementing it seems to be good idea, it is used by
//both ClassBackend and closureBackend
interface IBackend {
    login(userName: string, password: string) : ng.IPromise<boolean>
}

///-------service implemented by class---
class ClassBackend implements IBackend {
    //save $q for reference
    constructor(private $q) {
    }
    login(userName: string, password: string) {
        //access $q via 'this' reference
        return this.$q.when(password === '123');
    }
}

//use module.service method, as it will use 'new' to call class ClassBackend
// which it is essentially a constructor function
angular.module('app').service('classBackend', ClassBackend);


///------service implemented by closure----
angular.module('app').factory('closureBackend', function ($q): IBackend {

    return {
        login: function(userName: string, password: string) {
            //access $q via closure
            return $q.when(password === '123')
        }
    };

});
