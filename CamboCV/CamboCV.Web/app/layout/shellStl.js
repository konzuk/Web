(function () {
    'use strict';


    var app = angular.module("app");

    app.animation('.test', ['config', function (config) {
        var tm = config.tm;
        return {
            enter: function (element, done) {
                
                classie.add(element[0], 'testAdd');


                tm.killChildTweensOf(document.getElementById('theView'), true);
              

                tm.set('.testAdd', { opacity: 0, x: '20px' });
                tm.to('.testAdd', 1, {
                    x: '0',
                    delay: 0.5,
                    opacity: 1,
                    
                    onComplete: function() {
                        classie.remove(element[0], 'testAdd');
                        done();
                    }
                });
            },


            leave: function (element, done) {
                classie.add(element[0], 'testRemove');
                 
                tm.to('.testRemove', 0.5, {
                    opacity: 0,
                    x: '20px',
                    onComplete: function () {
                        classie.remove(element[0], 'testRemove');
                        done();
                    }
                });
            }
        };
    }]);
})();