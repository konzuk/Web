(function () {
    'use strict';
    
    angular.module('common').factory('logger', ['$log', logger]);

    function logger($log) {
        var service = {
            getLogFn: getLogFn,
            log: log,
            logError: logError,
            logSuccess: logSuccess,
            logWarning: logWarning
        };

        return service;

        function getLogFn(moduleId, fnName) {
            fnName = fnName || 'log';
            switch (fnName.toLowerCase()) { // convert aliases
                case 'success':
                    fnName = 'logSuccess'; break;
                case 'error':
                    fnName = 'logError'; break;
                case 'warn':
                    fnName = 'logWarning'; break;
                case 'warning':
                    fnName = 'logWarning'; break;
            }

            var logFn = service[fnName] || service.log;
            return function (msg, data, showToast) {
                logFn(msg, data, moduleId, (showToast === undefined) ? true : showToast);
            };
        }

        function log(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'info');
        }

        function logWarning(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'warning');
        }

        function logSuccess(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'success');
        }

        function logError(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'error');
        }

        function logIt(message, data, source, showToast, toastType) {
            var write = (toastType === 'error') ? $log.error : $log.log;
            source = source ? '[' + source + '] ' : '';
            write(source, message, data);
            if (showToast) {
                if (toastType === 'error') {
                    logShowError(message);
                } else if (toastType === 'warning') {
                    logShowWarning(message);
                } else if (toastType === 'success') {
                    logShowNotice(message);
                } else {
                    logShowNotice(message);
                }
            }
        }

        function logShowNotice(message) {
            //var notification = new NotificationFx({
            //    message: '<span class="icon fa fa-3x fa-info-circle"></span><p>' + message + '</p>',
            //    layout: 'growl',
            //    effect: 'genie',
            //    type: 'notice', // notice, warning or error
            //    ttl: 2500,
            //    onClose: function () {
                    
            //    }
            //});
            //notification.show();
        }

        function logShowWarning(message) {
            //var notification = new NotificationFx({
            //    message: '<span class="icon fa fa-2x fa-warning"></span><p>' + message + '</p>',
            //    layout: 'growl',
            //    effect: 'genie',
            //    type: 'warning', // notice, warning or error
            //    ttl: 2500,
            //    onClose: function () {

            //    }
            //});
            //notification.show();
        }

        function logShowError(message) {
            //var notification = new NotificationFx({
            //    message: '<span class="icon fa fa-2x fa-times-circle"></span><p>' + message + '</p>',
            //    layout: 'growl',
            //    effect: 'genie',
            //    type: 'error', // notice, warning or error
            //    ttl: 2500,
            //    onClose: function () {

            //    }
            //});
            //notification.show();
        }
    }
})();