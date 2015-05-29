﻿(function () {
    'use strict';

    // Factory name is handy for logging
    var serviceId = 'routemediator';

    // Define the factory on the module.
    // Inject the dependencies. 
    // Point to the factory definition function.
    angular.module('app')
        .factory(serviceId,
            ['$location', '$rootScope', 'config', 'logger', 'spinner', routemediator]);


    

    function routemediator($location, $rootScope, config, logger, spinner) {
        // Define the functions and properties to reveal.
        var handleRouteChangeError = false;
        var service = {
            setRoutingHandlers: setRoutingHandlers
        };

     

        return service;
        
        function setRoutingHandlers() {
            handleRoutingErrors();
            updateDocTitle();
            handleRouteChangeStart();
        }

        function handleRoutingErrors() {
            $rootScope.$on('$routeChangeError',
                function (event, current, previous, rejection) {
                    if (handleRouteChangeError) { return; }
                    handleRouteChangeError = true;
                    var msg = 'Error routing: ' + (current && current.name)
                        + '. ' + (rejection.msg || '');
                    logger.logWarning(msg, current, serviceId, true);
                    $location.path('/home');


                });
        }

        function handleRouteChangeStart() {
            $rootScope.$on('$routeChangeStart',
                function (previous) {
                    spinner.spinnerRouteChangeShow();
                });
        }

        function updateDocTitle() {
            $rootScope.$on('$routeChangeSuccess',
                function(event, current, previous) {
                    handleRouteChangeError = false;
                    var title = config.docTitle + ' ' + (current.title || '');
                    $rootScope.title = title;
                });
        }

        
    }
})();