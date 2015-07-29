
(function () {
    "use strict";

    var app = angular.module("app");

    var controllerId = "cardCon";
    app.controller(controllerId,
        ["$scope", "common", card]);


    app.config(["$routeProvider",
      function ($routeProvider) {
          $routeProvider.
              when("/card", {
                  title: "CardPage",
                  templateUrl: "app/module/card/card.html",
                  controller: "cardCon"

              });
      }
    ]);

    app.run(["config",
      function (config) {
          config.navBars.push({
              href: "/card",
              text: "CardPage",
              level: 1
          });
      }
    ]);


    function card($scope, common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
       
        $scope.message = "This is Card Page";
        activate();
        function activate() {
            common.activateController([], controllerId)
                 .then(function () {});
        }
    };
})();



