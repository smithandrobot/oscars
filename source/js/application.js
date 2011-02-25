$(document).ready(function() {
	var a = new Application();
});

function Application()
{
	// twttr.anywhere.config({ callbackURL: "http://twitter.smithandrobot.com/tapp_callback.html" });
	var server 		   = 'http://tr-cache-2.appspot.com/massrelevance/';
	//var server 		   	= 'http://tr-cache-2.appspot.com/smithandrobot/';
	var mainTweetLists 	= new TweetListController( server );
	var tweetPhotos	   	= new TweetPhotoList( server );
	var filterNav	   	= new FilterNav();
	var spotlightTweets	= new SpotlightTweetList( server );
	var spotlightNav   	= new SpotlightControls();
	var tweetStats     	= new TweetStats();
	var mostMentioned	= new MostMentionedNominees( server );
	var tweetBox		= $('#tbox');
	
	this.toString	   	= toString;
	
	//tweetBox.fadeOut(50);
	
	filterNav.addEventListener('onFilterChange', onFilterChange);	
	tweetStats.addEventListener('onStatsLoaded', onStatsLoaded);
	mainTweetLists.addEventListener('onExpertListRendered', onExpertListRendered);
	mostMentioned.addEventListener('onMostMentionedLoaded', onMostMentionedRendered);	
	spotlightNav.addEventListener('onNextSpotlightTweet', onNextSpotlightTweet);
	spotlightNav.addEventListener('onPreviousSpotlightTweet', onPreviousSpotlightTweet);	
	tweetPhotos.addEventListener('tweetPhotoListLoaded', onPhotosLoaded);	
	spotlightTweets.addEventListener('onSpotlightTweetsLoaded', onSpotlightTweetsLoaded);
	spotlightTweets.controls = spotlightNav;
	
	spotlightTweets.load();



	
	function onFilterChange( e )
	{
		var filter = e.target.filter.split('filter-')[1];
		mainTweetLists.select(filter);
	};
	
	
	/* 
		LOADING SEQUENCE 
		1. onSpotlightTweetsLoaded
		2. onStatsLoaded
		3. onMostMentionedRendered
		4. onExpertListRendered -> MAKES LAST CALL TO LOAD MAIN TWEET LIST
	*/
	
	
	function onPhotosLoaded( e )
	{
		mainTweetLists.loadExpertList();
	}
	
	function onSpotlightTweetsLoaded( e )
	{
		tweetStats.init()
	}
	
	function onStatsLoaded( e )
	{
		mostMentioned.load();
	}
	
	function onExpertListRendered( e )
	{
		filterNav.show();
		mainTweetLists.load();
	}
	
	function onMostMentionedRendered( e )
	{
		tweetPhotos.load();
	}
	
	
	function onNextSpotlightTweet( e )
	{
		spotlightTweets.next();
	}
	
	
	function onPreviousSpotlightTweet( e )
	{
		spotlightTweets.previous();
	}
	
	
	
	
	function toString() { return "Application"; };
};