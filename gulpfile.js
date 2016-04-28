


var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc3');
var sort = require('gulp-sort');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var es6transpiler = require('gulp-es6-transpiler');
var uglify = require('gulp-uglify');
var fs = require("fs");
var jshint = require('gulp-jshint');







gulp.task('documentation', function (callback) {

    var documentation_config = {
        "tags": {
            "allowUnknownTags": true
        },
        "source": {
            "excludePattern": "(^|\\/|\\\\)_"
        },
        "opts": {
            "destination": "./documentation"
        },
        "plugins": [
            "plugins/markdown"
        ],
        "templates": {
            "cleverLinks": false,
            "monospaceLinks": false,
            "default": {
                "outputSourceFiles": true
            },
            "path": "ink-docstrap",
            "theme": "cerulean",
            "navType": "vertical",
            "linenums": true,
            "dateFormat": "MMMM Do YYYY, h:mm:ss a"
        }
    };


    gulp.src(["./js/*.js","./js/*/*.js"]/*, {read: false}*/)
        .pipe(sort())
        .pipe(jsdoc(documentation_config,callback));


});







gulp.task('build', function () {


    gulp.src(['./js/*.js','./js/*/*.js'])

        .pipe(sort())
        .pipe(concat('towns-shared.js'))
        .pipe(es6transpiler({
            "disallowUnknownReferences": false,
            "disallowDuplicated": false
        }))
        .pipe(gulp.dest('./build'))

        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./build'))
    ;

});







gulp.task('develop', function() {

    gulp.start("build");
    gulp.watch(['./js/*.js','./js/*/*.js'], ['build']);


});






gulp.task("test", function() {
    gulp.src(['./js/*.js','./js/*/*.js'])
        .pipe(jshint({esversion:6,laxcomma:true}))
        .pipe(jshint.reporter("default"));

    //todo my tests

});