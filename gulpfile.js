


var gulp = require('gulp');
var jsdoc = require("gulp-jsdoc");
var sort = require('gulp-sort');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var es6transpiler = require('gulp-es6-transpiler');
var uglify = require('gulp-uglify');
var fs = require("fs");


gulp.task('documentation', function () {

    gulp.src(["./js/*.js","./js/*/*.js"])
        .pipe(jsdoc('./documentation'))
    ;

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
