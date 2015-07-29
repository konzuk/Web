
(function () {
    "use strict";

    var app = angular.module("app");

    var controllerId = "iconsCon";
    app.controller(controllerId,
        ["$scope", "common", "config", icons]);


    app.config(["$routeProvider",
      function ($routeProvider) {
          $routeProvider.
              when("/icons", {
                  title: "IconsPage",
                  templateUrl: "app/module/icons/icons.html",
                  controller: "iconsCon"

              });
      }
    ]);

    app.run(["config",
      function (config) {
          config.navBars.push({
              href: "/icons",
              text: "IconsPage",
              level: 1
          });
      }
    ]);


    function icons($scope, common, config) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
       
        $scope.message = "This is Icons Page";
        activate();
        function activate() {
            common.activateController([], controllerId)
                 .then(function () {});
        }

        $scope.layout = function (obj) {
            var tm = config.tm;

            tm.to(obj, 1, { attr: { layout:'column' }, ease: Linear.easeNone });
        }
    };
})();



