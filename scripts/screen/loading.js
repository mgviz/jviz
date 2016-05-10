//jviz Screen loading
function jvizScreenLoading(opt)
{
	//Check the optons
	if(typeof opt === 'undefined'){ var opt = {}; }

	//Save the new object ID
	this.id = (typeof opt.id === 'undefined') ? jvizGetID() : opt.id;

	//Save the object class
	this.class = (typeof opt.class === 'undefined') ? 'jvizScreenLoading' : opt.class;

	//Active
	this.active = false;

	//Screen container
	this.screen = {};
	this.screen.id = this.id + '-screen'; //Screen ID
	this.screen.class = this.class + '-screen'; //Screen class

	//Animation
	this.animation = {};
	this.animation.id = this.id + '-animation'; //Animation ID
	this.animation.class = this.class + '-animation'; //Animation class

	//Return the element
	return this;
}

//jvizScreenLoading Build
jvizScreenLoading.prototype.Build = function(parent)
{
	//Initialize the loading div
	var div = '<div id="' + this.id + '" class="' + this.class + '" style="display:none;">';

	//Add the screen
	div = div + '<div id="' + this.screen.id + '" class="' + this.screen.class + '">';

	//Add the animation
	div = div + '<div id="' + this.animation.id + '" class="' + this.animation.class + '"></div>';

	//Close the screen
	div = div + '</div>';

	//Close the container
	div = div + '</div>';

	//Append the div
	$('#' + parent).append(div);
};

//jvizScreenLoading Set text
jvizScreenLoading.prototype.SetText = function(text)
{
	//Save the text

};

//jvizScreenLoading Open
jvizScreenLoading.prototype.Open = function()
{
	//Check for active
	if(this.active === true){ return; }

	//Show the screen
	$('#' + this.id).css('display', 'block');

	//Set active as true
	this.active = true;
};

//jvizScreenLoading Close
jvizScreenLoading.prototype.Close = function()
{
	//Check for active
	if(this.active === false){ return; }

	//Hide the screen
	$('#' + this.id).css('display', 'none');

	//Set active as false
	this.active = false;
};

//jvizScreenLoading Show alias
jvizScreenLoading.prototype.Show = function(){ this.Open(); };

//jvizScreenLoading Hide alias
jvizScreenLoading.prototype.Hide = function(){ this.Close(); };
