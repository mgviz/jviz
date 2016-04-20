//jvizRegion
var jvizRegion = {};

//jvizRegion Check
jvizRegion.Check = function(r)
{
  //Check for chromosome
  if(typeof r.chromosome === 'undefined'){ return false; }

  //Check the start
  if(typeof r.start === 'undefined'){ return false; }

  //Check the end
  if(typeof r.end === 'undefined'){ return false; }

  //All OK
  return true;
};

//jvizRegion Split
jvizRegion.Split = function(region)
{
  //Output
  var out = {};

  //Split by :
  var split = region.split(':');

  //Save the chromosome
  out.chromosome = split[0];

  //Get the region
  var re = split[1].split('-');

  //Save the start
  out.start = parseInt(re[0]);

  //Save the end
  out.end = parseInt((re.length > 1)? re[1] : re[0]);

  //Return
  return out;
};

//jvizRegion Join
jvizRegion.Join = function(r)
{
  //Check the object
  if(jvizRegion.Check(r) === false){ return ''; }

  //Join the region
  return r.chromosome + ':' + r.start + '-' + r.end;
};
