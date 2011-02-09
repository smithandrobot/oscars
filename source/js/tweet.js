function Tweet()
{
	// Private
	
	var htmlText;
	var self 	 = this;
	var verified;
	var screenName;
	var userName;
	var celebBadge = '<span class="badge-celebrity">Celeb</span>';
	//  Public
	
	this.tweetID;
	this.setData = setData;
	this.html;
	this.celeb = false;
	
	// /Event Handlers
	
	// Public Methods
	
	// Private Methods
	
	function setData(d)
	{
		htmlText 	 = TweetParser.parse(d.text);
		self.tweetID = d.id;
		verified 	 = d.user.verified;
		screenName 	 = d.user.screen_name;
		userName 	 = d.user.name;
		profileImg	 = d.user.profile_image_url;
		celebBadge	 = (self.celeb) ? celebBadge : '';
		
		self.html = render();
		// console.log();
	};
	
	
	function render()
	{
		return'<div class="tweet celeb">'+
			  '   <div class="tweet-bg">'+
			  '       <div class="tweet-profile-image">'+
			  '		      <a href="http://www.twitter.com/#!/'+userName+'"><img src="'+profileImg+'" alt="'+userName+'" /></a>'+
			  ' 	  </div>'+
			  '       <div class="tweet-copy-block">'+
			  ' 	      <div class="tweet-name">'+
			  '	              <a class="tweet-name-screen" href="http://www.twitter.com/#!/'+userName+'" title="'+userName+'">@'+screenName+'</a> <span class="tweet-name-full">'+userName+'</span>'+celebBadge+'<a href="#null" class="expert-bio">Bio</a>'+
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
	}
	
	return this;
}