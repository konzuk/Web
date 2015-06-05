(function () {
    'use strict';

    var app = angular.module("app");

    app.animation('.ngAnimateTwo', ['config', function (config) {
        var tm = config.tm;
        return {
            enter: function (element, done) {

                var cladd = 'testAdd';
                var cladddot = '.' + cladd;

                element.addClass(cladd);

               
                
                tm.killChildTweensOf(document.getElementById('shell'), true);

                tm.set(cladddot, { opacity: 0,position:'absolute',  left: '+=20px' });
               
                tm.to(cladddot, 1, {
                    left: '-=20px',
                    delay: 0.5,
                    opacity: 1,
                    onComplete: function() {
                        element.removeClass(cladd);
                        done();
                    }
                });
            },
            leave: function (element, done) {

                var cladd = 'testRemove';
                var cladddot = '.' + cladd;

                element.addClass(cladd);

                tm.set(cladddot, { position: 'absolute' });


                tm.to(cladddot, 0.5, {
                    opacity: 0,
                    left: '+=20px',


                    onComplete: function () {
                        element.removeClass(cladd);
                        done();
                    }
                });
            }
        };
    }]);


    app.animation('.ngAnimateOne', ['config', function (config) {
        var tm = config.tm;
        return {
            enter: function (element, done) {

                var cladd = 'testAdd';
                var cladddot = '.' + cladd;

                element.addClass(cladd);

                tm.killChildTweensOf(document.getElementById('shell'), true);

                tm.set(cladddot, { opacity: 0, position: 'absolute' });

                //tm.to(cladddot, 0.1, { left: '+=20px', position: 'fixed' });

                tm.to(cladddot, 1, {
                    delay: 0.5,
                    opacity: 1,

                    onComplete: function () {
                        element.removeClass(cladd);
                        done();
                    }
                });
            },

            leave: function (element, done) {

                var cladd = 'testRemove';
                var cladddot = '.' + cladd;

                element.addClass(cladd);

                tm.set(cladddot, { position: 'absolute' });


                tm.to(cladddot, 0.5, {
                    opacity: 0,
                    onComplete: function () {
                        element.removeClass(cladd);
                        done();
                    }
                });
            }
        };
    }]);

    


})();