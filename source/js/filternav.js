FilterNav.prototype 	= new EventDispatcher();
FilterNav.constructor 	= FilterNav;

function FilterNav()
{
	var self 	= this;
	var all 	= $('#filter-all');
	var celebs 	= $('#filter-celebList');
	var experts = $('#filter-expertList');
	
	this.show 	= show;
	this.filter = null;
	
	$('#timeline-head h2').hide();
	$('#timeline-head h4').hide();
	$('#filter-nav').hide();
	
	initBtns();
	
	function show()
	{
		$('#timeline-head h2').fadeIn(200);
		$('#timeline-head h4').delay(200).fadeIn(200);
		$('#filter-nav').delay(200).fadeIn(200);
	}
	
	function initBtns()
	{
		all.click(onClick);
		celebs.click(onClick);
		experts.click(onClick);
	};
	
	
	function onClick(e)
	{
		var id = $(this).attr("id");
		$(this).parent().toggleClass('down', true);
		select(id);
	};
	
	
	function select( id )
	{
		self.filter = id;
		
		if(id != 'filter-all')  $('#filter-all').parent().toggleClass('down', false);
		if(id != 'filter-celebList')  $('#filter-celebList').parent().toggleClass('down', false);
		if(id != 'filter-expertList')  $('#filter-expertList').parent().toggleClass('down', false);
		
		dispatchEvent('onFilterChange', self);
	};

};