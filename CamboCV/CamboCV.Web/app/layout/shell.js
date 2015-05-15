(function () {
    "use strict";

    var controllerId = "shell";
    angular.module("app").controller(controllerId,
        ["$rootScope", "$scope", "$location", "$translate", "$translateProvider", "common", "config", shell]);

    function shell($rootScope, $scope, $location, $translate, $translateProvider, common, config) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
       
       
        $scope.navBarLists = config.navBars;
        $scope.langList = config.locales.langList;
        $scope.isBusy = false;
        $scope.isActive = function (route) {
            var path = "#" + $location.path();
            return path.indexOf(route) === 0;
        };

        $scope.setLang = function (langKey) {
            // You can change the language during runtime
            $translate.use(langKey);
        };


        activate();

        function activate() {
            common.activateController([getLang()], controllerId)
                 .then(function () { log("Activated Shell"); });
        }

        
        function getLang() {

            var locales = config.locales.langList;
            
            if (!locales || locales.length === 0) {
                return false;
            }

            locales.forEach(function (locale) {
                data.get('getLang/' + locale.keyLang).then(function (result) {
                    $translateProvider.translations(locale.keyLang, result.data);
                });
            });

            return true;
        }

        $rootScope.$on(config.events.controllerActivateSuccess,
            function (data) {
                //DO something with data.controllerId
            }
        );

        function toggleSpinner(on) { $scope.isBusy = on; }

        $rootScope.$on(config.events.spinnerToggle,
            function (data) { toggleSpinner(data.show); }
        );

    };
})();