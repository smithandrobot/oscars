TweetListController.prototype = new EventDispatcher();
TweetListController.constructor = TweetListController;

function TweetListController(server)
{
	// var celebList 	    = new TweetList(server + 'oscars-celebs.json');
	var allList 	    = new TweetList(server + 'oscars-celebs-and-viewers.json');
	allList.id		= "all";
	
	// var expertList 	    = new TweetList(server + 'oscars-experts.json');
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
	this.loadExpertList	= loadExpertList//viewerList.load;
	
	$('#main-timeline').hide();
	$('#main-timeline').hide();
	$('#viewer-timeline .timeline-all').hide();
		
	function load()
	{
		Log('loading '+allList.id)
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
		expertList.addEventListener("onShowing", onListShowing);

		viewerList.addEventListener('onUnreadTweets', onUnreadTweets);
		celebList.addEventListener('onUnreadTweets', onUnreadTweets);
		allList.addEventListener('onUnreadTweets', onUnreadTweets);
		// 
		// celebList.hide();
		init();
		// 
	}
	
	function loadExpertList()
	{
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
		
 		expertList.element = $('#viewer-timeline .timeline-all').clone();
		
		$('#main-timeline').remove();
		$('#viewer-timeline .timeline-all').remove();
	};

	
	function allListLoaded( e )
	{
		Log(allList.id+' loaded')
		select( 'all' );
		
		if(!rendered)
		{
			dispatchEvent('tweetListRendered', self);
			rendered = true;
		}
	};
	
	
	function viewerListLoaded( e )
	{
		e.target.show();
	}
	
	
	function select( id )
	{		
		Log('checking id: '+id);
		if(last != null) last.hide();

		for(i in lists)
		{
			if(lists[i].id == id )
			{
				var list = lists[i].obj;
				if(last == null) 
				{
					list.show();
					//tweetCount.update(0);
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
	
	return this;
};