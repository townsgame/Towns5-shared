var gulp = require('gulp');
var jsdoc = require("gulp-jsdoc");



gulp.task('documentation', function () {

    var template = {
        path            : "ink-docstrap",
        systemName      : "Something",
        footer          : "Something",
        copyright       : "Something",
        navType         : "vertical",
        theme           : "lumen",
        linenums        : true,
        collapseSymbols : false,
        inverseNav      : true
    };


    var options = {
        showPrivate: false,
        monospaceLinks: false,
        cleverLinks: false,
        outputSourceFiles: true
    };


    gulp.src(["./js/*.js","./js/*/*.js"])
        .pipe(jsdoc('./documentation', template, {}, options))
        //.pipe(jsdoc.parser(infos, name))
        //.pipe(gulp.dest('./somewhere'))
    ;

});






