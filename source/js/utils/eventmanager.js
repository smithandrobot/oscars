EventManager = function(){

    this.events = new Array();
};


e = EventManager.prototype;

e.addEvent = function(eventType, observer, method)
{ 
	this.events.push({observer:observer, method : method, eventType:eventType});
};


e.dispatchEvent = function(eventType, target)
{

    for(var i in this.events)
	{
        var eType = this.events[i].eventType;
        var observer =  this.events[i].observer;
		var method	= this.events[i].method;
		if(eType == eventType) 
		{
			method.call(observer, new Event(eType, target));
		};
    };
};

e.removeEventListener = function (eventType, observer)
{
	
    for(var i in this.events)
	{
        var e = this.events[i].eventType;
        var observer =  this.events[i];
    }
	
};