//jvizTable add columns
jvizTable.prototype.ColumnAdd = function(co)
{
  //Check for undefined key
  if(typeof co.key === 'undefined') { return console.error('jvizTable: undefined key or label for column'); }

  //Save the label
  co.label = (typeof co.label === 'undefined')? co.key : co.label;

  //Save the align
  co.align = (typeof co.align === 'undefined')? 'left' : co.align;

  //Save the style
  co.style = (typeof co.style === 'undefined')? '' : this.ParseStyle(co.style);

  //Save the width
  co.width = (typeof co.width === 'undefined')? 'auto' : parseInt(co.width);

  //Save the column
  this.table.cols.items.push(co);

  //Increment the columns
  this.table.cols.num = this.table.cols.num + 1;
};

//jvizTable Column head
jvizTable.prototype.ColumnBuildHead = function()
{
  //Initialize the columns div
  var div = '';

  //Add the head content
  for(var j = 0; j < this.table.cols.items.length; j++)
  {
    //Get the column
    var col = this.table.cols.items[j];

    //Create the column style
    var colst = { 'text-align': col.align };

    //Check for add the column width
    if(col.width !== 'auto'){ colst.width = col.width; }

    //Add the column with the id
    div = div + '<th id="' + this.table.cols.id + j + '" class="' + this.table.cols.class + '" ';

    //Add the style
    div = div + 'style="' + this.ParseStyle(colst) + '">';

    //Add the column label
    div = div + col.label;

    //Close the column
    div = div + '</th>';
  }

  //Return the head columns
  return div;
};

//jvizTable Column build body
jvizTable.prototype.ColumnBuildBody = function(row, count)
{
  //Output div
  var div = '';

  //Read all columns
  for(var j = 0; j < this.table.cols.items.length; j++)
  {
    //Get the column
    var col = this.table.cols.items[j];

    //Create the column with the align
    div = div + '<td id="' + this.table.cols.id + count + '-' + j + '" class="' + this.table.cols.class + '"';

    //Add the style for the column
    div = div + 'style="text-align:' + col.align + '">';

    //Column content
    div = div + '<span style="' + col.style + '">' + this.data.procesed[row][col.key] + '</span>';

    //Close the column
    div = div + '</td>';
  }

  //Return the colums
  return div;
};
