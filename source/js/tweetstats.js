function TweetStats() 
{
	
	var totalCount 	 = $('#total-tweets');
	var tweetsPerSec = $('#total-tweets-second');
	var totalTweets	 = 0;
	
	//alert(addCommas(23456234));
	
	setTotalTweets(totalTweets);
	function setTotalTweets(n)
	{
		var n = addCommas(n);
		totalCount.text(n);
	}
	
	function setTweetsPerSec(n)
	{
		
	}
	
	
	function addCommas(nStr)
	{
		nStr = String(nStr);
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(nStr)) {
			nStr = nStr.replace(rgx, '$1' + ',' + '$2');
		}
		return nStr;
	}
	return this;
};
