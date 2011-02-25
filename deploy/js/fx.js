

function styleTweetBox()
{
	label = $("#tbox iframe").contents().find("label");
	counter = $("#tbox iframe").contents().find("#counter");
	var fontSize = label.css('fontSize');
	box = $("#tbox iframe").contents().find("#tweet-box");	
	label.css('font-size', 16);
	label.css('color', "#ccc");
	counter.css('position', 'absolute');
	counter.css('color', "#666");
	counter.css('left', '240px');
	counter.css('top', '0px');
	counter.css('text-align', 'right');
	counter.css('width', 80);
	counter.css('font-size', 16);
	
	// box.focus(function() {
	// 	$(this).addClass('newly-focused');
	// 	$(this).setCursorPosition(0);
	// 	return;
	// });
	// 
	// box.blur(function() {
	// 	$(this).removeClass('newly-focused');
	// 	return;
	// });
	// 
	// box.click(function() {
	// 	if ($(this).hasClass('newly-focused')) {
	// 		$(this).setCursorPosition(0);
	// 		$(this).removeClass('newly-focused');
	// 	}
	// 	return;
	// });
	
}

$(function(){

  });
