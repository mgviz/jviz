//jvizTable rows per page
jvizTable.prototype.PageRows = function(n)
{
  //Check for convert to array
  if(!Array.isArray(n)) { n = [n]; }

  //Check the numbers
  for(var i = 0; i < n.length; i++)
  {
    //Check all numbers
    if(n[i] < 1) { return console.log('jvizTable: please provide a number of rows per page > 0'); }
  }

  //Save the array
  this.table.rows.select = n;

  //Save the first
  this.table.rows.num = n[0];
};

//jvizTable initialize pages
jvizTable.prototype.PageInit = function()
{
  //Cont the number of pages
  this.page.num = this.PageCount();

  //Set the page now
  this.page.now = 0;
};

//jvizTable count the number of pages
jvizTable.prototype.PageCount = function()
{
  //Counter var
  var i = 0;

  //Loop
  while(i*this.table.rows.num < this.data.orig.length)
  {
    //Increment the i
    i = i + 1;
  }

  //Return the index
  return i;
};

//jvizTable Next page
jvizTable.prototype.PageNext = function()
{
  //Add 1 to the page
  this.page.now = this.page.now + 1;

  //Open page
  this.PageOpen();
};

//jvizTable prev page
jvizTable.prototype.PagePrev = function()
{
  //Add -1 to the page
  this.page.now = this.page.now - 1;

  //Open page
  this.PageOpen();
};

//jvizTable get page
jvizTable.prototype.PageGet = function()
{
  //Get the page value
  this.page.now = parseInt($('#' + this.foot.page.input.id).val()) - 1;

  //Check for NaN
  if(isNaN(this.page.now)){ this.page.now = 0; }

  //Open the page
  this.PageOpen();
};

//jvizTable page open
jvizTable.prototype.PageOpen = function()
{
  //Check for negative page number
  if(this.page.now < 0){ this.page.now = 0; }

  //Check for inexistent page
  if(this.page.now >= this.page.num){ this.page.now = this.page.num - 1; }

  //Call the page
  this.Page();
};

//jvizTable Change page
jvizTable.prototype.Page = function()
{
  //Initialize the output div
  var div = '';

  //Calculate the max values
  var maxi = Math.min(this.data.orig.length, this.table.rows.num*(this.page.now + 1))

  //Rows counter
  var count = 0;

  //Read all the content
  for(var i = this.table.rows.num*this.page.now; i < maxi; i++)
  {
    //Create the new row
    div = div + '<tr id="' + this.table.rows.id + count + '" class="' + this.table.rows.class + '">';

    //Add the columns for this row
    div = div + this.ColumnBuildBody(i, count);

    //Close the row
    div = div + '</tr>';

    //Increment the counter
    count = count + 1;
  }

  //Append to the table cont
  $('#' + this.table.body.id).html(div);

  //Show the page in the foot
  this.FootShowPage();

  //Add the click rows event
  this.ClickRowsEvnt();
};
