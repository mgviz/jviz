//jvizTable Initialize the table
jvizTable.prototype.Create = function()
{
  //Check the data
  if(this.data.orig === null) { return console.error('jvizTable: add content before create the table.'); }

  //Check the columns
  if(this.table.cols.items.length < 1) { return console.error('jvizTable: first add the columns before create the table.'); }

  //Save the data to the procesed
  this.data.procesed = this.data.orig.slice(0);

  //Build the div
  this.Build();

  //Initialize the pages
  this.PageInit();

  //Show the page
  this.Page();

  //Add the foot events
  jvizTableFootEvents(this);

  //Add the navbar events
  jvizTableNavbarEvents(this);

  //Show the total of rows
  //this.FootShowTotal();
};
