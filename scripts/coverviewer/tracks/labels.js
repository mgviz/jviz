//CoverViewer Labels track
CoverViewer.prototype.LabelsTrack = function(opt)
{

};

//CoverViewer Labels Track builder
CoverViewer.prototype.LabelsTrackBuilder = function()
{
	//Initialize the track div
	var div = '';

	//Create the names bar div
	div = div + '<div id="' + this.labelsbar.id + '" class="' + this.labelsbar.class + '">';

	//Add the names bar title
	div = div + '<b>' + this.labels.title + '</b>';

	//Close the names bar div
	div = div + '</div>';

	//Create the names div
	div = div + '<div id="' + this.labels.id + '" class="' + this.labels.class + '"></div>';

	//Return the track
	return div;
};

//CoverViewer Labels draw
CoverViewer.prototype.LabelsTrackDraw = function()
{
	//Check if is active
	if(this.labels.active === true){ return; }

	//Initialize the div
	var div = '';

	//Read all the values
	for(var i = 0; i < this.bams.label.length; i++)
	{
		//Create the name element
		div = div + '<div class="' + this.labels.el.class + '">';

		//Add the checkbox
		div = div + '<div class="' + this.labels.checkbox.class + '" id="' + this.labels.checkbox.id + '_' + i + '">';
		div = div + '<input type="checkbox" value="1" id="' + this.labels.checkbox.id + '_' + i + 'ch" name="" />';
	  div = div + '<label for="' + this.labels.checkbox.id + '_' + i + 'ch2"></label>';
		div = div + '<div></div>';
  	div = div + '</div>';

		//Show the bam name
		div = div + '<span style="color:' + this.bams.color[i] + '";>' + this.bams.label[i] + '</span>';

		//Close the name element
		div = div + '</div>';
	}

	//Show the names
	$('#' + this.labels.id).html(div);

	//Add the events
	for(var i = 0; i < this.bams.label.length; i++)
	{
		//Add the event
		CoverViewerLabelsEvent(this, i);

		//Change the status
		document.getElementById(this.labels.checkbox.id + '_' + i + 'ch').checked = true;
	}

	//Set active as true
	this.labels.active = true;
};

//CoverViewer Labels Click event
CoverViewer.prototype.LabelsTrackClick = function(i)
{
	//Get the element
	var el = document.getElementById(this.labels.checkbox.id + '_' + i + 'ch');

	//Change the active
	this.bams.active[i] = (this.bams.active[i] === true)? false : true;

	//Change the status
	el.checked = this.bams.active[i];

  //Draw the actual region
  this.Move();
};

//CoverViewer labels event
function CoverViewerLabelsEvent(_main, _i)
{
	//Add the on click event
	$('#' + _main.labels.checkbox.id + '_' + _i).on('click', function(){ _main.LabelsTrackClick(_i); });
}
