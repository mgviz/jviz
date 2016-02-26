//jvizTable Parse Style
jvizTable.prototype.ParseStyle = function(s)
{
	//Style output
	var style = '';

	//Read all the keys
	for(var key in s)
	{
		//Add the style
		style = style + key + ':' + s[key] + ';';
	}

	//Return the style
	return style;
};
