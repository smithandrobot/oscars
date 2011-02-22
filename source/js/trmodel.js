TRModel.prototype = new EventDispatcher();
TRModel.constructor = TRModel;
TRModel.constructor.id = 0;

function TRModel( URL )
{
	
	var self = this;
	var pollInterval = 200;
	var stream = URL;
	var data;
	var loaded = false;

	var type;
	
	this.id = "TR_MODEL - "+(++TRModel.constructor.id);

	this.getStream = function() { return stream; };
	this.getData = function() { return data; };
	this.setType = function(t) { type = t; };
	this.getType = function() { return type; };
	
	this.load = function () { $.ajax({ url: URL, dataType: 'jsonp', success: onStreamLoaded, error: onStreamError }); };	
	this.toString = function() { return "TRModel: "+this.id};
	this.poll = poll;
	
	loadCustomCallBack( URL )
	var onStreamError = function(xmlhttp, txtstatus, errorThrown)
	{
		//alert('stream error xmlhttp: '+xmlhttp+", txtstatus: "+txtstatus+' errorThrown: '+errorThrown);
	};

	var onStreamLoaded = function(d)
	{
		data = d;
		dispatchEvent("onDataChange", self);
	};
	
	
	function trCallback( e)
	{
		alert('trCallback');
	}
	
	function loadCustomCallBack( u )
	{
		var aObj = {};
		aObj.url = u;
		aObj.dataType = 'jsonp';
		aObj.success = onStreamLoaded;
		aObj.error = onStreamError;
		aObj.jsonpCallback  = 'trCallback';
 		$.ajax(aObj); 
	}
	
	
	function poll(url)
	{
		$.ajax({ url: url, dataType: 'jsonp', success: onStreamLoaded, error: onStreamError });
	}
	

};