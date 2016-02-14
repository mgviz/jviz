//CoverViewer Preview Stroke
CoverViewer.prototype.BamsParser = function()
{
  //Save the number of bams
  this.bams.num = this.data.cover.data[0].cover.length;

  //Restart the colors array
  this.bams.color = [];

  //Save the color
  for(var i = 0; i < this.bams.num; i++)
  {
    //Default color
    var c = this.ColorByIndex(i);

    //Check for custom color
    if(this.data.cover.color)
    {
      //Call to the custom function
      c = this.data.cover.color(i);
    }

    //Push the color
    this.bams.color.push(c);
  }

  //Initialize the bams labels
  this.BamsLabelsInit();

  //Initialize the bams Active
  this.BamsActiveInit();
};

//CoverViewer Bams labels Init
CoverViewer.prototype.BamsLabelsInit = function()
{
  //Check the label
  if(this.bams.label.length < this.bams.num)
	{
    //Read all the bam files
  	for(var i = this.bams.label.length + 1; i <= this.bams.num; i++)
  	{
  		//Add the BAM i
  		this.bams.label.push('BAM' + i);
  	}
	}
};

//CoverViewer Bams active creator
CoverViewer.prototype.BamsActiveInit = function()
{
  //Check the length
  if(this.bams.active.length > 0)
  {
    //Exit
    return;
  }

  //Initialize the array
  for(var i = 0; i < this.bams.num; i++)
  {
    //Insert true
    this.bams.active.push(true);
  }
};
