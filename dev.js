//Import libs
var stattic = require('stattic');

//Set the folder with the static files
stattic.set('static', './');

//Set the port
stattic.set('port', 5001);

//Run the server
stattic.run();
