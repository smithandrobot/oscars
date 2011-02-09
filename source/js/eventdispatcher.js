function EventDispatcher()
{
	var e = new EventManager();
	this.addEventListener = addEventListener//function(eventName, func) { e.addEvent(eventName, arguments.callee.caller, func); };
	this.dispatchEvent = dispatchEvent//function(type, target){ e.dispatchEvent(type, target) };
	
	function addEventListener(eventName, func)
	{
		alert('adding event '+eventName+" scope: "+arguments.callee)
 		e.addEvent(eventName, arguments.callee.caller, func); 
	}
	
	function dispatchEvent(type, target)
	{
		alert('dispatchEvent '+type);
		e.dispatchEvent(type, target) 
	}
}