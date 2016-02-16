//CoverViewer Import Cover from
CoverViewer.prototype.ImportCover = function(opt)
{
  //Check url
  if(typeof opt.url !== 'undefined') { this.data.cover.url = opt.url; }

  //Check parser
  if(typeof opt.parser !== 'undefined') { this.data.cover.parser = opt.parser; }

  //Check color function
  if(typeof opt.color !== 'undefined') { this.data.cover.color = opt.color; }

  //Check label function
  if(typeof opt.label !== 'undefined') { this.bams.label = opt.label; }
};

//CoverViewer Import Genes from
CoverViewer.prototype.ImportGenes = function(opt)
{
  //Check url
  if(typeof opt.url !== 'undefined') { this.data.genes.url = opt.url; }

  //Check parser
  if(typeof opt.parser !== 'undefined') { this.data.genes.parser = opt.parser; }

  //Check label function
  if(typeof opt.label !== 'undefined') { this.data.genes.label = opt.label; }

  //Check Info Title
  if(typeof opt.infoTitle !== 'undefined') { this.data.genes.info.title = opt.infoTitle; }

  //Check Info Content
  if(typeof opt.infoContent !== 'undefined') { this.data.genes.info.content = opt.infoContent; }
};

//CoverViewer Import Exons from
CoverViewer.prototype.ImportExons = function(opt)
{
  //Set use exons as true
  this.data.exons.use = true;

  //Check url
  if(typeof opt.url !== 'undefined') { this.data.exons.url = opt.url; }

  //Check parser
  if(typeof opt.parser !== 'undefined') { this.data.exons.parser = opt.parser; }

  //Check label function
  if(typeof opt.label !== 'undefined') { this.data.exons.label = opt.label; }
};