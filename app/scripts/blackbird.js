(function($, window){
    'use strict';
    var
    console,
    modules,
    $src,
    $stdout,
    $stderr,
    $runButtons,
    setVars = function(){
        console = window.console;
        modules = {};
        modules.log = window.log || console.error('blackbird.js required.');
        $src = $('#src');
        $stdout = $('#stdout');
        $stderr = $('#stderr');
        $runButtons = $('.jq-run');
    },
    printStdout = function(text){
        $stdout.append(text + '<br/>');
    },
    run = function(module, method, args){
        var func = modules[module][method];
        console.debug('func:', func);
        if (typeof func === 'function') {
            func(args);
        }
        else {
            console.error('function not defined.');
            console.debug('modules:', modules);
            console.debug('arguments:', arguments);
        }
    },
    eventRunButton = function(e){
        e.preventDefault();
        var $this = $(e.currentTarget),
        args = $this.data('run').split(':');
        console.debug('args:', args);
        run.apply(null, args);
    },
    runSrc = function(){
        $stdout.empty();
        $stderr.empty();
        try {
            (new Function($src.val())());
        }
        catch (e) {
            $stderr.text(e);
        }
    },
    clearSrc = function(){
        $stdout.empty();
        $stderr.empty();
        $src.val('');
    },
    setSrc = function(selector){
        $src.val($(selector).text());
    },
    setHandlers = function(){
        $runButtons.on('click', eventRunButton);
    },
    init = function(){
        setVars();
        setHandlers();
        modules.main = {
            setSrc: setSrc,
            runSrc: runSrc,
            clearSrc: clearSrc
        };
        window.p = printStdout;
    };
    $(init);
}(jQuery, this));
