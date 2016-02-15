//Main content builder
CoverViewer.prototype.MainBuild = function()
{
	//Initialize the div
	var div = '';

	//Build the main content div 1
	div = div + '<div id="' + this.main.id1 + '" class="' + this.main.class + '"></div>';

	//Build the main content div 2
	div = div + '<div id="' + this.main.id2 + '" class="' + this.main.class + '"></div>';

	//Return the new div
	return div;
};
