//jvizToolTip class
function jvizToolTip(opt)
{
	//Save the ID
	this.id = (typeof opt.id === 'undefined') ? 'tooltip' : opt.id;

	//Save the class
	this.class = (typeof opt.class === 'undefined') ? 'jvizToolTip' : opt.class;

	//Save the width
	this.width = (typeof opt.width === 'undefined') ? 200 : opt.width;

	//Other configurations
	this.height = 0; //height
	this.posx = 0; //Position x
	this.posy = 0; //Position y
	this.margin = { top: 6, bottom: 0, left: 0, right: 0 }; //Margin

	//Triangle
	this.triangle = {};
	this.triangle.id = this.id + '-triangle'; //Triangle ID
	this.triangle.class = this.class + '-triangle'; //Triangle class
	this.triangle.width = 0; //Triangle width
	this.triangle.height = 6; //Triangle height
	this.triangle.posx = 0; //Triangle position x
	this.triangle.posy = 0; //Triangle position y

	//Content
	this.content = {};
	this.content.id = this.id + '-content'; //Content ID
	this.content.class = this.class + '-content'; //Content class

	//Return
	return this;
}

//jvizToolTip Build
jvizToolTip.prototype.Build = function(parent)
{
	//Create the new div
	var div = '<div id="' + this.id + '" class="' + this.class + '">';

	//Add the triangle div
	div = div + '<div id="' + this.triangle.id + '" class="' + this.triangle.class + '"></div>';

	//Add the content div
	div = div + '<div id="' + this.content.id + '" class="' + this.content.class + '"></div>';

	//Close the div
	div = div + '</div>';

	//Save
	$('#' + parent).append(div);

	//Set display as none
	$('#' + this.id).css('display', 'none');
};

//jvizToolTip Set content
jvizToolTip.prototype.SetContent = function(content)
{
	//Set the content
	$('#' + this.content.id).html(content);
};

//jvizToolTip set position
jvizToolTip.prototype.SetPosition = function(posx, posy)
{
	//Save the position x
	this.posx = posx;

	//Save the position y
	this.posy = posy;
};

//jvizToolTip set width
jvizToolTip.prototype.SetWidth = function(w)
{
	//Save the width
	this.width = parseInt(w);
};

//jvizToolTip Show
jvizToolTip.prototype.Show = function()
{
	//Set the position x
	$('#' + this.id).css('top', this.posy + this.margin.top);

	//Set the position y
	$('#' + this.id).css('left', this.posx - this.width/2);

	//Set the width
	$('#' + this.id).width(this.width);

	//Update the triangle position left
	$('#' + this.triangle.id).css('left', this.width/2 - this.triangle.width/2);

	//Show the tooltip
	$('#' + this.id).css('display', 'block');
};

//jvizToolTip Hide
jvizToolTip.prototype.Hide = function()
{
	//Hide the tooltip
	$('#' + this.id).css('display', 'none');
};
