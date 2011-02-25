MostMentionedNominees.prototype = new EventDispatcher();
MostMentionedNominees.constructor = MostMentionedNominees;

function MostMentionedNominees( server ) 
{
	var self 		= this;
	var rendered 	= false;
	var model		= new TRModel( 'http://tweetriver.com/massrelevance.json' );
	var streams;
	var element		= $('#nominees');
	var col1		= element.find('ol:first');
	var col2		= element.find('ol:first').next();
	
	clearSceenData();
	// Log('col1 text: '+col1.find('li:first').text());
	// Log('col2 text: '+col2.find('li:first').text());
	
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
		
		// dispatchEvent('onMostMentionedLoaded', self);
		
		streams = getStreams(e.target.getData().streams);
		renderStreams(streams);
	}
	
	
	function renderStreams( streams )
	{	
		var i;
		var stream;
		var delay = 500;
		var total = streams.length - 1;
		var fID;
		
		clearSceenData();
		streams.sort( sortNumber );
		renderFlips( streams );
	}
	
	
	function renderFlips( streams )
	{
		var delay = 500;
		for(i = 0; i<= 4; i++)
		{
			stream = streams[i];
			setTimeout(function(id){ return function() { animateFlipper(id); } }(i+1),  (delay*i) );
			setTimeout(function(id, name, total){ return function() { stopFlipper(id, name, total, streams); } }( (i+1),stream.nomineeName, Utils.addCommas(stream.count.approved), streams ), (delay*i)+delay+50);
		}	
	}
	
	
	function renderLists( streams )
	{
		var index = 4;
		
		col1.find('li').each(
		function()
		{
			var stream = streams[ ++index ];
			var a =  $(this).find('a')
			a.text(stream.nomineeName);
			a.attr('href', 'http://search.twitter.com/search?q=%23'+stream.nomineeName)
			$(this).find('span').text(Utils.addCommas(stream.count.approved));
		});
		
		col2.find('li').each(
		function()
		{
			var stream = streams[ ++index ];
			var a =  $(this).find('a')
			a.text(stream.nomineeName);
			a.attr('href', 'http://search.twitter.com/search?q=%23'+stream.nomineeName)
			
			$(this).find('span').text(Utils.addCommas(stream.count.approved));
		});
		
		dispatchEvent('onMostMentionedLoaded', self);
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
	
	
	function clearSceenData()
	{
		for(var i = 1 ; i<= 5; i++)
		{
			element.find('#number'+String(i)).find('.count').text('');
			element.find('#number'+String(i)).find('.name a').text('');
		}
		
		col1.find('li').each(clearLIData);
		col2.find('li').each(clearLIData);
	}
	
	
	function animateFlipper(id)
	{
		var flipper = element.find('#number'+String(id));
		flipper.find('.flip-fx img').css({display:'inline'});
	}
	
	
	function stopFlipper(id, name, total, streams)
	{
		var flipper = element.find('#number'+String(id));
		flipper.find('.name a').text(name);
		flipper.find('.name a').attr('href', 'http://search.twitter.com/search?q=%23'+name);
		flipper.find('.count').text(total);
		flipper.find('.flip-fx img').css({display:'none'});
		
		if(id == 5) renderLists( streams );
	}
	
	
	function clearLIData()
	{
		$(this).find('a').text('');
		$(this).find('span').text('');
	}
	
	
	function sortNumber(a,b)
	{
		return b.count.approved - a.count.approved;
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