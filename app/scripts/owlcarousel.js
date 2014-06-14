(function($, window, document, undefined) {
    'use strict';
    var console,
        vars,
        mustache,

        setVars = function() {
            console = window.console;
            vars = {};
            mustache = window.Mustache;
        },

        defined = function(args) {
            return args !== undefined;
        },

        handleOwlSuccess = function(json){
            var html = mustache.render(vars.templates.image, json);
            $('#owl-carousel').html(html);
            $('#api-result').text(JSON.stringify(json, null, 2));
        },

        onDocumentLoaded = function() {
            $('.js-vars').each(function(index, el) {
                $.extend(vars, $(el).data());
            });

            $('.js-templates').each(function(index, el) {
                var $el = $(el),
                    name = $el.data('type');
                if (!defined(vars.templates)) {
                    vars.templates = {};
                }
                vars.templates[name] = $.trim($el.html());
                console.debug('templates:', vars.templates);
            });

            $('#owl-carousel').owlCarousel({
                jsonPath: '/api/v1/images/',
                jsonSuccess: handleOwlSuccess
            });
        },

        init = function() {
            setVars();
            $(document).ready(onDocumentLoaded);
        };
    init();
})(jQuery, window, document);