// inherits from
SpotlightControls.prototype = new EventDispatcher();
SpotlightControls.constructor = SpotlightControls;

function SpotlightControls()
{
	
	var self 	 		= this;
	var next 	 		= $('.spotlight-pagination').find('.next');
	var previous 		= $('.spotlight-pagination').find('.previous');
	var activeColor 	= '#E7D38D';
	var inactiveColor	= '#3F3C32';
	var previousOut 	= activeColor;
	var nextOut 		= activeColor;
	
	this.enableNext 	= enableNext;
	this.enablePrev 	= enablePrev;
	
	decorate();

	function decorate()
	{
		next.click(onNext);
		previous.click(onPrevious);
		
		next.css('color','#E7D38D');
		previous.css('color','#E7D38D');
		
		next.hover(onMouseOver, onMouseOut);
		previous.hover(onMouseOver, onMouseOut);
	}
	
	
	function onMouseOver(e)
	{
		$(this).css('cursor','pointer');
		$(this).css('color','#FEF9C5');
	}
	
	
	function onMouseOut(e)
	{
		var btnClass = $(this).attr('class');
		var color = (btnClass == 'next') ? nextOut : previousOut;
		
		$(this).css('cursor','auto');
		$(this).css('color', color);
	}
	
	
	function onNext()
	{
		Log('next click');
		dispatchEvent('onNextSpotlightTweet', self);
	}
	
	
	function onPrevious()
	{
		Log('previous click');
		dispatchEvent('onPreviousSpotlightTweet', self);
	}
	
	function enablePrev( b )
	{
		Log('enablePrev: '+b)
		if(!b)previous.find('a').addClass('disabled');
		if(b)previous.find('a').removeClass('disabled');
		//previousOut	= ( b ) ? activeColor : inactiveColor;
		
	}
	
	function enableNext( b )
	{
		Log('enableNext: '+b)
		if(!b)next.find('a').addClass('disabled');
		if(b)next.find('a').removeClass('disabled');
		nextOut = ( b ) ? activeColor : inactiveColor;
	}
	
	return this;
};
