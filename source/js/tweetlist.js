function TweetList(URL)
{
	var self				= this;
	var model 				= new TRModel(URL);
	var e 					= new EventManager();
	var tweets				= new Array();
	this.element			= null;
	this.show 				= show;
	this.hide 				= hide;
	this.id					= URL;
	this.addEventListener	= addEventListener;
	this.show				= show;
	
	model.addEventListener("onDataChange", dataChanged);
	model.load();
	
	function dataChanged(e)
	{
		var data = e.target.getData();
		var i = 0;
		var total = data.length-1;
		var t;
		
		for(i;i<=total;i++)
		{
			t = new Tweet();
			t.setData();
			tweets.push({tweet:t, id:i})
		}
	}
	
	
	function show()
	{
		self.element.html('<p>'+self.id+'</p>');
		self.element.insertAfter('#loadmore');
	}
	
	function hide()
	{
		//alert(self.id+' hide()');
		e.dispatchEvent("onHidden", self);
	}
	
	function toString()
	{
		return "Tweetlist";
	}
	
	function addEventListener(eventName, func) 
	{ 
		e.addEvent(eventName, arguments.callee.caller, func);
	};
	
	return this;
}