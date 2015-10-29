///------------ directive "implemented" by class --------
//implementing ng.IDirective is optional
class CounterWidget implements ng.IDirective {

    constructor(private $timeout) {
        //all the dependencies have to be attached to
        // instance "this"
        //
        // "private" just make the compiler think it is 'private'
        // but it still accessible externally in the generated
        //javascript
    }

    restrict = "EAC";

    template = "<div>counter-widget-class:{{count}}</div>";

    scope = {
        delay: "="
    };

    link = (scope, $elem, attrs) => {
        //access dependencies via "this"
        var $timeout = this.$timeout;
        //
        var delay = scope.delay || 1000;
        scope.count = 1;
        (function repeat() {
            $timeout(function () {
                scope.count++;
                repeat();
            }, delay);
        })();
    }
}


angular.module('app').directive("counterWidgetClass", function ($timeout) {
    //directive is still created using closure under the hood
    return new CounterWidget($timeout);
});


//---- directive implemented by closure ---------
//implementing ng.IDirective is optional
angular.module('app').directive('counterWidgetClosure', function ($timeout) {
        //$timeout is closured and it is accessible to inner function
        return {
            restrict: "EAC",

            template: "<div>counter-widget-closure:{{count}}</div>",

            scope: {
                delay: "="
            },

            link: (scope:any, $elem, attrs) => {
                //
                var delay = scope.delay || 1000;
                scope.count = 1;
                (function repeat() {
                    $timeout(function () {
                        scope.count++;
                        repeat();
                    }, delay);
                })();
            }
        };
    });
