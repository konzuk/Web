(function () {
    'use strict';

    // Must configure the common service and set its 
    
    angular.module('common')
        .factory('spinner', ['common', 'config', spinner]);

    function spinner(common, config) {
        var service;

        
        service = {
            spinnerRouteChangeHide: spinnerRouteChangeHide,
            spinnerRouteChangeShow: spinnerRouteChangeShow,
            spinnerTranslateHide: spinnerTranslateHide,
            spinnerTranslateShow: spinnerTranslateShow,
            spinnerGetDataHide: spinnerGetDataHide,
            spinnerGetDataShow: spinnerGetDataShow,
        };

        return service;

        function spinnerRouteChange(show) {
            common.$broadcast(config.events.routeChangeEvent, { show: show });
        }

        function spinnerTranslate(show) {
            common.$broadcast(config.events.translateEvent, { show: show });
        }

        function spinnerGetData(show) {
            common.$broadcast(config.events.gettingDataEvent, { show: show });
        }


        function spinnerRouteChangeHide() { spinnerRouteChange(false); }

        function spinnerRouteChangeShow() { spinnerRouteChange(true); }


        function spinnerTranslateHide() { spinnerTranslate(false); }

        function spinnerTranslateShow() { spinnerTranslate(true); }


        function spinnerGetDataHide() { spinnerGetData(false); }

        function spinnerGetDataShow() { spinnerGetData(true); }




    }
})();