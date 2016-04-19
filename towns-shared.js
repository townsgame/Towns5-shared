

var fs = require("fs");


function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}


var files = getFiles(__dirname+'/js');

files = files.sort(function(a,b){
    if ( a < b )
        return -1;
    if ( a > b )
        return 1;
    return 0;
});



global.Towns = {};


files.forEach(function(file){

    require(file);


});


module.exports = global.Towns;