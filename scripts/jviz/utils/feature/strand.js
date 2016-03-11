//Check feature strand
function jvizFeatureStrand(s)
{
	//Check for undefined
	if(typeof s === 'undefined'){ return ''; }

	//Check for forward strand
	if(s === '+' || s === '1' || s === 1){ return '>'; }

	//Check for reverse strand
	if(s === '-' || s === '-1' || s === -1){ return '<'; }

	//Default, return empty
	return '';
}
