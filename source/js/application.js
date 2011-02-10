$(document).ready(function() {
	var a = new Application();
});

function Application()
{
	// var server 		   = 'http://tr-cache-2.appspot.com/massrelevance/';
	var server 		   = 'http://tr-cache-2.appspot.com/smithandrobot/';
	var mainTweetLists = new TweetListController( server );
	var filterNav	   = new FilterNav();
	var tweetStats     = new TweetStats();
	
	filterNav.addEventListener('onFilterChange', onFilterChange);
	
	function onFilterChange( e )
	{
		var filter = e.target.filter.split('filter-')[1];
		mainTweetLists.select(filter);
	};
};