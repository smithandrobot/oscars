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
	var stream			= URL;
	
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
		// if(self.id != 'expertList') Log('lastid: '+URL+'=?since_id='+lastID)
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
			tweetObj.stop().delay(delay*i).animate( {opacity:1, top:0}, { duration:500, complete: function(){ $(this).css('filter', '');} } );
			self.element.append(tweetObj);
		};

		if(self.id != "expertList") self.element.insertAfter('#loadmore');
		if(self.id == "expertList") $('#viewer-timeline').append(self.element);
		
		if(self.element) self.element.fadeIn(250, null, function(){dispatchEvent("onShowing", self);});
		
		active = true;
		
		clearTimeout(timeout);
		setTimeout(poll, INTERVAL);
		
		// addd scrollbar initialization code here
		
		if(self.id != "expertList") $('.css-scrollbar').scrollbar();
		if(self.id == "expertList") $('.css-scrollbar-2').scrollbar();
		
		if(self.id == "expertList" && rendered == false)
		{
			dispatchEvent('expertListRendered', self)
		}
	};
	
	
	function hide()
	{
		clearTimeout(timeout);
		active = false;
		
		if(self.element) self.element.fadeOut(250, null, 
			function()
			{ 
				//$(".qtip").remove();
				self.element.detach();
				clearMainScrollBar();
				dispatchEvent("onHidden", self);
			});
	};
	
	
	function clearMainScrollBar()
	{
		if(self.id != "expertList") 
		{
			var l = $('#loadmore').detach();
			$("#timeline .scrollbar-pane").remove();
			$("#timeline .scrollbar-handle-container").remove();
			$("#timeline .scrollbar-handle-up").remove();
			$("#timeline .scrollbar-handle-down").remove();
			$("#timeline").prepend(l);
		}
	}


	function writeList( e )
	{
		var data  = e.target.getData();
		var i 	  = 0;
		var total = data.length-1;
		var t;
		
		for(i;i<=total;i++)	
		{
			t = new Tweet();
			t.setData(data[i]);
			tweets.push({tweet:t, id:i})
		};
		
		dispatchEvent('tweetListLoaded', self);
		
		lastID = data[0].order_id;	
		rendered = true;
	}
	
	
	
	function pollList( e )
	{
		if(!active && self.id != 'expertList') 
		{
			clearTimeout(timeout);
			return;
		}
		
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
			self.unreadTweets = 0;//data.length;
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
		
		// don't dispatch if it's the exper list (lower right of page)
		if(self.id != 'expertList') dispatchEvent('onUnreadTweets', self);
		
		// update expert list without notifying application
		if(self.id == 'expertList') updateList();
		
	}
	
	
	function updateList()
	{

		clearTimeout(timeout);
		active = false;
		
		var i		= 0;
		var total 	= newTweets.length - 1;
		
		lastID = newTweets[0].tweet.orderID;
		newTweets.reverse();
		
		if(self.id != "expertList") clearMainScrollBar();
		
		if(self.id != "expertList") self.element.insertAfter('#loadmore');
		
		for(i;i<=total;i++)	
		{
			tweet 	 = newTweets[i].tweet;
			tweetObj = tweet.getHTML();
			tweetObj.animate({opacity:1, top:0}, { duration:500, complete: function(){ $(this).css('filter', '');} });
			self.element.prepend(tweetObj);
			tweets.unshift({tweet:tweet, id:i})
		};

		
		// reset scrollbar for main time line
		if(self.id != "expertList") $('.css-scrollbar').scrollbar();
		
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