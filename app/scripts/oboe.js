(function($, window, document, undefined){
    'use strict';
    var
    console,
    vars,
    oboe,
    router,
    mustache,
    bar,

    setVars = function(){
        console = window.console;
        vars = {};
        oboe = window.oboe;
        router = new window.Grapnel();
        mustache = window.Mustache;
        bar = window.bar;
        router.get('zusaar/:keyword?', function(req, e){
            console.debug('req:', req);
            e.preventDefault();
            bar.increment(10);
            var query = '',
            count = 0,
            $el = $('#stdout');
            $el.empty();
            if (defined(req.params.keyword)) {
                query = '?' + $.param(req.params);
            }
            var $html = $('<dl/>');
            $el.html($html);
            oboe('http://www.zusaar.com/api/event/' + query)
                .node('{title event_url catch}', function(args){
                    console.debug('args:', args);
                    ++count;
                    bar.increment(10);
                    var article = mustache.render(vars.templates.event, args);
                    $html.append(article);
                })
                .start(function(){
                    console.info('読み込み開始');
                })
                .done(function(){
                    bar.finish();
                    console.info('読み込み終了');
                    if (count === 0) {
                        $el.html('見つかりませんでした');
                    }
                })
                .fail(function(){
                    bar.reset();
                    console.error('読み込み失敗');
                    $el.html('読み込みに失敗しました');
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
        $('.js-templates').each(function(index, el){
            var $el = $(el),
            name = $el.data('type');
            if(!defined(vars.templates)){vars.templates = {};}
            vars.templates[name] = $.trim($el.html());
            console.debug('templates:', vars.templates);
        });
        bar.setColor('#9ef');
    },

    init = function(){
        setVars();
        $(document).ready(onDocumentLoaded);
    };
    init();
})(jQuery, window, document);
