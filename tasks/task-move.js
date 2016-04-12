//Move files
module.exports = function(gulp, src, dest)
{
	//Check the source type
	if(Array.isArray(src) === false){ src = [ src ]; }

	//Select the html file
	gulp.src(src).pipe(gulp.dest(dest));
};
