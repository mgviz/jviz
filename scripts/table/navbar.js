//jvizTable Navbar sort
jvizTable.prototype.NavbarSort = function()
{
	//Open the dialog window
	this.dialog.ShowHide();
};


//jvizTable Navbar events
function jvizTableNavbarEvents(_main)
{
	//Add event to the sort button
	$('#' + _main.navbar.btn.sort.id).on('click', function(){ _main.NavbarSort(); });
}
