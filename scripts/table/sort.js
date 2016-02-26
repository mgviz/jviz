//jvizTable Sort By column
jvizTable.prototype.SortBy = function(c)
{
  //Change the style for the old colum
  $('#' + this.table.cols.id + this.sort.col).removeClass(this.sort.asc);
  $('#' + this.table.cols.id + this.sort.col).removeClass(this.sort.des);

  //Check the column
  if(this.sort.col != c)
  {
    //Change the column
    this.sort.col = c;

    //Reset the order
    this.sort.order = 1;
  }
  else
  {
    //If the column is the same, change the order
    this.sort.order = (this.sort.order == 1)? -1 : 1;
  }

  //Sort the data by column
  this.data.procesed = ObjectSort(this.data.orig, this.table.cols.items[this.sort.col].key);
  console.log('Done!');

  //Check the order
  if(this.sort.order == -1)
  {
    //Reverse the array
    this.data.procesed.reverse();

    //Add the style for des
    $('#' + this.table.cols.id + this.sort.col).addClass(this.sort.des);
  }
  else
  {
    //Add the style for asc
    $('#' + this.table.cols.id + this.sort.col).addClass(this.sort.asc);
  }

  //Initialize the pages
  this.PageInit();

  //Show the page
  this.Page();
};
