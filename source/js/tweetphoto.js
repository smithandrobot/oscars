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
	
	function setData( d )
	{
		self.tweet 	 = d.text;
		var m 		 = new MediaParser();
		m.addEventListener('onImageData', onImageData);
		var imgData  = m.getImage( self.tweet );
		
		setTimeout(timeOut, MAX_TIME);
	}
	
	function getHTML()
	{
		// <div class="photo" style="background:url('http://yfrog.com/gy39692910j:small');">
		if(thumb == undefined) return false;
		
		if(element != undefined) element.empty();
		element = $(render());
		element.find('a').text(source);

		if(thumb != undefined) element.find('.photo').css('background-image', 'url('+thumb.src+')');

		return element;
	}
	
	
	function onImageData( e )
	{
 	 	thumb		 = new Image();
		thumb.src 	 = e.target.thumb;
		source   	 = e.target.source;
		thumbURL 	 = e.target.thumb;
		imgURL   	 = e.target.largeImage;

		thumb.onLoad = function(){alert('loaded');};//getImageOffsets;
		dispatchEvent('onPhotoReady', self);
	}
	
	
	function render()
	{
		return '<div class="photo-assembly">'+
			   '    <div class="photo">'+
			   '        <img src="img/photo-glare.png" />'+
			   ' 	</div>'+
			   '    <a href=""></a>'+
			   '</div>';
	}
	
	function getImageOffsets(img)
	{
		Log('offest x: '+offsetX+' offsetY: '+offsetY);
		var max 	= 75;
		var orgW 	= img.width;
		var orgH 	= img.height;
		var centerX = max/2;
		var centerY = max/2;
		var offsetX = centerX-img.width/2;
		var offsetY = centerY-img.height/2;

		return {x:offsetX , y: offsetY};
	};
	
	function timeOut()
	{
		if(!thumbURL) 
		{
			Log('----> image timeout! <-----');
			dispatchEvent('onImageLoadError', self);
		}
	}
	
	
	function toString() { return 'TweetPhoto'; };
	
	return this;
}