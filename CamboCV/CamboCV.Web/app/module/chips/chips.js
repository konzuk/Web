
(function () {
    "use strict";

    var app = angular.module("app");

    var controllerId = "chipsCon";
    app.controller(controllerId,
        ["$scope", "common", chips]);


    app.config(["$routeProvider",
      function ($routeProvider) {
          $routeProvider.
              when("/chips", {
                  title: "ChipsPage",
                  templateUrl: "app/module/chips/chips.html",
                  controller: "chipsCon"

              });
      }
    ]);

    app.run(["config",
      function (config) {
          config.navBars.push({
              href: "/chips",
              text: "ChipsPage",
              level: 1
          });
      }
    ]);


    function chips($scope, common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
       
        $scope.message = "This is Chips Page";
        activate();
        function activate() {
            common.activateController([], controllerId)
                 .then(function () {});
        }
    };
})();



