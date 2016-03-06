//jviz Feature position
function jvizFeaturePosition(feaature, draw)
{
	//Create the new object
	var obj = {};

	//Calculate the start position
	obj.start = draw.margin.left + Math.max(feature.start - draw.start, 0)*draw.scale;

	//Calculate the end position
	obj.end = draw.margin.left + (Math.min(feature.end, draw.end) - draw.start)*draw.scale;

	//Calculate the length
	obj.length = Math.max(1, obj.end - obj.start);

	//return the new object
	return obj;
}
