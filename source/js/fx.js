// scroll bar styling
// do stuff .js y'all!

$(document).ready(function() {
			init();
		});

$(function()
{
	$('#timeline').jScrollPane(
		{
			verticalDragMinHeight: 66,
			verticalDragMaxHeight: 66,
			verticalGutter: 10
		}
	);

		$('#viewer-timeline').jScrollPane(
			{
				verticalDragMinHeight: 60,
				verticalDragMaxHeight: 60,
				verticalGutter: 6
			}
		);
		
// photo browser
	
	$('#photo-paging .next').click(function() {
	  $('#photo-scroller').animate({
	    left: '-=355'
	  }, 250, function() {
	    // Animation complete.
	  });
	});
	
	$('#photo-paging .previous').click(function() {
	  $('#photo-scroller').animate({
	    left: '+=355'
	  }, 250, function() {
	    // Animation complete.
	  });
	});
	
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
counter.css('left', '260px');
counter.css('top', '0px');
counter.css('text-align', 'right');
counter.css('width', 80);
counter.css('font-size', 16);
}


// modal managers -- action-follow
		
		function init()
		{
			// follow
			$('.expert-bio').qtip({
			   content: $('.modal-bio').html(),
   				position: { 
					corner: { target: 'topLeft', tooltip: 'bottomLeft'},
					adjust: { x: -18, y: 20 }
				},
			    style: {
			    	tip: false,
					background: 'none',
                	padding: 0,
					border: false,
				 	width: { min: 294 }
			   },
			hide: {
            	fixed: true
         	},
			show:{delay: 0, when:'click'}
			});
			
			// follow
			$('.action-follow').qtip({
			   content: $('.modal-follow').html(),
   				position: { 
					corner: { target: 'topLeft', tooltip: 'bottomLeft'},
					adjust: { x: -40, y: 10 }
				},
			    style: {
			    	tip: false,
					background: 'none',
                	padding: 0,
					border: false,
				 	width: { min: 294 }
			   },
			hide: {
            	fixed: true
         	},
			show:{delay: 0, when:'click'}
			});
			
			// retweet -- modal-tweetbox
			$('.action-retweet').qtip({
			   content: $('.modal-retweet').html(),
   				position: { 
					corner: { target: 'topLeft', tooltip: 'bottomLeft'},
					adjust: { x: -40, y: 10 }
				},
			    style: {
			    	tip: false,
					background: 'none',
                	padding: 0,
					border: false,
				 	width: { min: 294 }
			   },
			hide: {
            	fixed: true
         	},
			show:{delay: 0, when:'click'}
			});
			
			// reply modal-tweetbox
			$('.action-reply').qtip({
			   content: $('.modal-reply').html(),
   				position: { 
					corner: { target: 'topLeft', tooltip: 'bottomLeft'},
					adjust: { x: -40, y: 10 }
				},
			    style: {
			    	tip: false,
					background: 'none',
                	padding: 0,
					border: false,
				 	width: { min: 294 }
			   },
			hide: {
            	fixed: true
         	},
			show:{delay: 0, when:'click'}
			});
			
			$('.tweet').fadeIn('fast', function() {
		        // Animation complete
		      });
			
			$('.tweet .tweet-utility').fadeTo('fast', .2, function() {
		        // Animation complete
		      });
			
			$('.tweet').hover(
				function() {
			      $('.tweet-utility', this).stop().fadeTo('slow', 1, function() {
			        // Animation complete
			      });
			    },
				function() {
			      $('.tweet-utility', this).stop().fadeTo('slow', .2, function() {
			        // Animation complete
			      });
			    });
			
		}
		

