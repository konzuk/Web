
(function () {
    "use strict";

    var app = angular.module("app");

    var controllerId = "checkboxCon";
    app.controller(controllerId,
        ["$scope", "common", checkbox]);


    app.config(["$routeProvider",
      function ($routeProvider) {
          $routeProvider.
              when("/checkbox", {
                  title: "CheckboxPage",
                  templateUrl: "app/module/checkbox/checkbox.html",
                  controller: "checkboxCon"

              });
      }
    ]);

    app.run(["config",
      function (config) {
          config.navBars.push({
              href: "/checkbox",
              text: "CheckboxPage",
              level: 1
          });
      }
    ]);


    function checkbox($scope, common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
       
        $scope.message = "This is Checkbox Page";
        activate();
        function activate() {
            common.activateController([], controllerId)
                 .then(function () {});
        }
    };
})();



