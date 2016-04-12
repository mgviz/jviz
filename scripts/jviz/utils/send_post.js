//Send post data to a url and redirect
function jvizSendPOST(url, args)
{
	//Function inspirated in http://stackoverflow.com/a/23347763
	//Example of use:
	//jvizSendPOST('http://your.url/destination', { key1: 'value1', key2: 'value2' });

	//Initialize the form
	var div = '';

	//Check the arguments
	for(var key in args)
	{
		//Get the value
		var value = args[key];

		//Check the value type
		if(typeof value === 'object')
		{
			//Convert to string
			value = JSON.stringify(value);
		}

		//Create a new input value
		div = div + '<input type="hidden" name="' + key + '" value="' + value + '">';
	}

	//Append to the body and send
	$('<form action="' + url + '" method="POST">' + div + '</form>').appendTo($(document.body)).submit();
}
