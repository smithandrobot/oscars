function TweetStats() 
{
	var self				= this;
	var totalCount 	 		= $('#total-tweets');
	var tweetsPerSec 		= $('#total-tweets-second');
	this.totalTweets	 	= 0;
	this.totalTweetsPerSec 	= 0;
	this.toString			= toString;
	
	setTotalTweets(this.totalTweets);
	setTweetsPerSec(this.totalTweetsPerSec);
	
	function setTotalTweets(n)
	{
		totalTweets = n; 
		totalCount.text(Utils.addCommas(n));
		var tween = new TWEEN.Tween(self)
		.onUpdate(updateTotal)
		.to({totalTweets:3000}, 4000)
		.start();
		setInterval(TWEEN.update, 1000/31);
	};
	
	function setTweetsPerSec(n)
	{
		var tween = new TWEEN.Tween(self)
		.onUpdate(updateTweetsPerSec)
		.to({totalTweetsPerSec:250}, 4000)
		.start();
		setInterval(TWEEN.update, 1000/31);
	};
	
	
	function updateTotal()
	{
		totalCount.text(Utils.addCommas(Math.round(self.totalTweets)));
	}
	
	function updateTweetsPerSec()
	{
		tweetsPerSec.text(Utils.addCommas(Math.round(self.totalTweetsPerSec)));
	}
	
	

	
	
	function toString() { return 'TweetSats'; };
	
	return this;
};
