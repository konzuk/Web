(function() {
    'use strict';

    var app = angular.module('app');

    var topHeight = '50px';
    var assideWidth = '100px';
    var footerHeight = '50px';
    var twfHeight = '100px';

    var mainColor = '#3c8dbc';
    var subColor = '#a9a9a9';
    var backColor = '#425566';
    var viewColor = '##a9a9a9';


      app.directive("translate", ["config",

        function (config) {

            var directive = {
                restrict: 'A',
                link: function ($scope,element, attr) {
                    $scope.$watch('langBind', function () {
                        element.css("font-family", $scope.langBind);
                    });
                    
                }
            };
            return directive;

            
        }]);

      app.directive("theSlider", ["config",
          function (config) {

              var directive = {
                  restrict: 'A',
                  link: function ($scope, element, attr) {

                      var tm = config.tm;
                      
                      tm.set(element,
                          {
                              backgroundColor: backColor,
                              position: 'fixed',
                              width: assideWidth,
                              height: 'calc(100% - ' + twfHeight + ')',
                              marginTop: topHeight,
                              top: '0px'
                          }
                      );

                     

                      $(element).mCustomScrollbar({

                          scrollButtons: { enable: true },
                          autoExpandScrollbar: true,
                          autoHideScrollbar: true,
                          theme: "dark-thin"
                      });


                     



                  }
              };
              return directive;


          }]);

      app.directive("theTop", ["config",
            function (config) {

                var directive = {
                    restrict: 'A',
                    link: function ($scope, element, attr) {

                        var tm = config.tm;

                        tm.set(element,
                            {
                                backgroundColor: mainColor,
                                position: 'fixed',
                                width: '100%',
                                height: topHeight,
                            }
                        );

                    }
                };
                return directive;


            }]);


      app.directive("theView", ["config",
             function (config) {

                 var directive = {
                     restrict: 'A',
                     link: function ($scope, element, attr) {

                         var tm = config.tm;

                         tm.set(element,
                             {
                                 backgroundColor: viewColor,
                                 marginLeft: assideWidth,
                                 marginTop: topHeight,
                                 position: 'fixed',
                                 width: 'calc(100% - '+ assideWidth +')',
                                 height: 'calc(100% - '+ topHeight +')'
                             }
                         );

                        

                     }
                 };
                 return directive;


             }]);


      app.directive("theFooter", ["config",
               function (config) {

                   var directive = {
                       restrict: 'A',
                       link: function ($scope, element, attr) {

                           var tm = config.tm;

                           tm.set(element,
                               {
                                   backgroundColor: backColor,
                                   position: 'fixed',
                                   width: assideWidth,
                                   height: footerHeight,
                                   bottom: '0px'
                               }
                           );



                       }
                   };
                   return directive;


               }]);

      app.directive("theInnerView", ["config",
             function (config) {

                 var directive = {
                     restrict: 'A',
                     link: function ($scope, element, attr) {

                         var tm = config.tm;

                         tm.set(element,
                             {
                                 
                                 width: '100%',
                                 height: 'auto',
                                 maxHeight: '100%'

                             }
                         );

                         $(element).mCustomScrollbar({
                             scrollButtons: { enable: true },
                             autoExpandScrollbar: true,
                             autoHideScrollbar: true,
                             theme: "inset-2-dark",
                             callbacks: {
                                 onScroll: function () {
                                     if (this.mcs.top === 0) {
                                         tm.to('.toTop', 0.5, { opacity: 0, display: 'none' });
                                     } else {
                                         tm.to('.toTop', 0.5, { opacity: 1, display: 'inherit' });
                                     }
                                 }
                             }
                         });

                     }
                 };
                 return directive;


             }]);

      app.directive("totop", ["config",
         function (config) {
             var directive = {
                 template: '<i class="fa fa-5x fa-angle-up"></i>',
                 restrict: 'E',
                 link: function ($scope, element, attr) {

                     var tm = config.tm;

                     tm.set(element,
                             {
                                 display: 'none',
                                 opacity: 0,
                                 position: 'fixed',
                                 right: '20px',
                                 bottom: '20px',
                                 color: mainColor,

                             }
                         );

                     element.addClass('toTop');

                     element.find('i').click(function (e) {
                                    e.preventDefault();
                                    $('#theView').mCustomScrollbar('scrollTo', 'top');
                                });
                 }
             };

             

             return directive;


         }]);

      



    //app.directive('ccScrollToTop', ['$window',
    //    // Usage:
    //    // <span data-cc-scroll-to-top></span>
    //    // Creates:
    //    // <span data-cc-scroll-to-top="" class="totop">
    //    //      <a href="#"><i class="icon-chevron-up"></i></a>
    //    // </span>
    //    function ($window) {
    //        var directive = {
    //            link: link,
    //            template: '<a href="#"><i class="icon-chevron-up"></i></a>',
    //            restrict: 'A'
    //        };
    //        return directive;

    //        function link(scope, element, attrs) {
    //            var $win = $($window);
    //            element.addClass('totop');
    //            $win.scroll(toggleIcon);

    //            element.find('a').click(function (e) {
    //                e.preventDefault();
    //                // Learning Point: $anchorScroll works, but no animation
    //                //$anchorScroll();
    //                $('body').animate({ scrollTop: 0 }, 500);
    //            });

    //            function toggleIcon() {
    //                $win.scrollTop() > 50 ? element.slideDown(): element.slideUp();
    //            }
    //        }
    //    }
    //]);

    //app.directive('ccSpinner', ['$window', function ($window) {
    //    // Description:
    //    //  Creates a new Spinner and sets its options
    //    // Usage:
    //    //  <div data-cc-spinner="vm.spinnerOptions"></div>
    //    var directive = {
    //        link: link,
    //        restrict: 'A'
    //    };
    //    return directive;

    //    function link(scope, element, attrs) {
    //        scope.spinner = null;
    //        scope.$watch(attrs.ccSpinner, function (options) {
    //            if (scope.spinner) {
    //                scope.spinner.stop();
    //            }
    //            scope.spinner = new $window.Spinner(options);
    //            scope.spinner.spin(element[0]);
    //        }, true);
    //    }
    //}]);

})();