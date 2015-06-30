(function() {
    'use strict';

    var app = angular.module('app');

    var topHeight = '50px';
    var assideWidth = '200px';
    var footerHeight = '50px';
    var twfHeight = '100px';

    var mainColor = '#3c8dbc';
    var textColorLight = '#efefef';
    var textColorDark = '#425566';
    var backColor = '#425566';
    var viewColor = '#efefef';



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
         app.directive("theShell", ["config",
              function (config) {

                  var directive = {
                      restrict: 'A',
                      link: function ($scope, element, attr) {

                          var tm = config.tm;

                          tm.set(element,
                              {
                                  color: textColorLight
                              }
                          );

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
                              color:textColorLight,
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



      app.directive("testAction", ["config",
          function (config) {

              var directive = {
                  restrict: 'A',
                  link: function ($scope, element, attr) {

                      var tm = config.tm;

                      tm.set(element,
                          {
                              color: textColorLight,
                              backgroundColor: textColorDark,
                              position: 'absolute',
                              width: '100px',
                              height: '100px'
                              
                          }
                      );

                      element.onmouseenter(function() {
                          tm.to(element, 2, { left: '+=20px' });
                      });
                      element.onmouseleave(function() {
                          tm.to(element, 2, { left: '-=20px' });
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
                                 
                                 color: textColorDark,
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


      app.directive("kzButton", ["config",
          function () {
              var directive = {
                  restrict: 'AE',

                  scope: { ds: '=' },

                  link: function ($scope, element, attr) {

                      

                      //element.dxDataGrid({
                      //    dataSource: $scope.ds,
                      //    paging: {
                      //        pageSize: 10
                      //    },
                      //    loadPanel: false,
                      //    searchPanel: {
                      //        visible: true,
                      //        width: 240,
                      //        placeholder: 'Search...'
                      //    },
                      //    pager: {
                      //        showPageSizeSelector: true,
                      //        allowedPageSizes: [5, 10, 20]
                      //    },
                      //    columns: ['CompanyName', 'City', 'State', 'Phone', 'Fax'],

                          //columns: [{
                          //    dataField: "CompanyName",
                          //    width: 130,
                          //    caption: "CompanyName"
                          //}, {
                          //    dataField: 'OrderDate',
                          //    alignment: 'right',
                          //    dataType: 'date'
                          //}, {
                          //    dataField: "SaleAmount",
                          //    alignment: 'right',
                          //    format: "currency"
                          //}, "Employee", {
                          //    caption: "City",
                          //    dataField: 'CustomerStoreCity'
                          //}, {
                          //    caption: "State",
                          //    dataField: 'CustomerStoreState'
                          //}
                          //]



                      //});

                      

                      element.dxButton({
                          text: attr.text,
                          type: attr.type,
                          onClick: function () {
                              alert('Button clicked');
                          }
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