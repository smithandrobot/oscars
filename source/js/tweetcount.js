function TweetCount() 
{
	var self		 = this;
	var element 	 = $('#loadmore');
	var countElement = $('#loadmore-count');
	var glow 		 = $('#loadmore-glow');
	var count		 = 0;

	this.setCount 	= setCount;
	this.hide 		= hide;
	this.show 		= show;
	
	element.hide();
	
	function setCount(n)
	{
		count = n;
		var countText = (count == 1) ? "Tweet" : "Tweets";
		countElement.text(String(count)+' new '+countText);
	};
	
	function show()
	{
		element.fadeIn(500);
	};
	
	
	function hide()
	{
		element.fadeOut(2000);
	};
	
	return this;
};
