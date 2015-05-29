(function () {
    "use strict";

    var controllerId = "shell";

    
    angular.module("app").controller(controllerId,
        ["$rootScope", "$scope", "$location", "$translate", "common", "config", "spinner", shell]);

    function shell($rootScope, $scope, $location, $translate, common, config,spinner) {
        
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        spinner.ActivateSpinner(true);
       
        $scope.navBarLists = config.navBars;
        $scope.langList = config.locales.langList;
        $scope.isRouteChanging = true;
        $scope.isDataGetting = false;
        $scope.isTranslating = true;
        $scope.isFirstLoad = true;


        $scope.langBind = '';
        $scope.isActive = function (route) {
            var path = "#" + $location.path();
            return path.indexOf(route) === 0;
        };


       
        $rootScope.$on('$translateLoadingStart', function () {
            spinner.spinnerTranslateShow();
        });
        
        $rootScope.$on('$translateChangeEnd', function (event, args) {
           
            changeLang(args.language);
        });


        $scope.setLang = function (lang) {
            // You can change the language during runtime
            $translate.use(lang);
        };

        activate();

        function changeLang(key) {
            var lang = key;
            var result = $.grep(config.locales.langList, function (e) { return e.keyLang === lang; });

            if (result.length === 1) {
                $scope.langBind = result[0].fontfamily.itemFont;
            }
            spinner.spinnerTranslateHide();
            
        }

        function reRunTranslate($translate) {

            var key = $translate.storageKey(),
              storage = $translate.storage();

            var fallbackFromIncorrectStorageValue = function () {
                var preferred = $translate.preferredLanguage();
                if (angular.isString(preferred)) {
                    $translate.use(preferred);
                    
                } else {
                    storage.put(key, $translate.use());
                }
            };

            if (storage) {
                if (!storage.get(key)) {
                    fallbackFromIncorrectStorageValue();
                } else {
                    $translate.use(storage.get(key))['catch'](fallbackFromIncorrectStorageValue);
                }
            } else if (angular.isString($translate.preferredLanguage())) {
                $translate.use($translate.preferredLanguage());
            }
        }


        function activate() {
            common.activateController([reRunTranslate($translate)], controllerId)
                 .then(function () {
                     $scope.isFirstLoad = false;
                });
        }

        $rootScope.$on(config.events.controllerActivateEvent,
            function (data) {

                spinner.spinnerRouteChangeHide();
               
            }
        );

       
        $rootScope.$on(config.events.routeChangeEvent,
            function(event, args) {
                $scope.isRouteChanging = args.show;
                spinner.ActivateSpinner($scope.isRouteChanging || $scope.isTranslating || $scope.isDataGetting);

            }
        );

        $rootScope.$on(config.events.translateEvent,
           function (event, args) {
               $scope.isTranslating = args.show;
               spinner.ActivateSpinner($scope.isRouteChanging || $scope.isTranslating || $scope.isDataGetting);

           }
       );

        $rootScope.$on(config.events.gettingDataEvent,
           function (event, args) {
               $scope.isDataGetting = args.show;
               spinner.ActivateSpinner($scope.isRouteChanging || $scope.isTranslating || $scope.isDataGetting);

           }
       );

    };
})();