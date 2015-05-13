
(function () {
    'use strict';

    var app = angular.module('app');

    var controllerId = 'aboutCon';
    app.controller(controllerId,
        ['$scope', 'common', about]);


    app.config(['$routeProvider',
      function ($routeProvider) {
          $routeProvider.
          when('/about', {
              title: 'About',
              templateUrl: 'app/module/about/about.html',
              controller: 'aboutCon',
              tab: "about"
          })
            .otherwise({
                redirectTo: '/home'
            });
      }
    ]);

    app.run(['config',
      function (config) {
          config.navBars.push({
              href: "#/about",
              text: "About",
          });
      }
    ]);


    function about($scope, common) {

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        $scope.title = "About";
        $scope.message = "This is About Page";

        activate();

        function activate() {
            common.activateController([], controllerId)
                 .then(function () { log('Activated About'); });
        }



    };
})();



