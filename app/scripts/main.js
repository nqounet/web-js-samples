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
    setSrc = function(text){
        $src.val(text);
    },
    sample1 = function(){
        setSrc("p('debug');\nlog.debug( 'this is a debug message' );\np('info');\nlog.info( 'this is an info message' );\np('warning');\nlog.warn( 'this is a warning message' );\np('error');\nlog.error( 'this is an error message' );\n");
    },
    sample2 = function(){
        setSrc("log.profile( 'generate test string' );\n\nvar testContent = '';\nfor ( var i = 0; i < 3000; i++ ) {\n  testContent += '-';\n}\n\nlog.profile( 'generate test string' );");
    },
    sample3 = function(){
        setSrc("// 全体ループ\nlog.profile('total');\n\n// ループ１\nlog.profile('loop1');\nfor (var i = 0; i < 1000000; i++) {}\nlog.profile('loop1');\n\n// ループ２\nlog.profile('loop2');\nfor (var i = 0; i < 1000000; i++) {}\nlog.profile('loop2');\n\nlog.profile('total');\n");
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
