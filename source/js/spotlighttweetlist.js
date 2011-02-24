// inherits from
SpotlightTweetList.prototype = new EventDispatcher();
SpotlightTweetList.constructor = SpotlightTweetList;

function SpotlightTweetList( server )
{
	var INTERVAL	= 1000*5;
	
	var self	  		= this;
	var model 	  		= new TRModel('http://tr-cache-2.appspot.com/massrelevance/oscars-spotlight.json');
	// var model 	  		= new TRModel(server + 'oscars-spotlight.json');
	var tweets	  		= new Array();
	var rendered  		= false;
	var tweetIndex 		= 0;
	var lastTweet 		= null;
	var element  		= $('#spotlight-tweet-container');
	var timeout 		= null;
	var lastID			= null;
	
	this.next 	  		= next;
	this.previous 		= previous;
	this.toString 		= toString;
	this.load	  		= load;
	this.controls;
	
	//element.empty();
	
	
	function load()
	{
		model.addEventListener("onDataChange", onDataChanged);
		model.load();
	};
	
	
	function poll()
	{
		model.poll(lastID);
	};
	
	
	function show( dir )
	{
		var tweet;
		var offsetEnd = (dir == "next") ? -10 : 10;
		var offsetBegin = (dir == "next") ? 10 : -10;
		
		if(lastTweet) 
		{
			lastTweet.stop().animate({opacity:0, left:offsetEnd}, { duration:500 , complete: function(){ $(this).detach(); } });
		}
		
		tweet = tweets[tweetIndex].html;
		tweet.css('top', 0);
		tweet.css('opacity', 0);
		tweet.css('position', 'absolute');
		tweet.css('left', offsetBegin);
		element.append(tweet);
		tweet.stop().animate({opacity:1, left:0}, { duration:500, complete: function(){ /*$(this).css('filter', '');}*/ } });

		
		lastTweet = tweet;
		element.find('.please-wait').empty();
	};
	

	function next()
	{
		++tweetIndex;
		
		if(tweetIndex > tweets.length-1) 
		{
			tweetIndex = tweets.length-1;
			return;
		}
		
		if(tweetIndex == tweets.length-1) 
		{
			self.controls.enableNext(false);
			self.controls.enablePrev(true);
		}
		if(tweetIndex < tweets.length-1) 
		{
			self.controls.enableNext(true);
			if(tweetIndex > 0) self.controls.enablePrev(true);
		}
		
		show( "next");
	}
	
	
	function previous()
	{
		--tweetIndex;
		if(tweetIndex < 0) 
		{
			tweetIndex = 0;
			return;
		}
		
		if(tweetIndex < 1) 
		{
			self.controls.enablePrev(false);
			self.controls.enableNext(true);
		}
		if(tweetIndex > 1) 
		{
			self.controls.enablePrev(true);
			if(tweetIndex < tweets.length - 1) self.controls.enableNext(true);
		}
		
		show( "previous" );
	}
	
	
	function onDataChanged( e )
	{
		if(!rendered) 
		{
			writeList( e );
		}else{
			updateList( e );	
		}
	}
	
	
	function updateList( e )
	{
		var data  = e.target.getData();
		var i 	  = 0;
		var total = data.length-1;
		var t;
		var html  = '';
		var tweetObj;
		var id;
		
		Log('update spotlight: '+total)
		if(data.length-1 < 0) 
		{
			clearTimeout(timeout);
			timeout = setTimeout(poll, INTERVAL);
			return false;
		}
		
		lastID = data[0].order_id;
		data.reverse();
		
		for(i;i<=total;i++)	
		{
			t = new Tweet();
			id = 'spotlight-'+t.tweetID;
			t.setData(data[i]);
			tweets.unshift({tweet:t, id:id, html: t.getHTML()});
		};
		
		tweetIndex = 0;		
		self.controls.enablePrev(false);

		show(tweetIndex);
		
		clearTimeout(timeout);
		setTimeout(poll, INTERVAL);
	}
	
	
	function writeList( e )
	{
		var data  = e.target.getData();
		var i 	  = 0;
		var total = data.length-1;
		var t;
		var html  = '';
		var tweetObj;
		var id;
		Log('spotlight tweet total: '+total);
		
		for(i;i<=total;i++)	
		{
			Log('spotlight tweet: '+i);
			t = new Tweet();
			id = 'spotlight-'+t.tweetID;
			t.setData(data[i]);
			tweets.push({tweet:t, id:id, html: t.getHTML()});
		};
		
		if(tweetIndex < 1 ) self.controls.enablePrev(false);

		show(tweetIndex);
		dispatchEvent('onSpotlightTweetsLoaded', self);
		
		lastID = data[0].order_id;
		clearTimeout(timeout);
		setTimeout(poll, INTERVAL);
		
		rendered = true;
	}
	
	
	function toString() { return "SpotlightTweetList"; };
	
	return this;

};
