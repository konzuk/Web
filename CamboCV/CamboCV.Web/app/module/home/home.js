
(function () {
    'use strict';

    var app = angular.module('app');

    var controllerId = 'homeCon';
    app.controller(controllerId,
        ['$scope', 'common', home]);


    app.config(['$routeProvider',
      function ($routeProvider) {
          $routeProvider.
          when('/home', {
              title: 'home',
              templateUrl: 'app/module/home/home.html',
              controller: 'homeCon',
              tab: "home"
          })
            .otherwise({
                redirectTo: '/home'
            });
      }
    ]);

    app.run(['config',
      function (config) {
          config.navBars.push({
              href: "#/home",
              text: "Home",
          });
      }
    ]);


    function home($scope, common) {

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        $scope.title = "Home";
        $scope.message = "This is Home Page";

        activate();

        function activate() {
            common.activateController([], controllerId)
                 .then(function () { log('Activated Home'); });
        }



    };
})();



