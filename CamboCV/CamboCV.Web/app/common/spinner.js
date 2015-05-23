(function () {
    'use strict';

    // Must configure the common service and set its 
    
    angular.module('common')
        .factory('spinner', ['common', 'config', spinner]);

    function spinner(common, config) {
        var service;
        var preloader = new GSPreloader({
            radius: 42,
            dotSize: 15,
            dotCount: 10,
            colors: ["#61AC27", "#555", "purple", "#FF6600"], //have as many or as few colors as you want.
            boxOpacity: 0.2,
            boxBorder: "1px solid #AAA",
            animationOffset: 1.8, //jump 1.8 seconds into the animation for a more active part of the spinning initially (just looks a bit better in my opinion)
        });
        
        service = {
            spinnerRouteChangeHide: spinnerRouteChangeHide,
            spinnerRouteChangeShow: spinnerRouteChangeShow,
            spinnerTranslateHide: spinnerTranslateHide,
            spinnerTranslateShow: spinnerTranslateShow,
            spinnerGetDataHide: spinnerGetDataHide,
            spinnerGetDataShow: spinnerGetDataShow,
            ActivateSpinner: ActivateSpinner,
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


        function ActivateSpinner(option)
        {
            preloader.active(option);
        }

       

        //this is the whole preloader class/function
        function GSPreloader(options) {
            options = options || {};
            var parent = options.parent || document.body,
                element = this.element = document.createElement("div"),
                radius = options.radius || 42,
                dotSize = options.dotSize || 15,
                animationOffset = options.animationOffset || 1.8, //jumps to a more active part of the animation initially (just looks cooler especially when the preloader isn't displayed for very long)
                createDot = function (rotation) {
                    var dot = document.createElement("div");
                    element.appendChild(dot);
                    TweenMax.set(dot, { width: dotSize, height: dotSize, transformOrigin: (-radius + "px 0px"), x: radius, backgroundColor: colors[colors.length - 1], borderRadius: "50%", force3D: true, position: "absolute", rotation: rotation });
                    dot.className = options.dotClass || "preloader-dot";
                    return dot;
                },
                i = options.dotCount || 10,
                rotationIncrement = 360 / i,
                colors = options.colors || ["#61AC27", "black"],
                animation = new TimelineMax({ paused: true }),
                dots = [],
                isActive = false,
                box = document.createElement("div"),
                tl, dot, closingAnimation, j;
            colors.push(colors.shift());

            //setup background box
            TweenMax.set(box, { width: radius * 2 + 70, height: radius * 2 + 70, borderRadius: "14px", backgroundColor: options.boxColor || "white", border: options.boxBorder || "1px solid #AAA", position: "absolute", xPercent: -50, yPercent: -50, opacity: ((options.boxOpacity != null) ? options.boxOpacity : 0.3) });
            box.className = options.boxClass || "preloader-box";
            element.appendChild(box);

            parent.appendChild(element);
            TweenMax.set(element, { position: "fixed", top: "45%", left: "50%", perspective: 600, overflow: "visible", zIndex: 2000 });
            animation.from(box, 0.1, { opacity: 0, scale: 0.1, ease: Power1.easeOut }, animationOffset);
            while (--i > -1) {
                dot = createDot(i * rotationIncrement);
                dots.unshift(dot);
                animation.from(dot, 0.1, { scale: 0.01, opacity: 0, ease: Power1.easeOut }, animationOffset);
                //tuck the repeating parts of the animation into a nested TimelineMax (the intro shouldn't be repeated)
                tl = new TimelineMax({ repeat: -1, repeatDelay: 0.25 });
                for (j = 0; j < colors.length; j++) {
                    tl.to(dot, 2.5, { rotation: "-=360", ease: Power2.easeInOut }, j * 2.9)
                      .to(dot, 1.2, { skewX: "+=360", backgroundColor: colors[j], ease: Power2.easeInOut }, 1.6 + 2.9 * j);
                }
                //stagger its placement into the master timeline
                animation.add(tl, i * 0.07);
            }
            if (TweenMax.render) {
                TweenMax.render(); //trigger the from() tweens' lazy-rendering (otherwise it'd take one tick to render everything in the beginning state, thus things may flash on the screen for a moment initially). There are other ways around this, but TweenMax.render() is probably the simplest in this case.
            }

            //call preloader.active(true) to open the preloader, preloader.active(false) to close it, or preloader.active() to get the current state.
            this.active = function (show) {
                if (!arguments.length) {
                    return isActive;
                }
                if (isActive != show) {
                    isActive = show;
                    if (closingAnimation) {
                        closingAnimation.kill(); //in case the preloader is made active/inactive/active/inactive really fast and there's still a closing animation running, kill it.
                    }
                    if (isActive) {
                        element.style.visibility = "visible";
                        TweenMax.set([element, box], { rotation: 0 });
                        animation.play(animationOffset);
                    } else {
                        closingAnimation = new TimelineMax();
                        if (animation.time() < animationOffset + 0.3) {
                            animation.pause();
                            closingAnimation.to(element, 1, { rotation: -360, ease: Power1.easeInOut }).to(box, 1, { rotation: 360, ease: Power1.easeInOut }, 0);
                        }
                        closingAnimation.staggerTo(dots, 0.3, { scale: 0.01, opacity: 0, ease: Power1.easeIn, overwrite: false }, 0.05, 0).to(box, 0.4, { opacity: 0, scale: 0.2, ease: Power2.easeIn, overwrite: false }, 0).call(function () { animation.pause(); closingAnimation = null; }).set(element, { visibility: "hidden" });
                    }
                }
                return this;
            };
        }



    }
})();