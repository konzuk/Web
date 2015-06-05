
(function () {
    "use strict";

    var app = angular.module("app");

    var controllerId = "homeCon";
    app.controller(controllerId,
        ["$scope", "common", home]);


    app.config(["$routeProvider",
      function ($routeProvider) {
          $routeProvider.
          when("/home", {
              title: "HomePage",
              templateUrl: "app/module/home/home.html",
              controller: "homeCon"
             
          })
            .otherwise({
                redirectTo: "/home"
            });
      }
    ]);

    app.run(["config",
      function (config) {
          config.navBars.push({
              href: "/home",
              text: "HomePage",
              level: 1
          });
      }
    ]);


    function home($scope, common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
       
        $scope.message = "This_is_Home_Page";
        activate();
        function activate() {
            common.activateController([], controllerId)
                 .then(function () { log("Activated Home"); });
        }
    };
})();



