FilterNav.prototype 	= new EventDispatcher();
FilterNav.constructor 	= FilterNav;

function FilterNav()
{
	var self 	= this;
	var all 	= $('#filter-all');
	var celebs 	= $('#filter-celebs');
	var viewers = $('#filter-viewers');
	var currFilter = null;
	
	this.show 	= show;
	this.filter = 'filter-all';
	
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
		viewers.click(onClick);
	};
	
	
	function onClick(e)
	{
		var id = $(this).attr("id");
		$(this).parent().toggleClass('down', true);
		select(id);
	};
	
	
	function select( id )
	{
		if(self.filter == id ) return;
		
		self.filter = id;
		if(id != 'filter-all')  $('#filter-all').parent().toggleClass('down', false);
		if(id != 'filter-celebs')  $('#filter-celebs').parent().toggleClass('down', false);
		if(id != 'filter-viewers')  $('#filter-viewers').parent().toggleClass('down', false);
		
		dispatchEvent('onFilterChange', self);
	};

};