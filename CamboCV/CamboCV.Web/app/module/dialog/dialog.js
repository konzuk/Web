
(function () {
    "use strict";

    var app = angular.module("app");

    var controllerId = "dialogCon";
    app.controller(controllerId,
        ["$scope", "common", dialog]);


    app.config(["$routeProvider",
      function ($routeProvider) {
          $routeProvider.
              when("/dialog", {
                  title: "DialogPage",
                  templateUrl: "app/module/dialog/dialog.html",
                  controller: "dialogCon"

              });
      }
    ]);

    app.run(["config",
      function (config) {
          config.navBars.push({
              href: "/dialog",
              text: "DialogPage",
              level: 1
          });
      }
    ]);


    function dialog($scope, common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
       
        $scope.message = "This is Dialog Page";
        activate();
        function activate() {
            common.activateController([], controllerId)
                 .then(function () {});
        }
    };
})();



