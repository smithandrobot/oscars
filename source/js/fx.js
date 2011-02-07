// scroll bar styling

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
	
});

$(document).ready(function() {
			init();
		});
		
		function init()
		{
			// follow
			$('.expert-bio').qtip({
			   content: $('#modal-bio').html(),
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
			show:{when:'click'}
			});
		}