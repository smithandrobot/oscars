// inherits from
TweetPhotoList.prototype = new EventDispatcher();
TweetPhotoList.constructor = TweetPhotoList;

function TweetPhotoList( URL )
{
	var self	  = this;
	var model 	  = new TRModel(URL);
	var tweets	  = new Array();
	var rendered  = false;
	
	this.element  = null;
	this.id		  = URL;
	this.toString = toString;
	this.load	  = load;
	
	
	function load()
	{
		model.addEventListener("onDataChange", dataChanged);
		model.load();
	};


	function dataChanged( e )
	{
		var data  = e.target.getData();
		var i 	  = 0;
		var total = data.length-1;
		var t;
		
		for(i;i<=total;i++)	
		{
			t = new TweetPhoto();
			t.setData( data[i] );
			tweets.push( {tweet:t, id:i} )
		};
		
		dispatchEvent( 'tweetPhotoListLoaded', self );
	};
	
	return this;
};
