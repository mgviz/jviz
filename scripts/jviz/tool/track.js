//Track main class
function jvizToolTrack(obj)
{
	//Check the track ID
	obj.id = (typeof obj.id !== 'undefined')? obj.id : '';

	//Check the track class
	obj.class = (typeof obj.class !== 'undefined')? obj.class : 'jvizToolTrack';

	//Track
	this.id = obj.id; //Track ID
	this.class = obj.class; //Track class
	this.width = 0; //Track width
	this.height = 0; //Track height
	this.active = true; //Track active

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

	//Track head loading
	this.head.loading = {};
	this.head.loading.show = true; //Show track head loading
	this.head.loading.id = this.head.id + '-loading'; //Track loading ID
	this.head.loading.class = this.head.class + '-loading'; //Track loading Class
	this.head.loading.active = false; //Track loading active

	//Track body
	this.body = {};
	this.body.id = this.id + '-body'; //Body ID
	this.body.class = this.class + '-body'; //Body class
	this.body.content = ''; //Body default content

	//Return the new track
	return this;
}

//jvizToolTrack Build
jvizToolTrack.prototype.Build = function(parent)
{
	//Create the new div
	var div = '';

	//Create the main track div
	div = div + '<div id="' + this.id + '" class="' + this.class + '">';

	//Create the body
	div = div + '<div id="' + this.body.id + '" class="' + this.body.app + '">' + this.body.content + '</div>';

	//Add the head
	div = div + this.BuildHead();

	//Close the track div
	div = div + '</div>';

	//Create the track
	$('#' + parent).append(div);

	//Set the navbar event
	//jvizToolTrackEventsHead(this);

	//Call the custom events
	this.Events();
};

//jvizToolTrack build head
jvizToolTrack.prototype.BuildHead = function()
{
	//Check for show the head
	if(this.head.show === false){ return ''; }

	//Initialize the head div
	var div = '';

	//Create the track head
	div = div + '<div id="' + this.head.id + '" class="' + this.head.class + '">';

	//Check for show the track arrow
	if(this.head.arrow.show === true)
	{
		//Add the arrow
		div = div + '<div id="' + this.head.arrow.id + '" class="' + this.head.arrow.class + '"></div>';
	}

	//Check for show the title
	if(this.head.title.show === true)
	{
		//Add the track title
		div = div + '<span id="' + this.head.title.id + '" class="' + this.head.title.class + '"></span>';
	}

	//Check for show the loading
	if(this.head.loading.show === true)
	{
		//Add the loading
		div = div + '<div id="' + this.head.loading.id + '" class="' + this.head.loading.class + '"></div>';
	}

	//Close the track head
	div = div + '</div>';

	//Return the head
	return div;
};

//jvizToolTrack resize
jvizToolTrack.prototype.Resize = function()
{
	//Save the width
	this.width = $('#' + this.id).width();

	//Save the height
	//this.height = $('#' + this.id).height();
};

//jvizToolTrack set track title
jvizToolTrack.prototype.SetTitle = function(title, subtitle)
{
	//Add the title
	var text = title;

	//Check for the subtitle
	if(typeof subtitle !== 'undefined')
	{
		text = text + ' <span class="' + this.head.title.subtitle.class + '">' + subtitle + '</span>';
	}

	//Show the title
	$('#' + this.head.title.id).html(text);
};

//jvizToolTrack set body content
jvizToolTrack.prototype.Content = function(div)
{
	//Show the content
	$('#' + this.body.id).html(div);
};

//jvizToolTrack Show hide body
jvizToolTrack.prototype.ShowHide = function()
{
	//Show or hide
	(this.active === true) ? this.Hide() : this.Show();
};

//jvizToolTrack show body
jvizToolTrack.prototype.Show = function()
{
	//Set visible
	$('#' + this.body.id).css('display', 'block');

	//Set active as true
	this.active = true;
};

//jvizToolTrack hide body
jvizToolTrack.prototype.Hide = function()
{
	//Set hidden
	$('#' + this.body.id).css('display', 'none');

	//Set active as false
	this.active = false;
};

//jvizToolTrack Show loading
jvizToolTrack.prototype.LoadingShow = function()
{
	//Set as active
	this.head.loading.active = true;

	//Show
	$('#' + this.head.loading.id).css('display', 'inline-block');
};

//jvizToolTrack Hide Loading
jvizToolTrack.prototype.LoadingHide = function()
{
	//Set as inactive
	this.head.loading.active = false;

	//Hide
	$('#' + this.head.loading.id).css('display', 'none');
};

//jvizToolTrack Loading status
jvizToolTrack.prototype.LoadingStatus = function()
{
	//Return the loading status
	return this.head.loading.status;
};

//jvizToolTrack Events caller
jvizToolTrack.prototype.Events = function(){ };

//jvizToolTrack Events
function jvizToolTrackEventsHead(_this)
{
	//Click on arrow button
	$('#' + _this.head.arrow.id).on('click', function(){ _this.ShowHide(); });

	//Check on title box
	$('#' + _this.head.title.id).on('click', function(){ _this.ShowHide(); });
}
