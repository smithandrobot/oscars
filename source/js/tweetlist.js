TweetList.prototype = new EventDispatcher();
TweetList.constructor = TweetList;

function TweetList(URL)
{
	var self	  = this;
	var model 	  = new TRModel(URL);
	var tweets	  = new Array();
	var render	  = false;
	this.element  = null;
	this.show 	  = show;
	this.hide 	  = hide;
	this.id		  = URL;
	this.show	  = show;
	this.toString = toString;
	this.load	  = load;

	
	function load()
	{
		model.addEventListener("onDataChange", dataChanged);
		model.load();
	};
	
	
	function dataChanged(e)
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
	};
	
	
	function show()
	{
		var html ='';
		var tweet;
		var total = tweets.length - 1;
		
		for(i;i<=total;i++)	
		{
			tweet = tweets[i].tweet;
			html+= tweet.html;
		};
		
		self.element.html(html);
		decorate();
		self.element.insertAfter('#loadmore');

		if(self.element) self.element.fadeIn(250, null, function(){dispatchEvent("onShowing", self);});
	};
	
	
	function hide()
	{
		if(self.element) self.element.fadeOut(250, null, function(){self.element.detach();dispatchEvent("onHidden", self);});
	};

	
	function decorate()
	{
		self.element.find('.tweet .tweet-utility').fadeTo('fast', .2, null);
		
		self.element.find('.tweet').hover(
			function() { $('.tweet-utility', this).stop().fadeTo('slow', 1);},
			function() { $('.tweet-utility', this).stop().fadeTo('slow', .2);
		});
	}
	
	
	function toString()
	{
		return "Tweetlist";
	};
	
	return this;
};