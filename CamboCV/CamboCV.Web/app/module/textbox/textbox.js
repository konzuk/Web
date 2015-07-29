
(function () {
    "use strict";

    var app = angular.module("app");

    var controllerId = "textboxCon";
    app.controller(controllerId,
        ["$scope", "common", textbox]);


    app.config(["$routeProvider",
      function ($routeProvider) {
          $routeProvider.
              when("/textbox", {
                  title: "TextboxPage",
                  templateUrl: "app/module/textbox/textbox.html",
                  controller: "textboxCon"

              });
      }
    ]);

    app.run(["config",
      function (config) {
          config.navBars.push({
              href: "/textbox",
              text: "TextboxPage",
              level: 1
          });
      }
    ]);


    function textbox($scope, common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
       
        $scope.message = "This is Textbox Page";
        activate();
        function activate() {
            common.activateController([], controllerId)
                 .then(function () {});
        }
    };
})();



