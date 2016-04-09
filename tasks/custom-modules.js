//Import dependencies
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

//Build module
module.exports = function(gulp, name){

	//Destination folder
	var dest = './build/' + name + '/';

	//Input folder
	var src = './' + name + '/';

	//Get the scss files
	gulp.src([ src + 'scss/*.scss' ])

	//Build the scss files
	.pipe(sass().on('error', sass.logError))

	//Save the scss files
	.pipe(gulp.dest(dest));

	//Get the scripts files
	gulp.src([ src + '/scripts/' + name + '.js', src + '/scripts/**/*.js' ])

	//Concat all script files
	.pipe(concat(name + '.js'))

	//Save in css/ folder
	.pipe(gulp.dest(dest));


	//Select the html file
	gulp.src([ src + name + '.html' ])

	//Rename as index.html
	.pipe(rename('index.html'))

	//Save to the build folder
	.pipe(gulp.dest(dest));
	
};
