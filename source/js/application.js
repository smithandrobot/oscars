$(document).ready(function() {
	var a = new Application();
});

function Application()
{
	// var server 		   = 'http://tr-cache-2.appspot.com/massrelevance/';
	var server 		   = 'http://tr-cache-2.appspot.com/smithandrobot/';
	var mainTweetLists = new TweetListController( server );
	var tweetPhotos	   = new TweetPhotoList( 'http://tr-cache-2.appspot.com/smithandrobot/photos.json' );
	var filterNav	   = new FilterNav();
	var tweetStats     = new TweetStats();
	this.toString	   = toString;
	
	filterNav.addEventListener('onFilterChange', onFilterChange);
	
	tweetPhotos.addEventListener('tweetPhotoListLoaded', onPhotosLoaded);
	tweetPhotos.load();
	twttr.anywhere.config({ callbackURL: "http://www.smithandrobot.com/tapp/" });
	
	function onFilterChange( e )
	{
		var filter = e.target.filter.split('filter-')[1];
		mainTweetLists.select(filter);
	};
	
	function onPhotosLoaded( e )
	{
		Log('photos loaded - '+toString());
	}
	
	
	function toString() { return "Application"; };
};