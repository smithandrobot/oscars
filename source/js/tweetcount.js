function TweetCount() 
{
	var self	= this;
	var element = $('#loadmore-count');
	var count	= 0;

	this.setCount = setCount;
	
	function setCount(n)
	{
		count = n;
		var countText = (count == 1) ? "Tweet" : "Tweets";
		element.text(String(count)+' new '+countText);
	};
	
	
	return this;
};
