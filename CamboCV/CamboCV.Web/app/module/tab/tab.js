
(function () {
    "use strict";

    var app = angular.module("app");

    var controllerId = "tabCon";
    app.controller(controllerId,
        ["$scope", "common", tab]);


    app.config(["$routeProvider",
      function ($routeProvider) {
          $routeProvider.
              when("/tab", {
                  title: "TabPage",
                  templateUrl: "app/module/tab/tab.html",
                  controller: "tabCon"

              });
      }
    ]);

    app.run(["config",
      function (config) {
          config.navBars.push({
              href: "/tab",
              text: "TabPage",
              level: 1
          });
      }
    ]);


    function tab($scope, common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
       
        $scope.message = "This is Tab Page";
        activate();
        function activate() {
            common.activateController([], controllerId)
                 .then(function () {});
        }
    };
})();



