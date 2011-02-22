// inherits from
TweetPhotoList.prototype = new EventDispatcher();
TweetPhotoList.constructor = TweetPhotoList;

function TweetPhotoList( server )
{
	var PAGE_SIZE 	= 355;
	var INTERVAL	= 1000*60;
	
	var url			= server + 'photos.json';
	var poller		= null;
	var lastID		= null;
	var self	  	= this;
	var model 	  	= new TRModel( url );
	var tweets	  	= new Array();
	var rendered  	= false;
	var paging	  	= $('#photo-paging');
	var page	  	= $('#current-photo-page');
	var total	  	= $('#total-photo-pages');
	var element   	= $('#photo-scroller');
	var totalPages	= 0;
	var currPage	= 1;
	var timeout 	= 0;
	this.toString 	= toString;
	this.load	  	= load;
	
	init();
	
	
	function init()
	{
		element.empty();
		page.text( currPage );
		total.text( totalPages );
		decoratePagingButtons();
	}
	
	
	function load()
	{
		model.addEventListener("onDataChange", dataChanged);
		model.load();
	};
	
	function poll()
	{
		model.poll(lastID);
	};


	function dataChanged( e )
	{
		var data  = e.target.getData();
		
		if(data.length-1 < 0) 
		{
			clearTimeout(timeout);
			timeout = setTimeout(poll, INTERVAL);
			return false;
		}
		
		var i 	  = 0;
		var total = data.length-1;
		var t;

		for(i;i<=total;i++)	
		{
			t = new TweetPhoto();
			t.addEventListener('onPhotoReady', onPhotoReady);
			t.id = i;
			tweets.unshift( {tweet:t, id:i} );
			t.setData( data[i] );
		};
		
		lastID = data[0].order_id;
		
		show();
		if(!rendered)
		{
			dispatchEvent( 'tweetPhotoListLoaded', self );
			rendered = true;
		}

		clearTimeout(timeout);
		timeout = setTimeout(poll, INTERVAL);
	};
	
	
	function onPhotoClicked( e )
	{
		modal.open(e.target);
	}
	
	
	function onPhotoReady( e )
	{
		var i = 0;
		var totalTweets = tweets.length - 1;
		var id;
		var ready = 0;
		
		for(i;i<=totalTweets;i++)	
		{
			tweet 	 = tweets[i].tweet;
			id		= tweets[i].id;
			
			if(e.target.id == id) 
			{
				//Log('found a tweet('+e.target.id+') that\'s ready');
			}else{
				//Log('target.id - '+e.target.id+' tweet id: '+id);
			}
		};
	}
	
	
	function show()
	{
		var html ='';
		var tweet;
		var totalTweets = tweets.length - 1;
		var delay = 200;
		var tweetObj;
		var i = 0;
		
		element.html('');
		
		for(i;i<=totalTweets;i++)	
		{
			tweet 	 = tweets[i].tweet;
			tweetObj = tweet.getHTML();
			if(tweetObj) element.append(tweetObj);
		};
		
		totalPages = Math.ceil((totalTweets+1) / 3);
		total.text( totalPages );
	};
	
	
	function movePix( dir )
	{
		var x;
		
		if( dir=='fwd')
		{
			++currPage;
			currPage = (currPage > totalPages) ? totalPages : currPage;
		}
		
		if( dir == 'back')
		{
			--currPage;
			currPage = (currPage < 1 ) ? 1 : currPage;
		}
		
		x = ( (currPage - 1) * PAGE_SIZE );
		page.text( currPage );
		element.animate({ left: x*-1 }, 300);
	}
	
	
	function decoratePagingButtons()
	{
		$('#photo-paging .next').click(function() { movePix('fwd'); } );
		$('#photo-paging .previous').click(function() { movePix('back'); } );
	}
	
	
	return this;
	
};
