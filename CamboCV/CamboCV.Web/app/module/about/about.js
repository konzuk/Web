
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
              title: 'AboutPage',
              templateUrl: 'app/module/about/about.html',
              controller: 'aboutCon',
             
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
              text: "AboutPage"
          });
      }
    ]);


    function about($scope, common) {

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        $scope.message = "This is About Page";

        activate();

        function activate() {
            common.activateController([], controllerId)
                 .then(function () { log('Activated About'); });
        }



    };
})();



