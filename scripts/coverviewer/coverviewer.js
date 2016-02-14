//CoverViewer Class
var CoverViewer = function(id)
{
  //App info
  this.info = {};
  this.info.version = '0.1.0'; //App Version
  this.info.name = 'CoverViewer'; //App name
  this.info.website = 'https://biowt.github.io/coverviewer'; //App website

  //Start the default values
  this.default = {};
  this.default.buildtime = 500; //Default build time
  this.default.maxregion = 100000; //Max region size
  //this.default.region = '1:6527454-6529974'; //Test region
  this.default.region = '1:6500000-6600000'; //Test region
  this.default.test = true; //Enable/disable test mode

  //Parent div
  this.parent = id;

  //App
  this.app = {};
  this.app.id = this.parent + '-cover'; //App ID
  this.app.class = 'CoverViewer'; //App Class
  this.app.border = false; //App border
  this.app.padding = 0; //App pading
  this.app.width = 0; //App width
  this.app.height = 0; //App height

  //Cursor
  this.cursor = {};
  this.cursor.move = this.app.class + '-move'; //Cursor move
  this.cursor.hand = this.app.class + '-hand'; //Cursor hand

  //Loading div
  this.loading = {};
  this.loading.id = this.app.id + '-loading'; //Loading ID
  this.loading.width = '100%'; //Loading height
  this.loading.height = 0; //Loading height
  this.loading.class = this.app.class + '-loading'; //Loading css class
  this.loading.show = true; //Loading show
  this.loading.visible = false; //Loading visible

  //Loading screen
  this.loading.screen = {};
  this.loading.screen.id = this.loading.id + '-screen'; //Loading screen ID
  this.loading.screen.width = '100%'; //Loading screen width
  this.loading.screen.height = 0; //Loading screen height
  this.loading.screen.class = this.loading.class + '-screen'; //Loading screen css class
  this.loading.screen.show = true; //Show true
  this.loading.screen.padding = {"top": 100}; //Padding

  //Navbar
  this.navbar = {};
  this.navbar.id = this.app.id + '-navbar'; //Navbar ID
  this.navbar.width = 0; //Navbar width
  this.navbar.height = 0; //Navbar height
  this.navbar.show = true; //Show navbar
  this.navbar.class = this.app.class + '-navbar'; //Navbar css class

  //Navbar button
  this.navbar.btn = {};
  this.navbar.btn.id = this.navbar.id + '-btn'; //Navbar button
  this.navbar.btn.class = this.navbar.class + '-btn'; //Navbar class

  //Navbar button settings
  this.navbar.btn.settings = {};
  this.navbar.btn.settings.id = this.navbar.btn.id + '-settings'; //Navbar settings button id
  this.navbar.btn.settings.class = this.navbar.btn.class + '-settings'; //Navbar settings button class
  this.navbar.btn.settings.show = true; //Navbar show settings button
  this.navbar.btn.settings.title = 'Settings'; //Navbar settings button title

  //Left button
  this.navbar.btn.left = {};
  this.navbar.btn.left.id = this.navbar.btn.id + '-left'; //Navbar left button id
  this.navbar.btn.left.class = this.navbar.btn.class + '-left'; //Navbar left button class
  this.navbar.btn.left.show = true; //Navbar show left button
  this.navbar.btn.left.title = 'Go left'; //Navbar left button title

  //Right button
  this.navbar.btn.right = {};
  this.navbar.btn.right.id = this.navbar.btn.id + '-right'; //Navbar right button id
  this.navbar.btn.right.class = this.navbar.btn.class + '-right'; //Navbar right button class
  this.navbar.btn.right.show = true; //Navbar show right button
  this.navbar.btn.right.title = 'Go right'; //Navbar right button title

  //Main content
  this.main = {};
  this.main.id = this.app.id + '-main'; //Main ID
  this.main.class = this.app.class + '-main'; //Main class
  this.main.width = 0; //Main div width
  this.main.height = 0; //Main div height

  //Foot
  this.foot = {};
  this.foot.id = this.app.id + '-foot'; //Foot ID
  this.foot.show = true; //Show foot
  this.foot.class = this.app.class + '-foot'; //Foot css class
  this.foot.width = 0; //Foot div width
  this.foot.height = 0; //Foot div height

  //Settings panel
  this.settings = {};
  this.settings.id = this.app.id + '-settings'; //Settings ID
  this.settings.class = this.app.class + '-settings'; //Settings class
  this.settings.show = false;
  this.settings.gauss = this.settings.id + '-gauss'; //Settings gauss ID
  this.settings.apply = this.settings.id + '-apply'; //Settings apply ID

  //Draw adapter
  this.draw = {};
  this.draw.delay = 500; //Draw delay time
  this.draw.region = ''; //Full region for draw
  this.draw.chr = ''; //Chromosome draw
  this.draw.start = 0; //Start position
  this.draw.end = 0; //End position

  //Core
  this.core = {};
  this.core.running = false; //Core running
  this.core.region = null; //Region selected
  this.core.fullregion = null; //Full region to draw
  this.core.resized = false; //For check if window has resized

  //Data
  this.data = {};
  this.data.nullvalues = 0; //Data null values

  //Data for coverage
  this.data.cover = {};
  this.data.cover.data = null; //Cover data container
  this.data.cover.busy = false; //Cover data busy
  this.data.cover.error = false; //Cover data error
  this.data.cover.url = ''; //Cover data url
  this.data.cover.parser = null; //Cover data parser
  this.data.cover.max = 0; //Cover data max value
  this.data.cover.min = 0; //Cover data min value
  this.data.cover.region = ''; //Region for draw
  this.data.cover.color = null; //Cover color function
  this.data.cover.label = null; //Cover label function
  this.data.cover.fixgaps = true; //Fix gaps on data

  //Data for genes
  this.data.genes = {};
  this.data.genes.url = ''; //Genes url for data
  this.data.genes.parser = null; //Genes parser function
  this.data.genes.busy = false; //Genes data busy
  this.data.genes.error = false; //Genes data error
  this.data.genes.label = null; //Genes Label function
  this.data.genes.info = {}; //Genes Info box
  this.data.genes.info.title = null; //Genes info title function
  this.data.genes.info.content = null; //Genes info content function

  //Data for exons
  this.data.exons = {};
  this.data.exons.url = ''; //Exons data url
  this.data.exons.busy = false; //Exons data busy
  this.data.exons.use = false; //If user is using the exons addon
  this.data.exons.data = null; //Exons data
  this.data.exons.parser = null; //Exons data parser
  this.data.exons.error = false; //Exons data import error
  this.data.exons.num = 0; //Exons number

  //Preview track
  this.preview = new jvizTrack({ id: this.app.id + '-preview', class: this.app.class + '-track', layers: 2 });
  this.preview.title = 'Full preview'; //Preview title
  this.preview.width = 0; //Preview width
  this.preview.height = 120; //Preview height
  this.preview.show = true; //Preview show
  this.preview.busy = false; //Preview is busy
  this.preview.data = null; //Preview data
  this.preview.start = 0; //Start position
  this.preview.end = 0; //End position
  this.preview.mult = 0; //Multiplier
  this.preview.opacity = 0.6; //Lines opacity
  this.preview.stroke = 1; //Stroke width
  this.preview.mouse = false; //Mouse active

  //Preview draw
  this.preview.draw.margin = { top: 40, bottom: 40, left: 50, right: 50 }; //Preview margin
  this.preview.draw.width = 0; //Preview draw width
  this.preview.draw.height = 0; //Preview draw height

  //Preview window
  this.preview.window = {};
  this.preview.window.start = 0; //Window start
  this.preview.window.end = 0; //Window end
  this.preview.window.width = 0; //Window width
  this.preview.window.height = 0; //Window height
  this.preview.window.region = {"start": 0, "end": 0}; //Region coordinates
  this.preview.window.click = 0; //Click point
  this.preview.window.clickstart = 0; //Original start
  this.preview.window.fill = { color: '#FF9100', opacity: 0.2 }; //Window fill

  //Preview lavel
  this.preview.label = {};
  this.preview.label.width = 150; //Label width
  this.preview.label.height = 22; //Label height
  this.preview.label.posx = 0; //Label position x
  this.preview.label.posy = 0; //Label position y
  this.preview.label.fill = '#FF9100'; //Label fill color
  this.preview.label.text = { font: 'OpenSans', size: '12px', align: 'center', color: '#ffffff'}; //Font
  this.preview.label.margin = 8; //Margin top
  this.preview.label.radius = 5; //Label rectangle radius

  //Cover track
  this.cover = new jvizTrack({ id: this.app.id + '-cover', class: this.app.class + '-track', layers: 2 });
  this.cover.title = 'Coverage'; //Cover title
  this.cover.height = 250; //Cover div height
  this.cover.data = null; //Cover data
  this.cover.length = 0; //Cover length
  this.cover.start = 0; //Cover start position
  this.cover.end = 0; //Cover end position
  this.cover.show = true; //Show cover track
  this.cover.busy = false; //Cover is busy
  this.cover.margin =
  this.cover.stroke = 2; //Stroke width
  this.cover.mouse = false; //Mouse active
  this.cover.click = 0; //Click point
  this.cover.clickfirst = false; //For prevent errors
  this.cover.clickstart = 0; //Click orginal position

  //Cover draw
  this.cover.draw.margin = { top: 25, bottom: 40, right: 50, left: 50 }; //Cover draw margin
  this.cover.draw.width = 0; //Cover draw width
  this.cover.draw.height = 0; //Cover draw height

  //Cover axes
  this.cover.axes = {};
  this.cover.axes.class = 'cover-track-cover-axes'; //Cover axes class

  //Cover hover line
  this.cover.hover = {};
  this.cover.hover.stroke = { color: '#00B0FF', opacity: 0.4 }; //Line class
  this.cover.hover.width = 1; //Line width
  this.cover.hover.height = 0; //Line height
  this.cover.hover.circle = []; //Circle list
  this.cover.hover.radius = 4; //Circle radius
  this.cover.hover.position = 0; //Hover position
  this.cover.hover.positioni = 0; //Hover position index

  //Cover label for value
  this.cover.value = {};
  this.cover.value.width = 40; //Label width
  this.cover.value.height = 15; //Label height
  this.cover.value.margin = 15; //Margin right
  this.cover.value.text = { font: 'OpenSans', size: '11px', align: 'center', color: '#ffffff' }; //Font
  this.cover.value.radius = 5; //value label Rectangle radius
  this.cover.value.mindiff = 7; //Minim difference

  //Cover label
  this.cover.label = {};
  this.cover.label.fill = { color: '#00B0FF' }; //Label fill
  this.cover.label.width = 90; //Label width
  this.cover.label.height = 22; //Label height
  this.cover.label.posx = 0; //Position x
  this.cover.label.posy = 0; //Position y
  this.cover.label.text = { font: 'OpenSans', size: '12px', align: 'center', color: '#ffffff' }; //Label text
  this.cover.label.margin = 8; //Margin top
  this.cover.label.radius = 5; //Label rectangle radius

  //Bam labels track
  this.labels = {};
  this.labels.id = this.app.id + '-names'; //Labels ID
  this.labels.width = '100%'; //Labels div width
  this.labels.height = 0; //Labels height
  this.labels.title = 'Labels'; //Labels title
  this.labels.class = 'cover-track-names'; //Labels class
  this.labels.show = true; //Show labels track
  this.labels.active = false; //For check if labels track is active

  //Labels element
  this.labels.el = {};
  this.labels.el.class = 'cover-track-names-el'; //Labels element class

  //Labels checkbox
  this.labels.checkbox = {};
  this.labels.checkbox.id = this.labels.id + '-checkbox'; //Labels checkbox id
  this.labels.checkbox.class = 'cover-track-names-checkbox'; //Labels checkbox class

  //Labels bar
  this.labelsbar = {};
  this.labelsbar.id = this.labels.id + '-bar'; //Labels bar id
  this.labelsbar.class = 'cover-track-bar'; //Labels bar class

  //Gene track
  this.genes = new jvizTrack({ id: this.app.id + '-genes', class: this.app.class + '-track', layers: 1 });
  this.genes.title = 'Genes'; //Genes track title
  this.genes.width = '100%'; //Genes div width
  this.genes.minheight = 0; //Genes div min height
  this.genes.height = 30; //Genes div height
  this.genes.show = true; //Genes show
  this.genes.busy = false; //Genes is busy
  this.genes.start = 0; //Genes start point
  this.genes.end = 0; //Genes end point
  this.genes.length = 0; //Genes length
  this.genes.mouse = false; //Genes mouse event
  this.genes.click = 0; //Click point
  this.genes.clickfirst = false; //For prevent errors
  this.genes.clickstart = 0; //Click orginal position
  this.genes.list = []; //Genes positions list

  //Genes draw
  this.genes.draw.width = 0; //Genes draw width
  this.genes.draw.height = 0; //Genes draw height
  this.genes.draw.margin = { top: 50, bottom: 40, left: 50, right: 50 }; //Genes div margin

  //Genes strand
  this.strand = {};
  this.strand.text = { font: 'OpenSans', size: '11px' }; //Strand text font
  this.strand.forward = {}; //Positive strand (forward)
  this.strand.forward.index = 0; //Positive strand index for styles
  this.strand.forward.id = '1'; //Positive strand id
  this.strand.forward.text = ' (Forward strand)'; //Positive strand text
  this.strand.reverse = {}; //Genes negative strand (reverse)
  this.strand.reverse.index = 1; //Negative strand index for styles
  this.strand.reverse.id = '-1'; //Negative strand id
  this.strand.reverse.text = ' (Reverse strand)'; //Negative strand text
  this.strand.color = []; //Strand colors
  this.strand.color.push('#2196F3'); //Color for the forward strand
  this.strand.color.push('#F44336'); //Color for the reverse strand
  this.strand.dir = []; //Strand direction
  this.strand.dir.push('> '); //Text for forward strand
  this.strand.dir.push('< '); //Text for reverse strand

  //Genes element
  this.genes.el = {};
  this.genes.el.block = 0; //Full element size
  this.genes.el.rect = 8; //Genes element rectangle height
  this.genes.el.text = 15; //Genes element text height
  this.genes.el.exon = 8; //Genes element exon
  this.genes.el.margin = 10; //Margin top and bottom

  //Genes box
  this.genes.box = {};
  this.genes.box.id = this.genes.id + '-box'; //Genes box id
  this.genes.box.width = 0; //Genes box width
  this.genes.box.height = 0; //Genes box height
  this.genes.box.show = true; //Genes box show

  //Genes Info
  this.genes.info = {};
  this.genes.info.id = this.genes.box.id + '-info'; //Genes Info ID
  this.genes.info.width = 180; //Genes Info width
  this.genes.info.height = 0; //Genes Info height
  this.genes.info.class = 'cover-track-genes-info'; //Genes Info class
  this.genes.info.padding = 5; //Genes Info padding
  this.genes.info.posx = 0; //Genes Info posx
  this.genes.info.posy = 0; //Genes Info posy

  //Exons
  this.exons = {};
  this.exons.size = 50; //Exons line size
  this.exons.color = []; //Exons color
  this.exons.color.push('#0D47A1'); //Color for forward genes exons
  this.exons.color.push('#B71C1C'); //Color for reverse genes exons

  //Control points
  this.points = {};
  this.points.gap = 1000; //Control points nucleotides gap
  this.points.stroke = { color: '#b8c6d6', width: 1, opacity: 0.3 }; //Points class
  this.points.text = { font: 'OpenSans', size: '12px', color: '#b8c6d6' };
  this.points.letter = 'K'; //Control points letter
  this.points.margin = 20; //Points margin
  this.points.textmargin = {'top': 15, 'left': 4}; //Points text margin

  //Colors
  this.colors = [];
  this.colors.push({"name": "blue", "hex": "#2962FF"}); //Blue
  this.colors.push({"name": "red", "hex": "#D50000"}); //Red
  this.colors.push({"name": "purple", "hex": "#D500F9"}); //Purple
  this.colors.push({"name": "green", "hex": "#00C853"}); //Green
  this.colors.push({"name": "orange","hex": "#FF9100"}); //Orange
  this.colors.push({"name": "brown", "hex": "#4E342E"}); //Brown
  this.colors.push({"name": "grey", "hex": "#607D8B"}); //Grey
  this.colors.push({"name": "teal", "hex": "#009688"}); //Teal
  this.colors.push({"name": "pink", "hex": "#FF4081"}); //Pink
  this.colors.push({"name": "black", "hex": "#000000"}); //Black

  //Bams files
  this.bams = {};
  this.bams.num = 0; //Number of bams
  this.bams.color = []; //Color for each bams
  this.bams.label = []; //Label for each bam
  this.bams.active = []; //Bams active
  this.bams.opacity = 0.09; //Opacity for disabled bams

  //Gauss filter
  this.gauss = {};
  this.gauss.def = 3; //Gauss Default filter times
  this.gauss.times = 3; //Gauss filter times
  this.gauss.min = 0; //Gauss min filter times
  this.gauss.max = 10; //Gauss max filter times

  //Tracks list
  this.tracks = [];

  //Build Time out
  CoverViewerBuildTimeOut(this);
};
