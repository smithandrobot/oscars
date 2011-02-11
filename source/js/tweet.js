function Tweet()
{
	// Private
	
	var htmlText;
	var self = this;
	var verified;
	var screenName;
	var userName;
	var celebBadge = '<span class="badge-celebrity">Celeb</span>';
	var element;
	var rendered = false;
	var profileImg;
	
	//  Public
	
	this.tweetID;
	this.setData = setData;
	this.html;
	this.celeb = false;
	this.getHTML = getHTML;
	
	
	function setData(d)
	{
		htmlText 	 = TweetParser.parse(d.text);
		self.tweetID = d.id;
		verified 	 = d.user.verified;
		screenName 	 = d.user.screen_name;
		userName 	 = d.user.name;
		profileImg	 = d.user.profile_image_url;
		celebBadge	 = (self.celeb) ? celebBadge : '';
	};
	
	function getHTML()
	{
		if(element != undefined) element.empty();
		element = $(render());
		element.css({position:"relative"});
		element.css({opacity:0, top:-10});
		decorate(element);
		return element;
	}
	
	
	function onClickRetweet()
	{
		Log('over retweet - '+self.tweetID);
	}
	
	function onClickReply()
	{
		Log('reply - '+self.tweetID);
	}
	
	function onClickFollow()
	{
		Log('follow - '+self.tweetID);
	}	
	
	function onTweetOver() {e.find('.tweet-utility').fadeTo('fast', 1); };
	function onTweetOut() { e.find('.tweet-utility').fadeTo('fast', .2); };
	
	function render()
	{
		return'<div class="tweet">'+
			  '   <div class="tweet-bg">'+
			  '       <div class="tweet-profile-image">'+
			  '		      <a href="http://www.twitter.com/#!/'+screenName+'"><img src="'+profileImg+'" alt="'+userName+'" /></a>'+
			  ' 	  </div>'+
			  '       <div class="tweet-copy-block">'+
			  ' 	      <div class="tweet-name">'+
			  '	              <a class="tweet-name-screen" href="http://www.twitter.com/#!/'+screenName+'" title="'+userName+'">@'+screenName+'</a> <span class="tweet-name-full">'+userName+'</span>'+celebBadge+'<a href="#null" class="expert-bio">Bio</a>'+
			  '           </div>'+
			  ' 	      <div class="tweet-text">'+
			  '	              '+htmlText+''+
			  '	          </div>'+
			  '		      <div class="tweet-utility">'+
			  '		          <a href="http://www.twitter.com/#!/'+screenName+'/status/'+self.tweetID+'" class="tweet-timestamp" title="12:31 PM Feb 3rd">5 hours ago</a> <span class="tweet-actions"><a href="#null" class="action-retweet" title="Retweet"><span><i><!--icon--></i><b>Retweet</b></span></a><a href="#null" class="action-reply" title="Reply"><span><i><!--icon--></i><b>Reply</b></span></a><a href="#null" class="action-follow" title="Follow"><span><i><!--icon--></i><b>Follow</b></span></a></span>'+
			  '		      </div>'+
			  '	      </div>'+
			  '   </div>'+
			  '</div>';
	};
	
	
	function decorate(e)
	{
		e.find('.action-retweet').click(onClickRetweet);
		e.find('.action-reply').click(onClickReply);
		e.find('.action-follow').click(onClickFollow);
		// touch
		// Log('element: '+e.find('.tweet .tweet-utility').fadeTo);
		e.find('.tweet-utility').fadeTo('fast', .2);
		// e.find('.tweet-utility').css({backgroundColor:'#FFFFFF'});
		
		e.hover(
			function(){$(this).find('.tweet-utility').stop().fadeTo('fast', 1) } , 
			function(){$(this).find('.tweet-utility').stop().fadeTo('fast', .2) }
			);
	}
	
	return this;
};