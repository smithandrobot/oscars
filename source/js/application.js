$(document).ready(function() {
	var a = new Application();
});

function Application()
{
	twttr.anywhere.config({ callbackURL: "http://www.smithandrobot.com/tapp/" });
	// var server 		   = 'http://tr-cache-2.appspot.com/massrelevance/';
	var server 		   	= 'http://tr-cache-2.appspot.com/smithandrobot/';
	var mainTweetLists 	= new TweetListController( server );
	var tweetPhotos	   	= new TweetPhotoList( server );
	var filterNav	   	= new FilterNav();
	var spotlightTweets	= new SpotlightTweetList( server );
	var spotlightNav   	= new SpotlightControls();
	var tweetStats     	= new TweetStats();
	
	this.toString	   	= toString;
	
	filterNav.addEventListener('onFilterChange', onFilterChange);
	
	spotlightNav.addEventListener('onNextSpotlightTweet', onNextSpotlightTweet);
	spotlightNav.addEventListener('onPreviousSpotlightTweet', onPreviousSpotlightTweet);
	
	tweetPhotos.addEventListener('tweetPhotoListLoaded', onPhotosLoaded);
	
	spotlightTweets.addEventListener('onSpotlightTweetsLoaded', onSpotlightTweetsLoaded);
	spotlightTweets.load();


	
	function onFilterChange( e )
	{
		var filter = e.target.filter.split('filter-')[1];
		mainTweetLists.select(filter);
	};
	
	function onPhotosLoaded( e )
	{
		Log('photos loaded - '+toString());
	}
	
	function onSpotlightTweetsLoaded( e )
	{
		tweetPhotos.load();
	}
	
	
	function onNextSpotlightTweet( e )
	{
		Log('next spotlight tweet');
	}
	
	
	function onPreviousSpotlightTweet( e )
	{
		Log('previous spotlight tweet');
	}
	
	
	
	
	function toString() { return "Application"; };
};