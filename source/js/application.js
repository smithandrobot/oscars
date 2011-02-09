$(document).ready(function() {
	var a = new Application();
});

function Application()
{
	var server 		   = 'http://tr-cache-2.appspot.com/massrelevance/';
	var mainTweetLists = new TweetListController( server );
}