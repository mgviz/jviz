//jviz Download file
//Extracted from http://stackoverflow.com/a/18197341/2328955
function jvizDownloadFile(name, content)
{
	//Enconde the content
	content = encodeURIComponent(content);

	//Create the new link element
	var a = document.createElement('a');

	//Set href attribute
	a.setAttribute('href', 'data:text/plain;charset=utf-8,' + content);

	//Set the download attribute
	a.setAttribute('download', name);

	//Set the link style
	a.style.display = 'none';

	//Add the new link
	document.body.appendChild(a);

	//Click on the element
	a.click();

	//Remove the link
	document.body.removeChild(a);
}
