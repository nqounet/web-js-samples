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
    run = function(module, method){
        var func = modules[module][method];
        console.debug('func:', func);
        if (typeof func === 'function') {
            func();
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
        args = $this.data('run').split('#');
        run.apply(null, args);
    },
    runSrc = function(){
        $stdout.empty();
        $stderr.empty();
        try {
            eval($src.val());
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
    sample1 = function(){
        setSrc('#sample1');
    },
    sample2 = function(){
        setSrc('#sample2');
    },
    sample3 = function(){
        setSrc('#sample3');
    },
    setHandlers = function(){
        $runButtons.on('click', eventRunButton);
    },
    init = function(){
        setVars();
        setHandlers();
        modules.main = {
            sample1: sample1,
            sample2: sample2,
            sample3: sample3,
            runSrc: runSrc,
            clearSrc: clearSrc
        };
        window.p = printStdout;
    };
    $(init);
}(jQuery, this));
