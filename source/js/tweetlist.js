TweetList.prototype = new EventDispatcher();
TweetList.constructor = TweetList;

function TweetList(URL)
{
	var self				= this;
	var model 				= new TRModel(URL);
	var tweets				= new Array();
	var render				= false;
	this.element			= null;
	this.show 				= show;
	this.hide 				= hide;
	this.id					= URL;
	this.show				= show;
	this.toString			= toString;
	this.load				= load;

	
	function load()
	{
		model.addEventListener("onDataChange", dataChanged);
		model.load();
	}
	
	
	function dataChanged(e)
	{
		var data  = e.target.getData();
		var i 	  = 0;
		var total = data.length-1;
		var t;
		
		console.log(self.id+' loaded,  total: '+total);
		
		for(i;i<=total;i++)	
		{
			t = new Tweet();
			t.setData(data[i]);
			tweets.push({tweet:t, id:i})
		}
		
		dispatchEvent('tweetListLoaded', self);
	}
	
	
	function show()
	{
		var html ='';
		var tweet;
		var total = tweets.length - 1;
		
		for(i;i<=total;i++)	
		{
			tweet = tweets[i].tweet;
			html+= tweet.html;
		}
		alert('showing: '+self.id+' with '+total+' tweets');
		self.element.html('<p>'+self.id+'</p>'+html);
		self.element.insertAfter('#loadmore');
	}
	
	
	function hide()
	{
		//alert(self.id+' hide()');
		this.dispatchEvent("onHidden", self);
	}
	
	
	function toString()
	{
		return "Tweetlist";
	}
	
	return this;
}