function TweetListController(server)
{
	var celebList 	    = new TweetList(server + 'oscars-celebs.json');
	celebList.id		= "celebList";
	
	var expertList 	    = new TweetList(server + 'oscars-experts.json');
	expertList.id		= "expertList";
	
	var celebExpertList = new TweetList(server + 'oscars-celebs-and-experts.json');
	celebExpertList.id	= "celebExpertList";
	
	var pixTweets 		= new TweetList(server + 'oscars-pix.json');
	
	var selected		= null;
	var last			= null;
	var lists			= new Array();
	

	celebList.addEventListener("onHidden", onHidden);
	expertList.addEventListener("onHidden", onHidden);
	celebExpertList.addEventListener("onHidden", onHidden);
	
	celebList.hide();
	init();
	
	function init()
	{
 		celebList.element 		= $('#main-timeline').clone();
		lists.push({obj:celebList, id:"celebList"});
		
 		expertList.element 		= $('#main-timeline').clone();
		lists.push({obj:expertList, id:"expertList"});
		
 		celebExpertList.element = $('#main-timeline').clone();
		lists.push({obj:celebExpertList, id:"celebExpertList"});
		
		$('#main-timeline').detach();
		
		select( 'celebList' );
	}

	
	function select( id )
	{
		if(last) last.hide();
		
		for(i in lists)
		{
			if(lists[i].id == id )
			{
				var list = lists[i].obj;
				list.show()
				last = list;
				return;
			}
		} 
	}
	
	
	function setList( id )
	{
		
	}
	
	
	//  Event handlers
	function onHidden(e)
	{
		//alert(e.target.id+" is hidden");
	}
	
	return this;
}