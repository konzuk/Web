(function () {
    "use strict";

    var controllerId = "shell";
    angular.module("app").controller(controllerId,
        ["$rootScope","$scope","$location","common", "config", shell]);

    function shell($rootScope,$scope,$location,common, config) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        $scope.navBarLists = config.navBars;
        $scope.isBusy = false;
        $scope.isActive = function (route) {
            var path = "#" + $location.path();
            return path.indexOf(route) === 0;
        };

        activate();

        function activate() {
            common.activateController([], controllerId)
                 .then(function () { log("Activated Shell"); });
        }

        $rootScope.$on(config.events.controllerActivateSuccess,
            function (data) {
                //DO something with data.controllerId
            }
        );

        function toggleSpinner(on) { $scope.isBusy = on; }

        $rootScope.$on(config.events.spinnerToggle,
            function (data) { toggleSpinner(data.show); }
        );

    };
})();