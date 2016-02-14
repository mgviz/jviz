//jvizTrack set track title
jvizTrack.prototype.SetTitle = function(title, subtitle)
{
	//Add the title
	var text = title;

	//Check for the subtitle
	if(typeof subtitle !== 'undefined')
	{
		text = text + ' <span class="' + this.head.title.subtitle.class + '">' + subtitle + '</span>';
	}

	//Show the title
	$('#' + this.head.title.id).html(text);
};
