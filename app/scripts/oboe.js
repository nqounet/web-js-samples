(function($, window, document, undefined){
    'use strict';
    var
    console,
    vars,
    router,

    setVars = function(){
        console = window.console;
        vars = {};
        router = new window.Grapnel();
        router.get('zusaar/:keyword?', function(req, e){
            console.debug('req:', req);
            e.preventDefault();
            var query = '',
            count = 0,
            $el = $('#stdout');
            $el.empty();
            if (defined(req.params.keyword)) {
                query = '?' + $.param(req.params);
            }
            oboe('http://www.zusaar.com/api/event/' + query)
                .node('{title catch}', function(args){
                    $el.prepend([++count, args.title, args.catch].join(':').concat('\n'));
                })
                .start(function(){
                    console.info('読み込み開始');
                })
                .done(function(){
                    console.info('読み込み終了');
                    if (count === 0) {
                        $el.html('見つかりませんでした');
                    }
                })
                .fail(function(){
                    console.error('読み込み失敗');
                });
        });
    },

    defined = function(args){
        return args !== undefined;
    },

    onDocumentLoaded = function(){
        $('.js-vars').each(function(index, el){
            $.extend(vars, $(el).data());
        });
    },

    init = function(){
        setVars();
        $(document).ready(onDocumentLoaded);
    };
    init();
})(jQuery, window, document);
