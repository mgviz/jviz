//Function for clone an object
function jvizClone(obj)
{
	//Convert the object to string
	var o = JSON.stringify(obj);

	//Convert again to json
	o = JSON.parse(o);

	//Return the object
	return o;
}
