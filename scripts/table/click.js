//jvizTable Click Rows Event
jvizTable.prototype.ClickRowsEvnt = function()
{
  //For each row
  for(var i = 0; i < this.table.rows.num; i++)
  {
    //For each col
    for(var j = 0; j < this.table.cols.num; j++)
    {
      //Call the event
      jvizTableClickRowsEvent(this, i, j);
    }
  }
};

//jvizTable Click Rows Action
jvizTable.prototype.ClickRowsAction = function(r, c)
{
  //Do the callback
  this.CallbackDo(r, c);
};

//jvizTable Click Head Event
jvizTable.prototype.ClickHeadEvnt = function()
{
  //For each column
  for(var j = 0; j < this.table.cols.num; j++)
  {
    //Add the event to the column
    jvizTableClickHeadEvent(this, j);
  }
};

//jvizTable Click head action
jvizTable.prototype.ClickHeadAction = function(c)
{
  //Sort by column
  this.SortBy(c);
};


//jvizTable click row event
function jvizTableClickRowsEvent(_main, _r, _c)
{
  //Create the event
  $('#' + _main.table.cols.id + _r + '-' + _c).on('click', function(e){ _main.ClickRowsAction(_r, _c); });
}

//jvizTable click head event
function jvizTableClickHeadEvent(_main, _n)
{
  //Create the event
  $('#' + _main.table.cols.id + _n).on('click', function(e){ _main.ClickHeadAction(_n); });
}
