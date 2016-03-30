//Import dependencies
var fs = require('fs');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

//Default tool
var tool = 'jviz';

//Check the arguments
if(process.argv.length > 3)
{
	//Save the tool
	tool = process.argv[3];
}

//Output dir
var output = './build/' + tool + '/';

//Files list
var paths =
{
	'scripts': ['scripts/' + tool + '/' + tool + '.js', 'scripts/' + tool + '/**/*'],
	'scss': ['scss/' + tool + '.scss', 'scss/font.scss'],
	'test': ['test/' + tool + '.html']
};

//Concat all script files
gulp.task('scripts', function(){

  //Set the source files
  gulp.src(paths.scripts)

  //Concat all files
  .pipe(concat(tool + '.js'))

  //Save in css/ folder
  .pipe(gulp.dest(output));

});

//Minimize the script output
gulp.task('scripts-min', function(){

  //Set the source file
  gulp.src(output + tool + '.js')

  //Minimize
  .pipe(uglify())

  //Save the minimized file
  .pipe(rename(tool + '.min.js'))

  //Save on the output folder
  .pipe(gulp.dest(output));

});

//Build scss
gulp.task('scss', function(){

	//Get all the scss files
  gulp.src(paths.scss)

	//Build the css files
  .pipe(sass().on('error', sass.logError))

	//Add the header
  //.pipe(header(banner, { pkg : pkg } ))

	//Save to the output dir
  .pipe(gulp.dest(output))

});

//Copy test files
gulp.task('test', function(){

  //Select the html file
  gulp.src(paths.test, {base: '../'})

	//Rename as index.html
	.pipe(rename('index.html'))

	//Save to the build folder
	.pipe(gulp.dest(output));

});

//Run the task when a file changes
gulp.task('watch', function(){

	//Watch the scripts
	gulp.watch(paths.scripts, ['scripts']);

	//Watch the images
  gulp.watch(paths.images, ['images']);

	//Watch the scss
	gulp.watch(paths.scss, ['scss']);

});

//Tools tasks
gulp.task('coverviewer');
gulp.task('genom');
gulp.task('table');

//Execute the tasks
gulp.task('build', ['scripts', 'scss', 'test']);

//Default task
gulp.task('default', ['build']);
