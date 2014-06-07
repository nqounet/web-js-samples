(function($, window, document, undefined){
    'use strict';
    var
    router,
    nanobar,
    count,
    timer,
    resetCount = function(){
        count = 0;
        if(timer !== undefined) {
            clearInterval(timer);
            timer = undefined;
        }
    },
    incrementCount = function(add){
        count += add;
        if (count > 99) { count = 99; }
        return count;
    },
    reset = function(){
        nanobar.go(0);
        resetCount();
    },
    setColor = function(args){
        finish();
        nanobar = new window.Nanobar({bg: args});
    },
    increment = function(args){
        nanobar.go(incrementCount(args));
        if(timer === undefined) {
            timer = setInterval(function(){
                increment(1);
            }, 100);
        }
    },
    finish = function(){
        nanobar.go(100);
        resetCount();
    },
    setVars = function(){
        count = 1;
        nanobar = new window.Nanobar();
        router = new window.Grapnel();
        router.get('plus/:num', function(req){
            var num = req.params.num - 0;
            increment(num);
            router.anchor.clear();
        });
        router.get('finish', finish);
    },
    init = function(){
        setVars();
        $(document).ready(function(){
            increment(20);
        });
        $(window).on('load', function(){
            finish();
        });
        window.bar = {
            setColor: setColor,
            increment: increment,
            reset: reset,
            finish: finish
        };
    };
    init();
}(jQuery, window, document));
