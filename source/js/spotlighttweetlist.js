// inherits from
SpotlightTweetList.prototype = new EventDispatcher();
SpotlightTweetList.constructor = SpotlightTweetList;

function SpotlightTweetList( server )
{
	var self	  = this;
	var model 	  = new TRModel(server + 'promoted-2.json');
	var tweets	  = new Array();
	var rendered  = false;
	
	this.element  = null;
	this.show 	  = show;
	this.hide 	  = hide;
	this.toString = toString;
	this.load	  = load;
	
	function load()
	{
		model.addEventListener("onDataChange", onDataChanged);
		model.load();
	};
	
	function show()
	{
		
	};
	
	function hide()
	{
		
	};
	
	function onDataChanged( e )
	{
		Log('spotlight tweets loaded');
		dispatchEvent('onSpotlightTweetsLoaded', self);
	}
	
	
	function toString()
	{
		return "SpotlightTweetList";
	};
	
	return this;
};
