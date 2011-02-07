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