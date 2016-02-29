//jvizNavbar main class
function jvizNavbar(obj)
{
	//Check the track ID
	obj.id = (typeof obj.id !== 'undefined')? obj.id : '';

	//Check the track class
	obj.class = (typeof obj.class !== 'undefined')? obj.class : 'jviz-track';

	//Main navbar
	this.id = obj.id; //Navbar ID
	this.class = obj.class; //Navbar class

	//Return the navbar
	return this;
}
