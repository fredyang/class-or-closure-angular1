///------------ directive "implemented" by class --------
var CounterWidget = (function () {
    function CounterWidget($timeout) {
        var _this = this;
        this.$timeout = $timeout;
        this.restrict = "EAC";
        this.template = "<div>counter-widget-class:{{count}}</div>";
        this.scope = {
            delay: "="
        };
        this.link = function (scope, $elem, attrs) {
            //access dependencies via "this"
            var $timeout = _this.$timeout;
            //
            var delay = scope.delay || 1000;
            scope.count = 1;
            (function repeat() {
                $timeout(function () {
                    scope.count++;
                    repeat();
                }, delay);
            })();
        };
        //all the dependencies have to be attached to
        // instance "this"
        //
        // "private" just make the compiler think it is 'private'
        // but it still accessible externally in the generated
        //javascript
    }
    return CounterWidget;
})();
angular.module('app').directive("counterWidgetClass", ["$timeout", function ($timeout) {
    //directive is still created using closure under the hood
    return new CounterWidget($timeout);
}]);
//---- directive implemented by closure ---------
angular.module('app').directive('counterWidgetClosure', ["$timeout", function ($timeout) {
    //$timeout is closured and it is accessible to inner function
    return {
        restrict: "EAC",
        template: "<div>counter-widget-closure:{{count}}</div>",
        scope: {
            delay: "="
        },
        link: function (scope, $elem, attrs) {
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
}]);
