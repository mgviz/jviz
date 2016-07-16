//jviz.utils.region
jviz.utils.region = {};

//Region parse
jviz.utils.region.parse = function(region)
{
  //Output
  var out = { chromosome: '', start: 0, end: 0, length: 1, strand: '+' };

  //Split by :
  var split = region.split(':');

  //Check the split length
  if(split.length === 0){ return out; }

  //Save the chromosome
  out.chromosome = split[0];

  //Check the split length
  if(split.length < 2){ return out; }

  //Get the region
  var re = split[1].split('-');

  //Save the start
  out.start = parseInt(re[0]);

  //Save the end
  out.end = parseInt((re.length > 1)? re[1] : re[0]);

  //Calculate the region length
  out.length = Math.abs(out.end - out.start) + 1;

  //Check for the strand
  if(split.length < 3){ return out; }

  //Add the strand
  out.strand = (split[2] === '-' || split[2] === '-1' || split[2] === 'reverse') ? '-' : '+';

  //Return
  return out;
};

//Region Join
jviz.utils.region.toString = function(region, addStrand)
{
  //Check for adding the strand
  if(typeof addStrand === 'undefined'){ var addStrand = false; }

  //Check for chromosome
  if(typeof region.chromosome === 'undefined'){ return ''; }

  //Check the start
  if(typeof region.start === 'undefined'){ return ''; }

  //Check the end
  if(typeof region.end === 'undefined'){ return ''; }

  //Check for add the strand
  var str = (addStrand === true) ? ((region.strand === '-') ? ':-1' : ':1') : '';

  //Join the region
  return region.chromosome + ':' + region.start + '-' + region.end + str;
};
