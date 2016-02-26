//jvizTable set title
jvizTable.prototype.Title = function(tx)
{
  //Save the title
  this.title.text = tx;
};


//jvizTable set content
jvizTable.prototype.Content = function(da)
{
  //Save the data
  this.data.orig = da;
};
