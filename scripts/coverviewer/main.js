//Main content builder
CoverViewer.prototype.MainBuild = function()
{
	//Build the main content div
	var div = '<div id="' + this.main.id + '" class="' + this.main.class + '">';

	//Add the loading panel

	//Close the main div
	div = div + '</div>';

	//Return the new div
	return div;
};
