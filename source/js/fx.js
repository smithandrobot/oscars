

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
	
	// var textarea = $("#tbox iframe").contents().find("textarea");
	// textarea.click( function(){ forceCaret( textarea )} );
	// $("#tbox iframe").contents().find("textarea").focus();
	// $("#tbox iframe").contents().find("textarea").setSelectionRange(0, 10);
	// function forceCaret(element) 
	// {
	//     	var e = element;
	// 	Log('e: '+$(this).val()+', click: e.setSelectionRange- '+e.setSelectionRange+', e.createTextRange- '+e.createTextRange+' e.selectionStart- '+e.selectionStart);
	// 	if (e.setSelectionRange) {	$("#tbox iframe").contents().find("textarea").focus();} /* WebKit */ 
	// 	if (e.createTextRange) { var range = e.createTextRange(); range.collapse(true); range.moveEnd('character', 10); range.moveStart('character', 1); range.select(); } /* IE */
	// 	if (e.selectionStart) { e.selectionStart = 1; e.selectionEnd = 10; }
	// }
}

$(function(){

  });
