//jvizToolPanel main class
function jvizToolPanel(obj)
{
	//Check the panel ID
	obj.id = (typeof obj.id !== 'undefined')? obj.id : '';

	//Check the panel class
	obj.class = (typeof obj.class !== 'undefined')? obj.class : 'jviz-panel';

	//Params
	this.id = obj.id; //Panel ID
	this.class = obj.class; //Panel class
}

//jvizToolPanel Build
jvizToolPanel.prototype.Build = function(parent)
{
	//Initialize the div
	var div = '<div id="' + this.id + '" class="' + this.class + '"></div>';

	//Add the panel
	$('#' + parent).append(div);
};
