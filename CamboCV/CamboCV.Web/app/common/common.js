(function () {
    "use strict";

    // Define the common module 
    // Contains services:
    //  - common
    //  - logger
    //  - spinner
    var commonModule = angular.module("common", []);

    // Must configure the common service and set its 
  

    commonModule.factory("common",
        ["$q", "$rootScope", "$timeout", "config", "logger", common]);

    commonModule.provider("commonConfig", function () {
        this.config = {
           
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    });

    function common($q, $rootScope, $timeout, config, logger) {

        var service;
        service = {
            // common angular dependencies
            $broadcast: $broadcast,
            $q: $q,
            $timeout: $timeout,
            activateController: activateController,
            logger: logger


        };

        return service;

        function activateController(promises, controllerId) {
            return $q.all(promises).then(function (eventArgs) {
                var data = { controllerId: controllerId };
                $broadcast(config.events.controllerActivateEvent, data);
            });
        }

        function $broadcast(event, data) {
            return $rootScope.$emit(event,data);
        }

        
        
    }
})();