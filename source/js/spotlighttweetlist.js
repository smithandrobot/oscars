// inherits from
SpotlightTweetList.prototype = new EventDispatcher();
SpotlightTweetList.constructor = SpotlightTweetList;

function SpotlightTweetList( server )
{
	var self	  		= this;
	var model 	  		= new TRModel(server + 'promoted.json');
	var tweets	  		= new Array();
	var rendered  		= false;
	var tweetIndex 		= 0;
	var lastTweet 		= null;
	var element  		= $('#spotlight-tweet-container');

	this.next 	  	= next;
	this.previous 	= previous;
	this.toString 	= toString;
	this.load	  	= load;
	this.controls;
	
	element.empty();
	
	
	function load()
	{
		model.addEventListener("onDataChange", onDataChanged);
		model.load();
	};
	
	
	function show( dir )
	{
		var tweet;
		var offsetEnd = (dir == "next") ? -10 : 10;
		var offsetBegin = (dir == "next") ? 10 : -10;
		
		if(lastTweet) 
		{
			lastTweet.stop().animate({opacity:0, left:offsetEnd}, { duration:200 , complete: function(){ $(this).detach(); } });
		}
		
		tweet = tweets[tweetIndex].html;
		tweet.css('top', 0);
		tweet.css('opacity', 0);
		tweet.css('position', 'absolute');
		tweet.css('left', offsetBegin);
		element.append(tweet);
		tweet.stop().animate({opacity:1, left:0}, { duration:200, complete: function(){ /*$(this).css('filter', '');}*/ } });

		
		lastTweet = tweet;
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
		var data  = e.target.getData();
		var i 	  = 0;
		var total = data.length-1;
		var t;
		var html  = '';
		var tweetObj;
		var id;
		
		Log('onDataChanged: '+self+' total: '+total);
		
		for(i;i<=total;i++)	
		{
			t = new Tweet();
			id = 'spotlight-'+t.tweetID;
			t.setData(data[i]);
			tweets.push({tweet:t, id:id, html: t.getHTML()});
		};
		
		show(tweetIndex);
		dispatchEvent('onSpotlightTweetsLoaded', self);
	}
	
	
	function toString() { return "SpotlightTweetList"; };
	
	return this;

};
