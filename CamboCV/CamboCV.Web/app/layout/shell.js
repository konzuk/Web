(function () {
    "use strict";

    var controllerId = "shell";

    
    angular.module("app").controller(controllerId,
        ["$rootScope", "$scope", "$location", "$translate", "common", "config", "spinner", shell]);

    function shell($rootScope, $scope, $location, $translate, common, config,spinner) {
        
       
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);


        
        
        $scope.test = 'Test';
       
        $scope.navBarLists = config.navBars;
        $scope.langList = config.locales.langList;
        $scope.isRouteChanging = false;
        $scope.isDataGetting = false;
        $scope.isTranslating = true;
        $scope.isFirstLoad = false;


        $scope.langBind = '';
        $scope.isActive = function (route) {
            var path = "#" + $location.path();
            return path.indexOf(route) === 0;
        };


        $rootScope.$on('$translateLoadingStart', function () {
            spinner.spinnerTranslateShow();
        });

        $rootScope.$on('$translateChangeEnd', function (event,args) {
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
       

        function activate() {
            common.activateController([], controllerId)
                 .then(function () {
                     log("Activated Shell");
                     $scope.isFirstLoad = false;
                });
        }

        $rootScope.$on(config.events.controllerActivateEvent,
            function (data) {
                //DO something with data.controllerId
            }
        );

       
        $rootScope.$on(config.events.routeChangeEvent,
            function(event, args) {
                $scope.isRouteChanging = args.show;

            }
        );

        $rootScope.$on(config.events.translateEvent,
           function (event, args) {
               $scope.isTranslating = args.show;
              
           }
       );

        $rootScope.$on(config.events.gettingDataEvent,
           function (event, args) {
               $scope.isDataGetting = args.show;
           }
       );

    };
})();