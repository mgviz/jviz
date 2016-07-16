//Format number
//Found in http://stackoverflow.com/a/2254896/2328955
jviz.math.formatNumber = function(num, sep)
{
	//Check the separator
	if(typeof sep === 'undefined'){ var sep = ','; }

	//Return the formatted number
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + sep);
};
