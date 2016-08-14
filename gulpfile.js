

//todo purge unused modules and remove from package
var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc3');
var sort = require('gulp-sort');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var es6transpiler = require('gulp-es6-transpiler');
var uglify = require('gulp-uglify');
var fs = require("fs");
var globby = require('globby');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');



var includes_typescript = globby.sync('./ts/**/*.ts');
//console.log(includes_typescript);


var deleteFolderRecursive = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};



gulp.task('build', function() {

    runSequence('documentation','compile', 'test',
        function(){

            console.log('Build finished!');

        });

});





gulp.task('documentation', function (callback) {

    console.log('todo documentation for TypeScript');
    callback();
    /*var documentation_config = {
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


    deleteFolderRecursive('./documentation');


    gulp.src(includes)
        .pipe(sort())
        .pipe(jsdoc(documentation_config,callback));

        */


});







gulp.task('compile', function () {


    return gulp.src(includes_typescript)
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: true,
            out: 'towns-shared.js'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build'))

        //.pipe(uglify())
        //.pipe(rename({suffix: '.min'}))
        //.pipe(gulp.dest('./build'))
    ;


});






/*todo is this useful task?
gulp.task('develop', function() {

    gulp.start("build");
    //gulp.watch(includes, ['build']);
    gulp.watch(includes_typescript, ['build']);


});
/**/





/*todo is this useful task for TypeScript?
gulp.task("test-code", function() {

gulp.src(includes)
        .pipe(jshint({esversion:6,laxcomma:true}))
        .pipe(jshint.reporter("default"));


});
/**/






gulp.task("test", function() {


    global.T = require('./build/towns-shared.js');


    return gulp.src(['./test/*.js','./test/*/*.js'])
        .pipe(jasmine({
            includeStackTrace: true
        }));



});







