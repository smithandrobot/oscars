function TRModel(s)
{
	var self = this;
	var pollInterval = 200;
	var stream = s;
	var data;
	var loaded = false;
	var e = new EventManager();
	var type;
	
	this.id = (s) ? s : "TR_MODEL";

	this.getStream = function() { return stream; };
	this.getData = function() { return data; };
	this.setType = function(t) { type = t; };
	this.getType = function() { return type; };
	this.addEventListener = function(eventName, func) { e.addEvent(eventName, arguments.callee.caller, func); };	
	this.load = function () { $.ajax({ url: s, dataType: 'jsonp', success: onStreamLoaded, error: onStreamError }); };	
	this.toString = function() { return "TRModel: "+this.id};
	
	var onStreamError = function(xmlhttp, txtstatus, errorThrown)
	{
		//alert('stream error xmlhttp: '+xmlhttp+", txtstatus: "+txtstatus+' errorThrown: '+errorThrown);
	}

	var onStreamLoaded = function(d)
	{
		data = d;
		e.dispatchEvent("onDataChange", self);
	}	
};