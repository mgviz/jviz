//jvizTable foot rows change
jvizTable.prototype.FootRowsChange = function()
{
  //Get the number of rows
  this.rows.num = $('#' + this.footrows.select.id).val();

  //Initialize the pages
  this.PagesInit();

  //Show the page
  this.Page();
};

//jvizTable show page in foot
jvizTable.prototype.FootShowPage = function()
{
  //Calculate the real page
  var realp = this.page.now + 1;

  //Show page
  $('#' + this.foot.page.total.id).text('Page ' + realp + ' of ' + this.page.num);
};

//jvizTable show total items
jvizTable.prototype.FootShowTotal = function()
{
  //Show total items
  $('#' + this.foottext.total).text(this.foottext.totalt + this.data.procesed.length);
};

//jvizTable foot events
jvizTable.prototype.FootEvnt = function()
{
  //Call the function for the buttons
  jvizTableFootBtnEvnt(this);

  //Call the function for the select rows
  jvizTableFootRowsEvnt(this);
};

//jvizTable foot click event */
function jvizTableFootBtnEvnt(_main)
{
  //Create the event for the prev button
  $('#' + _main.footbtn.prev).on('click', function(e){ _main.PageRev(); });

  //Create the event for the next button
  $('#' + _main.footbtn.next).on('click', function(e){ _main.PageNext(); });
}

//jvizTable foot Rows select event
function jvizTableFootRowsEvnt(_main)
{
  //Create the event for change the select value
  $('#' + _main.footrows.select.id).on('change', function(e){ _main.FootRowsChange(); });
}
