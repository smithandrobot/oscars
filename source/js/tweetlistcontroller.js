TweetListController.prototype = new EventDispatcher();
TweetListController.constructor = TweetListController;

function TweetListController(server)
{
	var allList 	    = new TweetList(server + 'oscars-celebs-and-viewers.json');
	allList.id		= "all";
	
	var celebList 	    = new TweetList(server + 'oscars-celebs.json');
	celebList.id		= "celebs";
	
	var viewerList = new TweetList(server + 'oscars-all-curated.json');
	viewerList.id	= "viewers";
	
	var expertList 		= new TweetList(server + 'oscars-experts.json');
	expertList.id		= "expertList";
	
	var tweetCount		= new TweetCount();	
	tweetCount.addEventListener('onLoadMoreTweets', onLoadMoreTweets);
	
	var selected		= null;
	var last			= null;
	var lists			= new Array();
	var rendered		= false;
	var self			= this;
	
	// Public Methods
	this.select			= select;
	this.load			= load;
	this.loadExpertList	= loadExpertList;
		
	function load()
	{
		allList.addEventListener('tweetListLoaded', allListLoaded);
		
		allList.load();
		celebList.load();
		viewerList.load();

		allList.addEventListener("onHidden", onHidden);
		celebList.addEventListener("onHidden", onHidden);
		viewerList.addEventListener("onHidden", onHidden);

		allList.addEventListener("onShowing", onListShowing);
		celebList.addEventListener("onShowing", onListShowing);
		viewerList.addEventListener("onShowing", onListShowing);


		viewerList.addEventListener('onUnreadTweets', onUnreadTweets);
		celebList.addEventListener('onUnreadTweets', onUnreadTweets);
		allList.addEventListener('onUnreadTweets', onUnreadTweets);
		

		init();
	}
	
	function loadExpertList()
	{
		expertList.addEventListener("onShowing", onListShowing);
		expertList.addEventListener('expertListRendered', onExpertListRendered)
		expertList.addEventListener('tweetListLoaded', viewerListLoaded);
		expertList.load();
	}
	
	function init()
	{
 		allList.element 		= $('#main-timeline').clone();
		lists.push({obj:allList, id:"all"});
		allList.element.attr('id', 'all');
		
 		celebList.element 		= $('#main-timeline').clone();
		celebList.element.attr('id', 'celebs')
		lists.push({obj:celebList, id:"celebs"});
		
 		viewerList.element = $('#main-timeline').clone();
		viewerList.element.attr('id', 'viewers');
		lists.push({obj:viewerList, id:"viewers"});

	};

	
	function allListLoaded( e )
	{
		
		if(!rendered)
		{
			select( 'all' );
			dispatchEvent('tweetListRendered', self);
			rendered = true;
		}
	};
	
	
	function viewerListLoaded( e )
	{
 		expertList.element = $('#viewer-timeline .timeline-all').clone();
		$('#viewer-timeline .timeline-all').remove();
		e.target.show();
	}
	
	
	function select( id )
	{		
		if(last != null) last.hide();

		for(i in lists)
		{
			if(lists[i].id == id )
			{
				var list = lists[i].obj;
				if(last == null) 
				{
					list.show();
					$('#main-timeline').remove();
				};
				last = list;
				return;
			};
		} ;
	};
	
	
	
	//  Event handlers
	function onHidden(e)
	{
		last.show();
	};
	
	
	function onListShowing( e )
	{
		//alert(e.target.id+'list showing');
	}
	
	function onUnreadTweets( e )
	{
		var uncounted = e.target.unreadTweets;
		tweetCount.update( uncounted );
	}
	
	function onLoadMoreTweets( e )
	{
		last.updateList();
	}
	
	
	function onExpertListRendered( e )
	{
		dispatchEvent('onExpertListRendered', self);
	}
	return this;
};