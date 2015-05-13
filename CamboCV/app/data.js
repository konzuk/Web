
(function () {
    'use strict';

    var app = angular.module('app');


    app.factory("data", ['$http', '$cacheFactory', '$q',
        function ($http, $cacheFactory, $q) {

            var serviceBase = 'api/';
            var cache = $cacheFactory('cache');
            var obj = {};


            obj.gets = function (q) {

                var deferred = $q.defer();
                var test = cache.get(q);
                if (test === undefined) {
                    $http.get(serviceBase + q).then(function (results) {
                        cache.put(q, results === undefined ? null : results);
                        deferred.resolve(results);
                    });
                } else {
                    deferred.resolve(test);
                }
                return deferred.promise;
            };

            obj.refresh = function (q) {
                return $http.get(serviceBase + q).then(function (results) {
                    cache.put(q, results === undefined ? null : results);
                    return results;
                });
            };
            obj.get = function (q) {

                return $http.get(serviceBase + q).then(function (results) {
                    return results;
                });
            };
            obj.get = function (q, id) {

                return $http.get(serviceBase + q + "/" + id).then(function (results) {
                    return results;
                });
            };
            obj.post = function (q, object) {
                return $http.post(serviceBase + q, object).then(function (results) {
                    return results;
                });
            };
            obj.put = function (q, object) {
                return $http.put(serviceBase + q, object).then(function (results) {
                    return results;
                });
            };

            //obj.delete = function (q, id) {
            //    var request = $http({
            //        method: "delete",
            //        url: serviceBase + q + "/" + id
            //    });
            //    return request;
            //}

            obj.delete = function (q, id) {
                return $http.delete(serviceBase + q + "/" + id).then(function (results) {
                    return results;
                });
            };
            return obj;
        }]);

    


})();