MostMentionedNominees.prototype = new EventDispatcher();
MostMentionedNominees.constructor = MostMentionedNominees;

function MostMentionedNominees( server ) 
{
	var self 		= this;
	var rendered 	= false;
	var model		= new TRModel( 'http://tweetriver.com/massrelevance.json' );
	var streams;
	
	var oStreams 	= [
					   {name: 'Javier Bardem', stream : 'oscars-actor-bardem'},
		        	   {name: 'Jeff Bridges', stream : 'oscars-actor-bridges'},
		        	   {name: 'Jesse Eisenberg', stream : 'oscars-actor-eisenberg'},
		        	   {name: 'Colin Firth', stream : 'oscars-actor-firth'},
		        	   {name: 'James Franco', stream : 'oscars-actor-franco'},
		        	   
		        	   {name: 'Annette Bening', stream : 'oscars-actress-bening'},
		        	   {name: 'Nicole Kidman', stream : 'oscars-actress-kidman'},
		        	   {name: 'Jennifer Lawrence', stream : 'oscars-actress-lawrence'},
		        	   {name: 'Natalie Portman', stream : 'oscars-actress-portman'},
		        	   {name: 'Michelle Williams', stream : 'oscars-actress-williams'},
		        	   
		        	   {name: 'Christian Bale', stream : 'oscars-supportingactor-christianbale'},
		        	   {name: 'Jeremy Renner', stream : 'oscars-supportingactor-jeremyrenner'},
		        	   {name: 'John Hawkes', stream : 'oscars-supportingactor-johnhawkes'},
		        	   {name: 'Mark Ruffalo', stream : 'oscars-supportingactor-ruffalo'},
		        	   {name: 'Geoffrey Rush', stream : 'oscars-supportingactor-rush'},
		        	   
		        	   {name: 'Amy Adams', stream : 'oscars-supportingactress-amyadams'},
		        	   {name: 'Hailee Steinfeld', stream : 'oscars-supportingactress-haileesteinfeld'},
		        	   {name: 'Helena Bonham Carter', stream : 'oscars-supportingactress-helenacarter'},
		        	   {name: 'Jacki Weaver', stream : 'oscars-supportingactress-jackiweaver'},
		        	   {name: 'Melissa Leo', stream : 'oscars-supportingactress-melissaleo'},
		        	   
		        	   {name: 'Darren Aronofsky', stream : 'oscars-directing-aronofsky'},
		        	   {name: 'Coen Brothers', stream : 'oscars-directing-coen'},
		        	   {name: 'David Fincher', stream : 'oscars-directing-fincher'},
		        	   {name: 'Tom Hooper', stream : 'oscars-directing-hooper'},
		        	   {name: 'David Russell', stream : 'oscars-directing-russell'}
					];
					
	this.load 		= load;
	this.toString   = toString;

	function load()
	{
		if(!rendered)
		{
			model.addEventListener("onDataChange", dataChanged);
			model.load(  null , 'jsonp' );
			rendered = true;
		}
	};
	
	
	function poll()
	{
		
		if(!rendered)
		{
			model.addEventListener("onDataChange", dataChanged);
			model.load(  null , 'jsonp' );
			rendered = true;
		}
	};
	
	
	function dataChanged( e )
	{
		var streams;
		
		dispatchEvent('onMostMentionedLoaded', self);
		
		streams = getStreams(e.target.getData().streams);
		renderStreams(streams);
	}
	
	
	function renderStreams( streams )
	{	
		var i;
		var stream;
		
		Log('total streams: '+streams.length)
		streams.sort(sortNumber);
		
		for(var i in streams)
		{
			stream = streams[i];
			Log(stream.nomineeName+' = '+stream.count.total);
		}
	}
	
	
	function getStreams( streams )
	{
		var total = streams.length - 1;
		var stream;
		var name;
		var i = 0;
		var matchedStreams	= new Array();
		
		for(i; i<= total; i++)
		{
			stream = streams[i];
			if(matchStream( stream )) matchedStreams.push(stream);
		}

		return matchedStreams;
	}
	
	
	function matchStream( stream )
	{
		var i;
		var name = stream.name;
		
		for(i in oStreams)
		{
			if( oStreams[i].stream == name) 
			{
				stream.nomineeName = oStreams[i].name;
				return true;
			}
		}
		
		return false;
	}
	
	
	function sortNumber(a,b)
	{
		return a - b;
	}
		
	
	function toString()
	{
	 	return "most nominated list";
	}
	
	
	return this;
};

function results( e )
{
	Log('got results');
}