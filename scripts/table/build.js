//jvizTable build the table
jvizTable.prototype.Build = function()
{
  //Build the app div
  $('#' + this.parent).append('<div id="' + this.app.id + '" class="' + this.app.class + '"></div>');

  //Initialize the div
  var div = '';

  //Add the navbar
  div = div + this.BuildNavbar();

  //Add the table
  div = div + this.BuildTable();

  //Add the foot
  div = div + this.BuildFoot();

  /*


  //Show no data div
  div = div + '<div id="' + this.nodata.id + '" class="' + this.nodata.class + '">' + this.nodata.text + '</div>';

  //Close the table div
  div = div + '</div>';


  //Foot div
  div = div + '<div id="' + this.foot.id +'" class="' + this.foot.class + '">';

  //Button for prev page
  div = div + '<div id="' + this.footbtn.prev + '" class="' + this.footbtn.class + '">Prev</div>';

  //Div for show the actual page
  div = div + '<div id="' + this.foottext.page + '" class="' + this.foottext.pagec + '"></div>';

  //Button for next page
  div = div + '<div id="' + this.footbtn.next + '" class="' + this.footbtn.class + '">Next</div>';

  //Check for show the rows select
  if(this.footrows.show === true)
  {
    //Show the rows text
    div = div + '<span class="' + this.footrows.text.class + '">' + this.footrows.text.txt + '</span>';

    //Select for rows
    div = div + '<select id="' + this.footrows.select.id + '" class="' + this.footrows.select.class + '">';

    //Add the rows available
    for(var i = 0; i < this.rows.select.length; i++)
    {
      div = div + '<option value="' + this.rows.select[i] + '">' + this.rows.select[i] + '</option>';
    }

    //Close the rows select
    div = div + '</select>';
  }

  //Span for show the total of items
  div = div + '<span id="' + this.foottext.total + '" class="' + this.foottext.totalc + '"></span>';

  //Close the foot div
  div = div + '</div>';

  //Close the body div
  div = div + '</div>';
  */

  //Append the table html
  $('#' + this.app.id).html(div);
};

//jvizTable Build the navbar
jvizTable.prototype.BuildNavbar = function()
{
  //Initialize the navbar html
  var div = '<div id="' + this.navbar.id + '" class="' + this.navbar.class + '">';

  //Add the sort button
  div = div + '<div id="' + this.navbar.btn.sort.id + '" class="' + this.navbar.btn.sort.class + '">';
  div = div + this.navbar.btn.sort.title;
  div = div + '</div>';

  //Close the navbar div
  div = div + '</div>';

  //Return the navbar
  return div;
};

//jvizTable Build the table
jvizTable.prototype.BuildTable = function()
{
  //Initialize the table content
  var div = '<table id="' + this.table.id + '" class="' + this.table.class + '">';

  //Create the table head
  div = div + '<thead id="' + this.table.head.id + '" class="' + this.table.head.class + '"><tr>';

  //Add the head columns
  div = div + this.ColumnBuildHead();

  //Close the head
  div = div + '</tr></thead>';

  //Create the table body
  div = div + '<tbody id="' + this.table.body.id + '" class="' + this.table.body.class + '"></tbody>';

  //Close the table
  div = div + '</table>';

  //Return the div
  return div;
};

//jvizTable Build foot
jvizTable.prototype.BuildFoot = function()
{
  //Initialize the foot html
  var div = '<div id="' + this.foot.id + '" class="' + this.foot.class + '">';

  //Add the prev button
  div = div + '<div id="' + this.foot.btn.prev.id + '" class="' + this.foot.btn.prev.class + '">&nbsp;</div>';

  //Div for show the actual page
  div = div + '<div id="' + this.foot.page.id + '" class="' + this.foot.page.class + '">';

  //Add the page text
  div = div + 'Page ';

  //Page input
  div = div + '<input type="text" id="' + this.foot.page.input.id + '" class="' + this.foot.page.input.class + '">';

  //Pate text
  div = div + ' of ';

  //Page total
  div = div + '<span id="' + this.foot.page.total.id + '" class="' + this.foot.page.total.class + '"></span>';

  //Close the actual page div
  div = div + '</div>';

  //Add the next button
  div = div + '<div id="' + this.foot.btn.next.id + '" class="' + this.foot.btn.next.class + '">&nbsp;</div>';

  //Close the navbar div
  div = div + '</div>';

  //Return the navbar
  return div;
};
