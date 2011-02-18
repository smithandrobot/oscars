TweetPhoto.prototype 	= new EventDispatcher();
TweetPhoto.constructor 	= TweetPhoto;

function TweetPhoto()
{
	var MAX_TIME	= 5000;
	
	var self 	 	= this;
	var element		= null;
	var source		= null;
	var thumbURL	= null;
	var imgURL		= null;
	var thumb		= undefined;
	
	this.id			= null;
	this.setData 	= setData;
	this.toString 	= toString;
	this.tweet		= null;
	this.getHTML    = getHTML;
	this.tweetID	= null;
	
	function setData( d )
	{
		self.tweet 	 = d.text;
		self.tweetID = d.id;
		var m 		 = new MediaParser();
		m.addEventListener('onImageData', onImageData);
		var imgData  = m.getImage( self.tweet );
		
		setTimeout(timeOut, MAX_TIME);
	}
	
	function getHTML()
	{
		// <div class="photo" style="background:url('http://yfrog.com/gy39692910j:small');">
		if(thumb == undefined) return false;
		
		if(element == undefined) element = $(render());
		element.find('a').text(source);
		element.find('.photo').css('background-image', 'url('+thumb.src+')');
		decorate(element);
		return element;
	}
	
	
	function onImageData( e )
	{
		// alert('got image data');
 	 	thumb		 	= new Image();
		// thumb.onload 	= function(){alert('loaded')};//getImageOffsets;
		thumb.onerror	= function(){Log('*** ---|> error loading imge')}; //onImageError
		thumb.src 	 	= e.target.thumb;
                     	
		             	
		source   	 	= e.target.source;
		thumbURL 	 	= e.target.thumb;
		imgURL   	 	= e.target.largeImage;

		//function(){alert('loaded');};//getImageOffsets;
		dispatchEvent('onPhotoReady', self);
	}
	
	
	function render()
	{
		return '<div class="photo-assembly">'+
			   '    <div class="photo">'+
			   '        <img src="img/photo-glare.png" />'+
			   ' 	</div>'+
			   '    <a href="#null"></a>'+
			   '</div>';
	}
	
	function getImageOffsets( e )
	{
		var img 	= e.target;
		var max 	= 75;
		var orgW 	= img.width;
		var orgH 	= img.height;
		var centerX = max/2;
		var centerY = max/2;
		var offsetX = centerX-img.width/2;
		var offsetY = centerY-img.height/2;
		Log('offest x: '+offsetX+' offsetY: '+offsetY);
		return {x:offsetX , y: offsetY};
	};
	
	function onPhotoClick()
	{
		Log('clicked photo');
	}
	
	function timeOut()
	{
		if(!thumbURL) 
		{
			Log('----> image timeout! <-----');
			dispatchEvent('onImageLoadError', self);
		}
	}
	
	function decorate(e)
	{
		var photo = e.find('.photo');
		photo.click(function(){Log('hi - '+	self.tweetID)});
		photo.hover(function() {$(this).css('cursor','pointer')}, function() {$(this).css('cursor','auto')} );
	}
	
	
	function toString() { return 'TweetPhoto'; };
	
	return this;
}