//CoverViewer Initialize
CoverViewer.prototype.Init = function()
{
	//Import karyotypes
	this.ImportDataKaryotypes();

	//Import regions
	this.ImportDataRegions();

	//Build the tool
	this.Build();
};
