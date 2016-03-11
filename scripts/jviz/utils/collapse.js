//Function for collapse intervals
function jvizCollapse(intervals)
{
	//Sort the intervals
	intervals.sort(function(a, b){ return a.start - b.start; });

	//Collapsed
	var coll = [];

	//Read all the intervals
	for(var i = 0; i < intervals.length; i++)
	{
		//Get the interval
		var inter = intervals[i];

		//For check if the interval has been inserted
		var inserted = false;

		//Read the collapsed intervals
		for(var j = 0; j < coll.length; j++)
		{
			//Check the start
			if(inter.end < coll[j].start){ continue; }

			//Check the end
			if(inter.start > coll[j].end){ continue; }

			//Check for equals
			if(inter.start == coll[j].start && inter.end == coll[j].end){ continue; }

			//Update the start
			coll[j].start = Math.min(coll[j].start, inter.start);

			//Update the end
			coll[j].end = Math.max(coll[j].end, inter.end);

			//Update the ID
			if(typeof inter.id !== 'undefined' && typeof coll[j].id !== 'undefined')
			{
				//Update the ID
				coll[j].id = coll[j].id + ',' + inter.id;
			}

			//Set inserted as true
			inserted = true;
		}

		//Check for insert the interval
		if(inserted === false)
		{
			//Insert the interval
			coll.push(inter);
		}
	}

	//Return the collapsed intervals
	return coll;
}
