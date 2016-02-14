//Track main class
function jvizTrack(obj)
{
	//Check the track ID
	obj.id = (typeof obj.id !== 'undefined')? obj.id : '';

	//Check the track class
	obj.class = (typeof obj.class !== 'undefined')? obj.class : 'jviz-track';

	//Check the number of layers
	obj.layers = (typeof obj.layers !== 'undefined')? obj.layers : 0;

	//Track
	this.id = obj.id; //Track ID
	this.class = obj.class; //Track class
	this.width = 0; //Track width
	this.height = 0; //Track height

	//Track head
	this.head = {};
	this.head.show = true; //Head show
	this.head.id = this.id + '-head'; //Head ID
	this.head.class = this.class + '-head'; //Head class
	this.head.height = 30; //Track head height

	//Track head title
	this.head.title = {};
	this.head.title.show = true; //Show head title
	this.head.title.id = this.head.id + '-title'; //Track title ID
	this.head.title.class = this.head.class + '-title'; //Track title ID

	//Track head subtitle
	this.head.title.subtitle = {};
	this.head.title.subtitle.class = this.head.title.class + '-subtitle'; //Subtitle class

	//Track head arrow
	this.head.arrow = {};
	this.head.arrow.show = true; //Show track arrow
	this.head.arrow.id = this.head.id + '-arrow'; //Track arrow ID
	this.head.arrow.class = this.head.class + '-arrow'; //Track arrow Class

	//Track canvas
	this.canvas = {};
	this.canvas.show = true; //Show the canvas
	this.canvas.id = this.id + '-canvas'; //Canvas ID
	this.canvas.class = this.class + '-canvas'; //Canvas class
	this.canvas.num = obj.layers; //Number of canvas elements

	//Track draw
	this.draw = {};
  this.draw.layer = []; //Draw layers
  this.draw.width = 0; //Draw width
  this.draw.height = 0; //Draw height

	//Return the new track
	return this;
}
