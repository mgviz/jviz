//CoverViewer Open labels dialog
CoverViewer.prototype.LabelsOpen = function()
{
	//Check for create the labes window
	if(this.labels.created === false)
	{
		//Create the labels window
		this.LabelsCreate();

		//Set created as true
		this.labels.created = true;
	}

	//Show the labels dialog
	this.labels.ShowHide();
};

//CoverViewer labels create
CoverViewer.prototype.LabelsCreate = function()
{
	//Initialize the div
	var div = '';

	//Read all the names
	for(var i = 0; i < this.bams.label.length; i++)
	{
		//Create the name element
		div = div + '<div>';

		//Add the switch div
		div = div + '<div id="' + this.labels.switch.id + '_' + i + '" class="' + this.labels.switch.class + '">';

		//Add the switch input
		div = div + '<input type="checkbox" value="1" id="' + this.labels.switch.id + '_' + i + 'ch" name="" />';

		//Add the switch label
	  div = div + '<label for="' + this.labels.switch.id + '_' + i + 'ch"></label>';

		//Add the div for the background
		div = div + '<div></div>';

		//Close the switch
  	div = div + '</div>';

		//Show the bam name
		div = div + '<span style="color:' + this.bams.color[i] + '";>' + this.bams.label[i] + '</span>';

		//Close the name element
		div = div + '</div>';
	}

	//Show the names
	this.labels.Content(div);

	//Add the events
	for(var i = 0; i < this.bams.label.length; i++)
	{
		//Add the event
		CoverViewerLabelsEvent(this, i);

		//Change the status
		document.getElementById(this.labels.switch.id + '_' + i + 'ch').checked = true;
	}
};

//CoverViewer Labels Click event
CoverViewer.prototype.LabelsClick = function(i)
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
function CoverViewerLabelsEvent(_this, _i)
{
	//Add the on click event
	$('#' + _this.labels.checkbox.id + '_' + _i).on('click', function(){ _this.LabelsClick(_i); });
}
