//jvizTable - Function for set the callback
jvizTable.prototype.Callback = function(c)
{
  //Save the callback
  this.callback = c;
};

//jvizTable Do calback
jvizTable.prototype.CallbackDo = function(r, c)
{
  //Get the real index
  var index = this.page.now*this.table.rows.num + r;

  //Show in console
  console.log('jvizTable: Callback for index ' + index);

  //Check for user callback
  if(this.callback)
  {
    //Make the custom callback
    this.callback(this.data.procesed[index], this.table.cols.items[c].key);
  }
};
