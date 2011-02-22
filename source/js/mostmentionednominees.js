MostMentionedNominees.prototype = new EventDispatcher();
MostMentionedNominees.constructor = MostMentionedNominees;

function MostMentionedNominees() 
{
	var self 		= this;
	var rendered 	= false;
	
	this.load = load;
	
	
	function load()
	{
		if(!rendered)
		{
			dispatchEvent('onMostMentionedLoaded', self);
			rendered = true;
		}
	};
	
	
	return this;
};
