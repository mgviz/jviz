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
  //Show page now
  $('#' + this.foot.page.input.id).val(this.page.now + 1);

  //Show total pages
  $('#' + this.foot.page.total.id).html(this.page.num);
};

//jvizTable show total items
jvizTable.prototype.FootShowTotal = function()
{
  //Show total items
  $('#' + this.foottext.total).text(this.foottext.totalt + this.data.procesed.length);
};

//jvizTable foot click event
function jvizTableFootEvents(_main)
{
  //Create the event for the prev button
  $('#' + _main.foot.btn.prev.id).on('click', function(e){ _main.PagePrev(); });

  //Create the event for the next button
  $('#' + _main.foot.btn.next.id).on('click', function(e){ _main.PageNext(); });

  //Create the event for the go to page
  $('#' + _main.foot.page.input.id).keyup(function(e){ if(e.keyCode == 13){ _main.PageGet(); } });

  //Create the event for change the select value
  //$('#' + _main.footrows.select.id).on('change', function(e){ _main.FootRowsChange(); });
}
