TweetCount.prototype = new EventDispatcher();
TweetCount.constructor = TweetCount;

function TweetCount() 
{
	var self		 = this;
	var element 	 = $('#loadmore');
	var countElement = $('#loadmore-count');
	var glow 		 = $('#loadmore-glow');
	var count		 = 0;
	var showing		 = false;
	
	this.update		= update;
	
	element.click(onClick);
	element.hide();
	
	
	function onClick()
	{
		element.hide();
		dispatchEvent('onLoadMoreTweets', self);
	}
	
	
	function setCount(n)
	{
		count = n;
		var countText = (count == 1) ? "Tweet" : "Tweets";
		countElement.text(String(count)+' new '+countText);
	};
	
	function show()
	{
		element.fadeIn(500);
		showing = true;
	};
	
	
	function hide()
	{
		element.fadeOut(2000);
		showing = false;
	};
	
	function update( n )
	{
		if(n < 0) n = 0;
		setCount(n);
		
		if(n <= 0 && showing)
		{
			hide();
		}
		
		if( n > 0 && !showing)
		{
			show();
		}
	}
	
	return this;
};
