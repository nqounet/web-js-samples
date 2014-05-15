(function($, window, document, undefined){
    'use strict';
    var
    console,
    Grapnel,
    router,
    resetHash = function(){
        window.location.hash = 'index';
    },
    setVars = function(){
        console = window.console;
        Grapnel = window.Grapnel;
        router = {
            hello: function(req){
                console.debug('req:', req);
                $.jGrowl('Hello World!');
                resetHash();
            },
            sticky: function(req){
                console.debug('req:', req);
                $.jGrowl('勝手には消えません', {sticky: true});
                resetHash();
            },
            header: function(req){
                console.debug('req:', req);
                $.jGrowl('ヘッダー付メッセージです。', { header: 'ここがヘッダーです' });
                resetHash();
            },
            life: function(req){
                console.debug('req:', req);
                $.jGrowl('少し長く表示します。', { life: 10000 });
                resetHash();
            }
        };
        Grapnel.listen(router);
    },
    init = function(){
        setVars();
        $(document).on('ready', function(){
            resetHash();
            $.jGrowl.defaults.log = function(e,m,o) {
                var log = "<div><strong>#" + $(e).attr('id') + "</strong> <em>" + (new Date()).getTime() + "</em>: " + m + " (" + o.theme + ")</div>";
                $('#stdout').append($.parseHTML(log));
            };
            $.jGrowl('Welbome to jGrowl world.');
            $('#send-text').on('keypress', function(e){
                var $el = $(e.currentTarget),
                key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                if(key == 13) {
                    e.preventDefault();
                    $.jGrowl($el.val());
                    $el.val('');
                }
            });
        });
    };
    init();
}(jQuery, window, document));
