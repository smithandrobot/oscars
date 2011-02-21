// inherits from
TweetPhotoModal.prototype = new EventDispatcher();
TweetPhotoModal.constructor = TweetPhotoModal;

function TweetPhotoModal() 
{
	var element = $('.modal-photo').clone();
	var modal;
	
	this.tweet		= null;
	this.open 	 	= open;
	this.setModal	= setModal;
	this.img		= new Image();
	this.img.onload = onImageLoad;
	
	function open()
	{
		getPhotoContent();
	}
	
	
	function setModal( e )
	{

	}
	
	function getPhotoContent()
	{
		element.find('.photo-screen-name').text('@'+self.tweet.screenName);
		element.find('.photo-user-name').text('@'+self.tweet.userName);
		element.find('.photo-tweet-body').html( self.tweet.tweetText);
		element.find('.photo-tweet-time').text( self.tweet.time );
		element.find('img').attr( 'src', self.tweet.img );
		self.img.src = self.tweet.img;
		return element;
	}
	
	
	function onImageLoad(i)
	{
		Log('image: '+i.width);
		element.css('width', i.width);
		element.appendTo(document.body);
		
	}
	
	
	function onClose()
	{
		return element.remove();
	}
	
	function decorateCloseBtn( e )
	{
		var cBtn = $(e).find('.close-botton');
		cBtn.click(onClose);
		cBtn.hover(function() {$(this).css('cursor','pointer')}, function() {$(this).css('cursor','auto')} );
	}
	
	return this;
};
