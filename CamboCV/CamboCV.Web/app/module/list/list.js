
(function () {
    "use strict";

    var app = angular.module("app");

    var controllerId = "listCon";
    app.controller(controllerId,
        ["$scope", "common", list]);


    app.config(["$routeProvider",
      function ($routeProvider) {
          $routeProvider.
              when("/list", {
                  title: "ListPage",
                  templateUrl: "app/module/list/list.html",
                  controller: "listCon"

              });
      }
    ]);

    app.run(["config",
      function (config) {
          config.navBars.push({
              href: "/list",
              text: "ListPage",
              level: 1
          });
      }
    ]);


    function list($scope, common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
       
        $scope.message = "This is List Page";
        activate();
        function activate() {
            common.activateController([], controllerId)
                 .then(function () {});
        }
    };
})();



