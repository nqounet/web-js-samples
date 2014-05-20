(function($, window, document, undefined){
    'use strict';
    var
    router,
    nanobar,
    count,
    timer,
    resetCount = function(){
        count = 0;
    },
    incrementCount = function(add){
        count += add;
        if (count > 99) { count = 99; }
        return count;
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
            nanobar.go(incrementCount(num));
            router.anchor.clear();
        });
        router.get('finish', finish);
        timer = setInterval(function(){
            nanobar.go(incrementCount(1));
        }, 50);
    },
    init = function(){
        setVars();
        $(document).on('ready', function(){
            nanobar.go(incrementCount(10));
        });
        $(window).on('load', function(){
            finish();
            clearInterval(timer);
        });
    };
    init();
}(jQuery, window, document));
