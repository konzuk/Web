
(function () {
    "use strict";

    var app = angular.module("app");

    var controllerId = "radioCon";
    app.controller(controllerId,
        ["$scope", "common", radio]);


    app.config(["$routeProvider",
      function ($routeProvider) {
          $routeProvider.
              when("/radio", {
                  title: "RadioPage",
                  templateUrl: "app/module/radio/radio.html",
                  controller: "radioCon"

              });
      }
    ]);

    app.run(["config",
      function (config) {
          config.navBars.push({
              href: "/radio",
              text: "RadioPage",
              level: 1
          });
      }
    ]);


    function radio($scope, common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
       
        $scope.message = "This is Radio Page";
        activate();
        function activate() {
            common.activateController([], controllerId)
                 .then(function () {});
        }
    };
})();



