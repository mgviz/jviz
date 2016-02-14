//********************************************
// CellBase Adapter for jviz lib
// http://docs.bioinfo.cipf.es/projects/cellbase/
// Created by Jose M. Juanes
//***********************************************

//Main CellBase Adapter
var CellBaseAdapter = new function()
{
  //Cellbase version
  this.version = 'v2';

  //Selected specie
  this.index = -1;

  //Cellbase wiki url
  this.wiki = 'http://docs.bioinfo.cipf.es/projects/cellbase/wiki';

  //Cellbase base url
  this.base = 'http://ws.bioinfo.cipf.es/cellbase/rest/{version}/{specie}/genomic/region/{region}/{feature}?of=json';

  //Celbase species available
  //http://ws.bioinfo.cipf.es/cellbase/rest/v2?of=json
  this.species = [];

  //Push common species
  this.species.push({species:"hsa",common:"human",scientific:"Homo sapiens",assembly:"GRCh37.p7"});
  this.species.push({species:"mmu",common:"mouse",scientific:"Mus musculus",assembly:"NCBIM37"});
  this.species.push({species:"rno",common:"rat",scientific:"Rattus norvegicus",assembly:"RGSC 3.4"});
  this.species.push({species:"dre",common:"zebrafish",scientific:"Danio rerio",assembly:"Zv9"});
  this.species.push({species:"cel",common:"worm",scientific:"Caenorhabditis elegans",assembly:"WS230"});
  this.species.push({species:"dme",common:"fruitfly",scientific:"Drosophila melanogaster",assembly:"BDGP 5.39"});
  this.species.push({species:"sce",common:"yeast",scientific:"Saccharomyces cerevisiae",assembly:"EF 4"});
  this.species.push({species:"cfa",common:"dog",scientific:"Canis familiaris",assembly:"CanFam 2.0"});
  this.species.push({species:"ssc",common:"pig",scientific:"Sus scrofa",assembly:"Sscrofa10.2"});
  this.species.push({species:"aga",common:"mosquito",scientific:"Anopheles gambiae",assembly:"AgamP3"});
  this.species.push({species:"pfa",common:"malaria parasite",scientific:"Plasmodium falciparum",assembly:"3D7"});

  //Find specie
  this.FindSpecie = function(s)
  {
    //Read all available species
    for(var i = 0; i < this.species.length; i++)
    {
      //Save the specie
      var spe = this.species[i];

      //Check for short ald long name
      if(s === spe.species || s === spe.scientific || s === spe.common)
      {
        //Return the index
        return i;
      }
    }

    //Show error
    console.error('CellBaseAdapter: unknow specie "' + specie + '" for version ' + this.version);
    console.error('CellBaseAdapter: read about the CellBase species at "' + this.wiki + '"');

    //Generate the url for huma
    return 0;
  };

  //Generate the url for import genes
  this.UrlGenes = function(specie)
  {
    //Find the specie
    this.index = this.FindSpecie(specie);

    //Get the url
    var url = this._url(this.version, this.index, 'gene');

    //Return the url
    return url;
  };

  //Generate the url for import exons
  this.UrlExons = function(specie)
  {
    //Find the specie
    this.index = this.FindSpecie(specie);

    //Get the url
    var url = this._url(this.version, this.index, 'exon');

    //Return the url
    return url;
  };

  //Generate the url
  this._url = function(v, s, f)
  {
    //Generate the new url
    var url = this.base;

    //Replace strings
    url = url.replace('{version}', v); //Replace the version
    url = url.replace('{specie}', this.species[s].species); //Replace the specie
    url = url.replace('{feature}', f); //Replace the feature

    //Return the url
    return url;
  };

  //CoverViewer Cellbase data adapter for genes
  this.ParseGenes = function(d)
  {
    //Generate the new object
    var obj = {};

    //Add the specie
    obj.specie = this.species[this.index].scientific;

    //Add the assembly
    obj.assembly = this.species[this.index].assembly;

    //Genes
    obj.genes = [];

    //Insert all genes
    for(var i = 0; i < d[0].length; i++)
    {
      //Get the gene
      var g = d[0][i];

      //Save the gene name
      g.name = g.externalName;

      //Save the ensembl ID
      g.ensemblId = g.stableId;

      //Insert to the genes list
      obj.genes.push(g);
    }

    //Return the new object
    return obj;
  };

  //CoverViewer Cellbase data adapter for exons
  this.ParseExons = function(d)
  {
    //Generate the new array with the exons
    var ex = [];

    //Read all the exons
    for(var i = 0; i < d[0].length; i++)
    {
      //Generate the new object
      var obj = {};

      //Save the ensembl ID
      obj.id = d[0][i].stableId;

      //Save the chromosome
      obj.chromosome = d[0][i].chromosome;

      //Save the start
      obj.start = d[0][i].start;

      //Save the end
      obj.end = d[0][i].end;

      //Save the strand
      obj.strand = d[0][i].strand;

      //Insert to the exons list
      ex.push(obj);
    }

    //Return the new array with the exons
    return ex;
  };
};
