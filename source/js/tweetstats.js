TweetStats.prototype 	= new EventDispatcher();
TweetStats.constructor 	= TweetStats;

function TweetStats() 
{
	var self				= this;
	var totalCount 	 		= $('#total-tweets');
	var tweetsPerSec 		= $('#total-tweets-second');
	var rendered			= false;
	this.totalTweets	 	= 0;
	this.totalTweetsPerSec 	= 0;
	this.toString			= toString;
	this.init				= init;
	
	tweetsPerSec.text('loading');
	totalCount.text('loading');
	
	
	function init()
	{
		setTotalTweets(this.totalTweets);
		setTimeout(setTweetsPerSec, 1000, [this.totalTweetsPerSec]);
	}
	
	function setTotalTweets(n)
	{
		totalTweets = n; 
		totalCount.text(Utils.addCommas(n));
		var tween = new TWEEN.Tween(self)
		.onUpdate(updateTotal)
		.to({totalTweets:3000}, 2000)
		.start();
		setInterval(TWEEN.update, 1000/31);
	};
	
	function setTweetsPerSec(n)
	{
		var tween = new TWEEN.Tween(self)
		.onUpdate(updateTweetsPerSec)
		.onComplete( onComplete ) 
		.to({totalTweetsPerSec:250}, 2000)
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
	
	
	function onComplete()
	{
		if(rendered) return;
		dispatchEvent( 'onStatsLoaded' , self);
		rendered = true;
	}
	
	
	function toString() { return 'TweetSats'; };
	
	return this;
};
