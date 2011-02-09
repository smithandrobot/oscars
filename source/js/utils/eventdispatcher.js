function EventDispatcher()
{
	var e = EventManager;
	this.addEventListener = addEventListener;
	this.dispatchEvent = dispatchEvent;
	
	function addEventListener(eventName, func)
	{
		// alert('scope: '+this)
 		e.addEvent(eventName, addEventListener.caller, this, func); 
	}
	
	function dispatchEvent(type, target)
	{
		// alert('dispatchEvent '+type);
		e.dispatchEvent(type, target) 
	}
}