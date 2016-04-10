//Import gulp plugins
var gulpSass = require('gulp-sass');

//Build scss files
module.exports = function(gulp, src, dest)
{
	//Check the source type
	if(Array.isArray(src) === false){ src = [ src ]; }

	//Get the scss files
	gulp.src(src)

	//Build the scss files
	.pipe(gulpSass().on('error', gulpSass.logError))

	//Save the scss files
	.pipe(gulp.dest(dest));
};
