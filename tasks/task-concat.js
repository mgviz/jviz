//Import gulp plugins
var gulpConcat = require('gulp-concat');

//Concat files
module.exports = function(gulp, src, dest, name)
{
	//Check the source type
	if(Array.isArray(src) === false){ src = [ src ]; }

	//Get the scripts files
	gulp.src(src)

	//Concat all script files
	.pipe(gulpConcat(name))

	//Save in css/ folder
	.pipe(gulp.dest(dest));
};
