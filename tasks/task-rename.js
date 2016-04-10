//Import gulp plugins
var gulpRename = require('gulp-rename');

//Rename files
module.exports = function(gulp, src, dest, name)
{
	//Check the source type
	if(Array.isArray(src) === false){ src = [ src ]; }

	//Select the html file
	gulp.src(src)

	//Rename as index.html
	.pipe(gulpRename(name))

	//Save to the build folder
	.pipe(gulp.dest(dest));
};
