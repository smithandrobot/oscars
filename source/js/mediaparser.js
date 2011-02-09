function MediaParser()
{
	var optionalProtocol = /(?:(?:https?\:\/\/)?(?:www\.)?)/;
	var imgID = 0;
	
	this.getImages = getImage;
	domains = new Array(
		{domain:/\b(?:(?:https?\:\/\/)?(?:www\.)?)?yfrog\.com\/(\S+)/, process:yFrog},
		{domain:/\b(?:(?:https?\:\/\/)?(?:www\.)?)?(?:www\.)?twitpic\.com\/(\S+)/, process:twitpic},
		{domain:/\b(?:(?:https?\:\/\/)?(?:www\.)?)?(?:www\.)?tweetphoto\.com\/(\d+)/i, process:plixi},
		{domain:/\b(?:(?:https?\:\/\/)?(?:www\.)?)?(?:www\.)?plixi\.com\/p\/(\d+)/i, process:plixi},
		{domain:/\b(?:(?:https?\:\/\/)?(?:www\.)?)?(?:www\.)?m\.plixi\.com\/p\/(\d+)/i, process:plixi},
		{domain:/\b(?:(?:https?\:\/\/)?(?:www\.)?)?(?:www\.)?photozou\.(?:com|jp)\/photo\/show\/\d+\/(\d+)/i, process:photozou},
  		{domain:/\b(?:(?:https?\:\/\/)?(?:www\.)?)?(?:www\.)?flic\.kr\/p\/[a-z0-9]+\/?$/i, process:flickr},
        {domain:/\b(?:(?:https?\:\/\/)?(?:www\.)?)?(?:www\.)?flic\.kr\/(?!p\/)([\w\@\-]+)\/?$/i, process:flickr}
		);
	
	var tweet = [
				"however, i do question his judgment in http://twitpic.com/3vt0ax allowing me to hang out the bathroom window with a rake and a hammer duct taped to a pole.",
				" http://yfrog.com/gy39692910j",
				" http://plixi.com/p/75118565",
				" http://tweetphoto.com/38778902",
				" http://photozou.jp/photo/show/988749/66818642",
				" http://flic.kr/p/9frw4S",
				"A congratulatory bouquet for all the Academy Award nominees! #oscars http://twitpic.com/3tamvi"
				];
	// twitpic
	
	getImage(tweet[0]);
	getImage(tweet[1]);
	getImage(tweet[2]);
	getImage(tweet[3]);
	getImage(tweet[4]);
	getImage(tweet[5]);
	getImage(tweet[6]);
	
	function getImage(t)
	{
		var slug;
		
		for(var i in domains)
		{
			slug = t.match(domains[i].domain);
			//alert('slug: '+slug+' '+domains[i].domain)
			if(slug) 
			{
				//alert('match: '+slug[0]+', '+slug[1]+', '+domains[i].process);
				domains[i].process(slug[0], slug[1]);
				return true;
			}
		}
	}
	
	function plixi(url, id)
	{
		++imgID;
		var domID = 'media_'+imgID;
		var source = 'http://api.plixi.com/api/tpapi.svc/json/imagefromurl?size=thumbnail&url=http://tweetphoto.com/'+id;

		var image = new Image();
		image.onload = function()
		{
			var offsets = scaleImage(this)
			var bgstyle = "background:url('"+this.src+"') no-repeat;border:1px solid #FFF; width:75px; height:75px;";
			var positions = "background-position:"+offsets.x+"px "+offsets.y+"px;"
			var img = 'plixi<br /><li id="'+domID+'" class="thumb" style="'+bgstyle+positions+'"></li><br />';
			
			$('#img-list').append(img);
			
			$('#'+domID).qtip({
			   content: $('.info').html(),
			   style: { 
			      tip: 'bottomLeft',
				background: '#A2D959'
			   },
   				position: { corner: { target: 'topLeft', tooltip: 'bottomLeft'}}
			});
		};
		
		image.src = source;

	}
	
	function yFrog(url, id)
	{
		var source = "http://yfrog.com/"+id+":small";
		var image = new Image();
		image.onload = function()
		{
			var offsets = scaleImage(this)
			var bgstyle = "background:url('"+this.src+"') no-repeat; border:1px solid #FFF; width:75px; height:75px;";
			var positions = "background-position:"+offsets.x+"px "+offsets.y+"px;"
			var img = 'yfrog:<br/><li style="'+bgstyle+positions+'"></li><br />';
			$('#img-list').append(img);
		};
		
		image.src = source;
	}
	
	function twitpic(url, id)
	{
		var source = "http://twitpic.com/show/mini/"+id;
		var image = new Image();
		image.onload = function()
		{
			var offsets = scaleImage(this)
			var bgstyle = "background:url('"+this.src+"') no-repeat;border:1px solid #FFF; width:75px; height:75px;";
			var positions = "background-position:"+offsets.x+"px "+offsets.y+"px;"
			var img = 'Twitpic<br /><li style="'+bgstyle+positions+'"></li><br />';
			$('#img-list').append(img);
		};
		
		image.src = source;
	}
	
	function photozou(url, id)
	{
		var source = "http://photozou.jp/p/img/"+id;
		var image = new Image();
		image.onload = function()
		{
			var offsets = scaleImage(this)
			var bgstyle = "background:url('"+this.src+"') no-repeat; border:1px solid #FFF; width:75px; height:75px;";
			var positions = "background-position:"+offsets.x+"px "+offsets.y+"px;"
			var img = 'Photozou<br /><li style="'+bgstyle+positions+'"></li><br />';
			$('#img-list').append(img);
		};
		image.src = source;
	}
	
	
	function flickr( url, id )
	{
		key = "a99190c3186dafc012543e6e048865f3";
		secret = "6899beb0fb0c5513";
		var fid = url.split("http://flic.kr/p/")[1];
		id = base58_decode(fid);
		var apiURL="http://api.flickr.com/services/rest/";
		$.ajax({ 
			url: apiURL, 
			dataType: 'jsonp',
			data : 'method=flickr.photos.getInfo&api_key='+key+'&photo_id='+id+'&format=json&jsoncallback=?',
			success: onFlickrImgURL, 
			error: function(){alert('error conenctingf to twitter')} 
			});	
		// alert(apiURL);

		
		var source = "http://flic.kr/p/img/"+fid+"_s.jpg";
		var image = new Image();
		image.onload = function()
		{
			var offsets = scaleImage(this)
			var bgstyle = "background:url('"+this.src+"') no-repeat;border:1px solid #FFF; width:75px; height:75px;";
			var positions = "background-position:"+offsets.x+"px "+offsets.y+"px;"
			var img = 'Flickr<br /><li style="'+bgstyle+positions+'"></li><br />';
			$('#img-list').append(img);
		};
		image.src = source;
	}
	
	
	function onFlickrImgURL(d)
	{
		var url = "http://farm"+d.photo.farm+".static.flickr.com/"+d.photo.server+"/"+d.photo.id+"_"+d.photo.secret+"_z.jpg";
		var img = '<li>Flickr:<br /><img src="'+url+'" /></li>';
		//$('#img-list').append(img);
	}
	
	
	function base58_decode( id )
	{
	    var alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ' ;
	    var num = id.length ;
	    var decoded = 0 ;
	    var multi = 1 ;
	    for ( var i = (num-1) ; i >= 0 ; i-- )
	    {
	        decoded = decoded + multi * alphabet.indexOf( id[i] ) ;
	        multi = multi * alphabet.length ;
	    }
	    return decoded;
	}
	
	
	function scaleImage(img)
	{
		var max 	= 75;
		var orgW 	= img.width;
		var orgH 	= img.height;
		var centerX = max/2;
		var centerY = max/2;
		var offsetX = centerX-img.width/2;
		var offsetY = centerY-img.height/2;
		
		return {x:offsetX , y: offsetY};
	}
}