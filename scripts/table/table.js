//jviz-table main class
var jvizTable = function(obj)
{
  //Parent ID
  this.parent = obj.id;

  //Main app
  this.app = {};
  this.app.id = this.parent + '-jviztable'; //App ID
  this.app.class = 'jvizTable'; //App class

  //Navbar
  this.navbar = {};
  this.navbar.id = this.app.id + '-navbar'; //Navbar ID
  this.navbar.class = this.app.class + '-navbar'; //Navbar class

  //Navbar button
  this.navbar.btn = {};
  this.navbar.btn.id = this.navbar.id + '-btn'; //Navbar button ID
  this.navbar.btn.class = this.navbar.class + '-btn'; //Navbar button class

  //Navbar sort button
  this.navbar.btn.sort = {};
  this.navbar.btn.sort.id = this.navbar.btn.id + '-sort'; //Navbar btn sort
  this.navbar.btn.sort.class = this.navbar.btn.class + '-sort'; //Navbar btn sort class
  this.navbar.btn.sort.title = 'Sort table'; //Navbar btn sort title

  //Table content
  this.table = {};
  this.table.id = this.app.id + '-table'; //Table ID
  this.table.class = this.app.class + '-table'; //Table class

  //Table head
  this.table.head = {};
  this.table.head.id = this.table.id + '-head'; //Table head ID
  this.table.head.class = this.table.class + '-head'; //Table head class

  //Table body content
  this.table.body = {};
  this.table.body.id = this.table.id + '-body'; //Body ID
  this.table.body.class = this.table.class + '-body'; //Body class

  //Table cols
  this.table.cols = {};
  this.table.cols.id = this.table.head.id + '-cols-'; //Table head cols ID
  this.table.cols.class = this.table.class + '-cols'; //Table cols class
  this.table.cols.items = []; //For save the cols
  this.table.cols.num = 0; //Cols num
  this.table.cols.padding = 20; //Columns padding

  //Rows vars
  this.table.rows = {};
  this.table.rows.id = this.app.id + '_row_'; //Row ID
  this.table.rows.class = this.table.class + '-rows'; //Row class
  this.table.rows.height = 43; //Rows height
  this.table.rows.num = 5; //Number of rows
  this.table.rows.select = [5, 10, 20]; //Rows available for select

  //For save the data
  this.data = {};
  this.data.orig = []; //Original data
  this.data.procesed = null; //Procesed data

  //For sort the data
  this.sort = {};
  this.sort.col = -1; //Shorted column
  this.sort.order = 1; //Shor order
  this.sort.class = this.app.class + '-sort'; //Default icon
  this.sort.asc = this.sort.class + '-asc'; //Asc icon
  this.sort.des = this.sort.class + '-des'; //Des incon

  //Callback
  this.callback = null; //Callback function

  //No data
  this.nodata = {};
  this.nodata.id = this.app.id + '-nodata'; //No data ID
  this.nodata.class = this.app.class + '-nodata'; //No data class
  this.nodata.text = 'No data found'; //No data text

  //Pages info
  this.page = {};
  this.page.now = 0; //Page now
  this.page.num = 0; //Number of pages

  //Table foot
  this.foot = {};
  this.foot.id = this.app.id + '-foot'; //Foot ID
  this.foot.class = this.app.class + '-foot'; //Foot class

  //Foot page
  this.foot.page = {};
  this.foot.page.id = this.foot.id + '-page'; //Foot page ID
  this.foot.page.class = this.foot.class + '-page'; //Foot page class

  //Foot page input
  this.foot.page.input = {};
  this.foot.page.input.id = this.foot.page.id + '-input'; //Foot page input ID
  this.foot.page.input.class = this.foot.page.class + '-input'; //Foot page input class

  //Foot page total
  this.foot.page.total = {};
  this.foot.page.total.id = this.foot.page.id + '-total'; //Foot page total ID
  this.foot.page.total.class = this.foot.page.class + '-total'; //Foot page total class

  //Foot buttons
  this.foot.btn = {};
  this.foot.btn.id = this.foot.id + '-btn'; //Foot btn ID
  this.foot.btn.class = this.foot.class + '-btn'; //Foot buttons class

  //Foot prev button
  this.foot.btn.prev = {};
  this.foot.btn.prev.id = this.foot.btn.id + '-prev'; //Foot btn prev ID
  this.foot.btn.prev.class = this.foot.btn.class + '-prev'; //Foot btn prev class

  //Foot next button
  this.foot.btn.next = {};
  this.foot.btn.next.id = this.foot.btn.id + '-next'; //Foot btn next ID
  this.foot.btn.next.class = this.foot.btn.class + '-next'; //Foot btn next class

  //Foot
  this.footrows = {};
  this.footrows.id = this.foot.id + '_rows'; //Foot rows ID
  this.footrows.show = true; //Show the foot rows block
  this.footrows.select = {}; //Foot Rows select
  this.footrows.select.id = this.footrows.id + '_select'; //Foot Rows select ID
  this.footrows.select.class = this.app.class + '-foot-rows-select'; //Foot rows select class
  this.footrows.text = {}; //Foot rows text
  this.footrows.text.id = this.footrows.id + '_text'; //Foot rows text ID
  this.footrows.text.class = this.app.class + '-foot-rows-text'; //Foot rows text class
  this.footrows.text.txt = 'Rows per page: '; //Foot rows text text
}
