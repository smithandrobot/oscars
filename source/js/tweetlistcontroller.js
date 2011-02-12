function TweetListController(server)
{
	// var celebList 	    = new TweetList(server + 'oscars-celebs.json');
	var celebList 	    = new TweetList(server + 'javascript.json');
	celebList.id		= "celebList";
	
	// var expertList 	    = new TweetList(server + 'oscars-experts.json');
	var expertList 	    = new TweetList(server + 'actionscript.json');
	expertList.id		= "expertList";
	
	var celebExpertList = new TweetList(server + 'goldenglobestest.json');
	celebExpertList.id	= "all";
	
	var tweetCount		= new TweetCount();
	var selected		= null;
	var last			= null;
	var lists			= new Array();
	
	// Public Methods
	this.select			= select;
	
	celebList.load();
	expertList.load();
	
	celebExpertList.addEventListener('tweetListLoaded', celebExpertListLoaded);
	celebExpertList.load();
	
	celebList.addEventListener("onHidden", onHidden);
	expertList.addEventListener("onHidden", onHidden);
	celebExpertList.addEventListener("onHidden", onHidden);
	
	celebList.addEventListener("onShowing", onListShowing);
	expertList.addEventListener("onShowing", onListShowing);
	celebExpertList.addEventListener("onShowing", onListShowing);
	
	celebList.hide();
	init();
	
	function init()
	{
 		celebList.element 		= $('#main-timeline').clone();
		lists.push({obj:celebList, id:"celebList"});
		celebList.element.attr('id', 'celebList-timeline');
		
 		expertList.element 		= $('#main-timeline').clone();
		expertList.element.attr('id', 'expertList-timeline')
		lists.push({obj:expertList, id:"expertList"});
		
 		celebExpertList.element = $('#main-timeline').clone();
		celebExpertList.element.attr('id', 'all-timeline');
		lists.push({obj:celebExpertList, id:"all"});
		
		$('#main-timeline').detach();
	};

	
	function celebExpertListLoaded( e )
	{
		select( 'all' );	
	};
	
	
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
					tweetCount.setCount(50);
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
		tweetCount.setCount(90);
	};
	
	
	function onListShowing( e )
	{
		//alert(e.target.id+'list showing');
	}
	
	
	return this;
};