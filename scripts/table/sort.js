//jvizTable sort dialog build
jvizTable.prototype.SortBuild = function()
{
  //Create the new sort content
  var div = '<div>';

  //Add button
  div = div + '<div id="' + this.sort.btn.add.id + '" class="' + this.sort.btn.add.class + '">';
  div = div + this.sort.btn.add.title;
  div = div + '</div>';

  //Add the list
  div = div + '<div id="' + this.sort.list.id + '" class="' + this.sort.list.class + '"></div>';

  //Add the sort button
  div = div + '<div id="' + this.sort.btn.sort.id + '" class="' + this.sort.btn.sort.class + '">';
  div = div + this.sort.btn.sort.title;
  div = div + '</div>';

  //Close the sort div
  div = div + '</div>';

  //Show the content
  this.dialog.Content(div);

  //Add the events
  jvizTableSortEvents(this);
};

//jvizTable sort list build
jvizTable.prototype.SortList = function()
{
  //Reset
  $('#' + this.sort.list.id).html('');

  //Order options
  var order = [{ value: 'ASC', label: 'Ascendant' }, { value: 'DESC', label: 'Descendant' }];

  //Read the list
  for(var i = 0; i < this.sort.list.items.length; i++)
  {
    //Initialize the div
    var div = '<div id="' + this.sort.list.item.id + i + '" class="' + this.sort.list.item.class + '" align="center">';

    //Select text
    div = div + 'Order column: ';

    //Add the column selector
    div = div + '<select id="' + this.sort.list.item.select.column + i + '" class="' + this.sort.list.item.select.class + '">';

    //Add all the cols
    for(var j = 0; j < this.table.cols.items.length; j++)
    {
      //Get the column
      var col = this.table.cols.items[j];

      //Initialize selected
      var selected = '';

      //Check for selected
      if(this.sort.list.items[i].column === col.key){ selected = 'selected'; }

      //Add the option
      div = div + '<option value="' + col.key + '" ' + selected + '>' + col.label + '</option>';
    }

    //Close the column select
    div = div + '</select>';

    //Add the order title
    div = div + ' in order: ';

    //Add the order selector
    div = div + '<select id="' + this.sort.list.item.select.order + i + '" class="' + this.sort.list.item.select.class + '">';

    for(var j = 0; j < order.length; j++)
    {
      //Initialize selected
      var selected = '';

      //Check for selected
      if(this.sort.list.items[i].order === order[j].value){ selected = 'selected'; }

      //Add the option
      div = div + '<option value="' + order[j].value + '" ' + selected + '>' + order[j].label + '</option>';
    }

    //Close the order selector
    div = div + '</select>';

    //Add the remove button
    div = div + '<div id="' + this.sort.list.item.remove.id + i + '" class="' + this.sort.list.item.remove.class + '">&nbsp;</div>';

    //Close the div
    div = div + '</div>';

    //Show the full list
    $('#' + this.sort.list.id).append(div);

    //Add the event
    jvizTableSortListItemEvent(this, i);
  }
};

//jvizTable sort list add item
jvizTable.prototype.SortListAdd = function()
{
  //Add a new element
  this.sort.list.items.push({ column: '', order: 'ASC' });

  //Show the list
  this.SortList();

  //Save the values
  this.SortListUpdate(this.sort.list.items.length - 1);
};

//jvizTable sort List remove item
jvizTable.prototype.SortListRemove = function(index)
{
  //Remove the element
  this.sort.list.items.splice(index, 1);

  //Show the list
  this.SortList();
};

//jvizTable sort list update
jvizTable.prototype.SortListUpdate = function(index)
{
  //Update the column
  this.sort.list.items[index].column = $('#' + this.sort.list.item.select.column + index).val();

  //Update the order
  this.sort.list.items[index].order = $('#' + this.sort.list.item.select.order + index).val();
};

//jvizTable Sort
jvizTable.prototype.SortBy = function()
{
  //Initialize the columns array
  var columns = [];

  //Initialize the order array
  var order = [];

  //Read all the list
  for(var i = 0; i < this.sort.list.items.length; i++)
  {
    //Save the column key
    columns.push(this.sort.list.items[i].column);

    //Save the order
    order.push(this.sort.list.items[i].order);
  }

  //Sort the data
  this.data.procesed = ObjectSort(this.data.procesed, columns, order);

  //Initialize the pages
  this.PageInit();

  //Show the page
  this.Page();

  //Hide the dialog
  this.dialog.ShowHide();
};

//jvizTable sort events
function jvizTableSortEvents(_main)
{
  //Add event for the sort button
  $('#' + _main.sort.btn.sort.id).on('click', function(){ _main.SortBy(); });

  //Add event for the add button
  $('#' + _main.sort.btn.add.id).on('click', function(){ _main.SortListAdd(); });
}

//jvizTable sort list item event
function jvizTableSortListItemEvent(_main, _i)
{
  //Column event
  $('#' + _main.sort.list.item.select.column + _i).on('change', function(e){ _main.SortListUpdate(_i); });

  //Order event
  $('#' + _main.sort.list.item.select.order + _i).on('change', function(e){ _main.SortListUpdate(_i); });

  //Remove event
  $('#' + _main.sort.list.item.remove.id + _i).on('click', function(){ _main.SortListRemove(_i); });
}
