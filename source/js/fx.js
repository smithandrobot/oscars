// scroll bar styling
// do stuff .js y'all!

$(document).ready(function() {
			init();
		});

$(function()
{
		
// photo browser
	
	// $('#photo-paging .next').click(function() {
	//   $('#photo-scroller').animate({
	//     left: '-=355'
	//   }, 250, function() {
	//     // Animation complete.
	//   });
	// });
	// 
	// $('#photo-paging .previous').click(function() {
	//   $('#photo-scroller').animate({
	//     left: '+=355'
	//   }, 250, function() {
	//     // Animation complete.
	//   });
	// });
	
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

// append scrollbar to all DOM nodes with class="css-scrollbar"
  $(function(){
    $('.css-scrollbar').scrollbar();
    $('.css-scrollbar-2').scrollbar();
  })

// modal managers -- action-follow
		
		function init()
		{
			
		}
		

