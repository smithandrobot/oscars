// scroll bar styling
// do stuff .js y'all!

$(document).ready(function() {
			init();
		});

$(function()
{
		
	
});

// tweet box styling



function styleTweetBox()
{
	label = $("#tbox iframe").contents().find("label");
	counter = $("#tbox iframe").contents().find("#counter");
	var fontSize = label.css('fontSize');
	//alert('styling tweet box: '+label.html());
	label.css('font-size', 16);
	label.css('color', "#ccc");
	counter.css('position', 'absolute');
	counter.css('color', "#666");
	counter.css('left', '240px');
	counter.css('top', '0px');
	counter.css('text-align', 'right');
	counter.css('width', 80);
	counter.css('font-size', 16);
}

$(function(){
	$(".top5").click(function(){
	     window.top.location=$(this).find("a").attr("href");
	     return false;
	});
  });

// modal managers -- action-follow
		
		function init()
		{
		
			
		}
		
