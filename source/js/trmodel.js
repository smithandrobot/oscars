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
	var date	= new Date();
	var type;
	
	this.name  = 'model'
	this.id = "TR_MODEL_"+(++TRModel.constructor.id);

	this.getStream = function() { return stream; };
	this.getData = function() { return data; };
	this.setType = function(t) { type = t; };
	this.getType = function() { return type; };
	
	this.load = loadCustomCallBack;
	this.toString = function() { return "TRModel: "+this.id};
	this.poll = poll;
	this.trCallback = trCallback;
	
	var onStreamError = function(xmlhttp, txtstatus, errorThrown)
	{
		//alert('stream error xmlhttp: '+xmlhttp+", txtstatus: "+txtstatus+' errorThrown: '+errorThrown);
	};

	var onStreamLoaded = function(d)
	{
		data = d;
		dispatchEvent("onDataChange", self);
	};
	
	
	function loadCustomCallBack( sinceID , callback)
	{
		var aObj = {};
		var callbackName = 'trCallback_'+String(self.id)+'_x';
		var since = ( sinceID ) ? '?since_id='+sinceID : '';

		window[callbackName] = self.trCallback;
		
		aObj.url 		= stream+since;
		if( callback ) aObj.jsonp = callback;
		aObj.cache 		= true;
		aObj.dataType 	= 'jsonp';
		aObj.data 		= {req_time : Math.floor(date.getTime()/1000)};
		aObj.success 	= onStreamLoaded;
		aObj.error 		= onStreamError;
		
		aObj.jsonpCallback  = callbackName;
		
 		$.ajax(aObj); 
	}
	
	

	
	function customCallBackSuccess( e )
	{
		//alert('customCallBackSuccess');
	}
	
	function poll( sinceID )
	{
		loadCustomCallBack( sinceID )
		//$.ajax({ url: url, dataType: 'jsonp', success: onStreamLoaded, error: onStreamError });
	}
	
	
	function trCallback( d )
	{
		//Log('trcallback data: '+d);
	}
		
	return this;
};

