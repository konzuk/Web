﻿(function () {
    'use strict';

    var app = angular.module('app');


    var keyCodes = {
        backspace: 8,
        tab: 9,
        enter: 13,
        esc: 27,
        space: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        insert: 45,
        del: 46
    };

    var events = {
        controllerActivateEvent: 'controller.activateSuccess',
        routeChangeEvent: 'route.change',
        gettingDataEvent: 'data.getting',
        translateEvent: 'translate.translating'
    };

    var locales = {
        langList: [
        {
            keyLang: 'km-KH',
            valuelang: 'ខ្មែរ',
            iconlang: '',
            fontfamily: {
                headerFont: "Khmer OS Muol Light",
                itemFont: "Khmer OS Muol Light",
            }
        }, {
            keyLang: 'en-US',
            valuelang: 'English',
            iconlang: '',
            fontfamily: {
                headerFont: "Buxton Sketch",
                itemFont: "Buxton Sketch",
            }
        }
        ],
        preferredLocale: 'en-US'
    };


    var config = {
        appErrorPrefix: '[CCV Error] ',
        docTitle: '',
        events: events,
        keyCodes: keyCodes,
        version: '1.0.0',
        locales: locales,
        langCookie: 'lc',
        tm: TweenMax,
        tl: new TimelineLite(),
        navBars: []

    };

    app.constant('DEBUG_MODE', /*DEBUG_MODE*/true /*DEBUG_MODE*/);



    app.value('config', config);

    app.config(['$logProvider', 'DEBUG_MODE', function ($logProvider, DEBUG_MODE) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(DEBUG_MODE);
        }
    }]);

    app.config(['$translateProvider', '$provide', '$translatePartialLoaderProvider', function ($translateProvider, $provide, $translatePartialLoaderProvider) {


        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'api/{part}/{lang}'
        });

        $translatePartialLoaderProvider.addPart('getLang');


        // Tell the module what language to use by default
        $translateProvider.preferredLanguage(locales.preferredLocale);

        // Tell the module to store the language in the Local
        $translateProvider.useCookieStorage();


        // Tell the module to use a key 'lang' in the storage instead of default key
        $translateProvider.storageKey(config.langCookie);
        $translateProvider.useSanitizeValueStrategy('escaped');
    }]);


    app.config(function ($mdThemingProvider, $mdIconProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('pink')
            .warnPalette('green')
            .backgroundPalette('yellow');

        $mdIconProvider.fontSet('fa', 'fontawesome');


    });

})();