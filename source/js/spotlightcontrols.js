// inherits from
SpotlightControls.prototype = new EventDispatcher();
SpotlightControls.constructor = SpotlightControls;

function SpotlightControls()
{
	
	var self = this;
	var next = $('.spotlight-pagination').find('.next');
	var previous = $('.spotlight-pagination').find('.previous');

	decorate();

	function decorate()
	{
		next.click(onNext);
		previous.click(onPrevious);
		
		next.hover(onMouseOver, onMouseOut);
		previous.hover(onMouseOver, onMouseOut);
	}
	
	
	function onMouseOver(e)
	{
		$(this).css('cursor','pointer')
	}
	
	
	function onMouseOut(e)
	{
		$(this).css('cursor','auto');
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
	
	
	return this;
};
