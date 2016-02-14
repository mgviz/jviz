//CoverViewer Region gen
CoverViewer.prototype.Region = function(reg)
{
  //Output
  var out = {};

  //Split by :
  var split = reg.split(':');

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
