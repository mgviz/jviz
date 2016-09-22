//Initialize the package
var pkg = {};

//Source js files
var src_js =
[
  //Main files
  './src/jviz.js', './src/**.js',

  //Colors scripts
  './src/colors/colors.js', './src/colors/**.js',

  //Others
  './src/components/**.js', './src/dom/**.js', './src/factory/**.js', './src/math/**.js', './src/utils/**.js'
];

//Source scss files
var src_scss = [ './scss/**.scss' ];

//Package name
pkg.name = 'jviz';

//Description
pkg.description = 'The jviz base module';

//Author
pkg.author = { id: 'jmjuanes', name: 'Josemi Juanes', email: 'josemijuanes@gmail.com' };

//Build directory
pkg.directory = './build';

//Repository
pkg.repository = 'https://github.com/jviz/jviz';

//Build tasks
pkg.build = [ 'build:js', 'build:scss', 'build:vendor:cv', 'build:vendor:handlebars', 'build:vendor:jquery', 'build:vendor:objectsort' ];

//Install tasks
pkg.install = [ 'install:vendor'];

//Tasks object
pkg.tasks =
{
  //Build js files
  'build:js': [ { name: 'src', args: src_js }, { name: 'concat', args: 'jviz.js' }, { name: 'dest', args: './' } ],

  //Build scss files
  'build:scss': [ { name: 'src', args: src_scss }, { name: 'sass' }, { name: 'dest', args: './' } ],

  //Build vendor cj.js
  'build:vendor:cv': [ { name: 'src', args: './bower_components/cvjs/dist/cv.min.js' }, { name: 'dest', args: './vendor'} ],
  
  //Build vendor jquery
  'build:vendor:jquery': [ { name: 'src', args: './bower_components/jquery/dist/jquery.min.js' }, { name: 'dest', args: './vendor'} ],

  //Build vendor object sort
  'build:vendor:objectsort': [ { name: 'src', args: './bower_components/objectsort/dist/objectsort.min.js' }, { name: 'dest', args: './vendor'} ],

  //Install vendor files
  'install:vendor': [ { name: 'exec', args: 'bower install' } ]
};

//Dependencies
pkg.dependencies = {};

//Exports
module.exports = pkg;
