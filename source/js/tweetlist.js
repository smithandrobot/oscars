TweetList.prototype = new EventDispatcher();
TweetList.constructor = TweetList;

function TweetList(URL)
{
	var INTERVAL		= 1000*5;
	
	var self	  		= this;
	var model 	  		= new TRModel(URL);
	var tweets	  		= new Array();
	var newTweets	  	= null;
	var rendered  		= false;
	var timeout   		= null;
	var lastID	  		= null;
	var active	  		= false;
	
	this.updateList		= false;
	this.element  		= null;
	this.show 	  		= show;
	this.hide 	  		= hide;
	this.id		  		= URL;
	this.show	  		= show;
	this.toString 		= toString;
	this.load	  		= load;
	this.unreadTweets	= 0;
	this.updateList		= updateList;
	
	function load()
	{
		model.addEventListener("onDataChange", dataChanged);
		model.load();
	};
	
	
	function poll()
	{	
		model.poll(lastID);
	}
	
	
	function dataChanged(e)
	{

		if(!rendered)
		{
			 writeList( e );
		}else{
			pollList( e );	
		}
	};
	
	
	function show()
	{
		var html ='';
		var tweet;
		var total = tweets.length - 1;
		var delay = 300;
		var tweetObj;
		var i = 0;
		
		self.element.html('');
		
		for(i;i<=total;i++)	
		{
			tweet 	 = tweets[i].tweet;
			tweetObj = tweet.getHTML();
			tweetObj.stop().delay(delay*i).animate({opacity:1, top:0}, { duration:500, complete: function(){ $(this).css('filter', '');} });
			//tweetObj.delay(i*delay).fadeIn(250);
			self.element.append(tweetObj);
		};

		if(self.id != "viewerList") self.element.insertAfter('#loadmore');
		if(self.id == "viewerList") $('#viewer-timeline').append(self.element);
		
		if(self.element) self.element.fadeIn(250, null, function(){dispatchEvent("onShowing", self);});
		
		active = true;
		
		clearTimeout(timeout);
		setTimeout(poll, INTERVAL);
	};
	
	
	function hide()
	{
		clearTimeout(timeout);
		active = false;
		
		if(self.element) self.element.fadeOut(250, null, 
			function()
			{ 
				$(".qtip").remove();
				self.element.detach();
				dispatchEvent("onHidden", self);
			});
	};


	function writeList( e )
	{
		var data  = e.target.getData();
		var i 	  = 0;
		var total = data.length-1;
		var t;
		
		if(self.id != 'viewerList')
		{
			Log('writeList for '+self.id);
		}
		
		for(i;i<=total;i++)	
		{
			t = new Tweet();
			if(self.id == "viewerList") t.type = "viewer";
			t.setData(data[i]);
			tweets.push({tweet:t, id:i})
		};
		
		dispatchEvent('tweetListLoaded', self);
		
		lastID = data[0].order_id;	
		rendered = true;
	}
	
	
	
	function pollList( e )
	{
		if(!active) return;
		
		var data  = e.target.getData();
		var i 	  = 0;
		var total = data.length-1;
		var t;
		var html  = '';
		var tweetObj;
		var id;
		
		if(data.length-1 < 0) 
		{
			clearTimeout(timeout);
			timeout = setTimeout(poll, INTERVAL);
			self.unreadTweets = 0//data.length;
			dispatchEvent('onUnreadTweets', self)
			return false;
		}
		
		newTweets = new Array();
		
		for(i;i<=total;i++)	
		{
			t = new Tweet();
			if(self.id == "viewerList") t.type = "viewer";
			t.setData(data[i]);
			newTweets.push({tweet:t, id:i})
		};
		
		clearTimeout(timeout);
		setTimeout(poll, INTERVAL);
		self.unreadTweets = data.length;
		dispatchEvent('onUnreadTweets', self)
	}
	
	
	function updateList()
	{

		clearTimeout(timeout);
		active = false;
		
		var i		= 0;
		var total 	= newTweets.length - 1;
		
		lastID = newTweets[0].tweet.orderID;
		newTweets.reverse();
		
		Log('updating '+self.id+' list');
		for(i;i<=total;i++)	
		{
			tweet 	 = newTweets[i].tweet;
			tweetObj = tweet.getHTML();
			tweetObj.animate({opacity:1, top:0}, { duration:500, complete: function(){ $(this).css('filter', '');} });
			self.element.prepend(tweetObj);
		};

		
		clearTimeout(timeout);
		active = true;
		setTimeout(poll, INTERVAL);
	}
	
	
	function toString()
	{
		return "Tweetlist";
	};
	
	return this;
};