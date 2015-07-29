
(function () {
    "use strict";

    var app = angular.module("app");

    var controllerId = "buttonCon";
    app.controller(controllerId,
        ["$scope", "common", button]);


    app.config(["$routeProvider",
      function ($routeProvider) {
          $routeProvider.
              when("/button", {
                  title: "ButtonPage",
                  templateUrl: "app/module/button/button.html",
                  controller: "buttonCon"

              });
      }
    ]);

    app.run(["config",
      function (config) {
          config.navBars.push({
              href: "/button",
              text: "ButtonPage",
              level: 1
          });
      }
    ]);


    function button($scope, common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
       
        $scope.message = "This is Button Page";
        activate();
        function activate() {
            common.activateController([], controllerId)
                 .then(function () {});
        }
    };
})();



