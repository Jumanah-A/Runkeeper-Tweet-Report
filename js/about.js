function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	var completedEvents = 0;
	var achievementEvents = 0;
	var liveEvents = 0;
	var miscellaneousEvents = 0;
	var totalEvents = tweet_array.length;
	var notUserWritted = 0;
	var userWritten = 0;
	for(var i=0;i<tweet_array.length;i++)
	{
		if (tweet_array[i].source === 'completed_event')
		{
			if (tweet_array[i].text.startsWith("Just completed a"))
			{
				var x = tweet_array[i].text.split("Just completed a")[1].split(" ");
				var distance = x[2] === "km" ? parseFloat(x[1]) * 0.621371 : parseFloat(x[1]);
				console.log("real: "+x[1]+ " converted "+distance);
				// console.log(x[2])
				// console.log(x[3])
			}
			else if (tweet_array[i].text.startsWith("Just posted a"))
			{
				console.log("posted")
			} else if (tweet_array[i].text.startsWith("Completed a"))
			{
				console.log("hi")
			}
			completedEvents++;
			if (tweet_array[i].written)
			{
				userWritten++;
			}else{
				notUserWritted++;
			}
		} else if (tweet_array[i].source === 'live_event') {
			liveEvents++;
		} else if (tweet_array[i].source === 'achievement') {
			achievementEvents++;
		}else{
			miscellaneousEvents++;
		}
	}


	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	var lastDate = new Date(tweet_array[0].time).toLocaleString("en-US", options);
	var firstDate = new Date(tweet_array[tweet_array.length-1].time).toLocaleString("en-US", options);

	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;
	document.getElementById('firstDate').innerText = firstDate;
	document.getElementById('lastDate').innerText = lastDate;

	$(document).ready(function () {
		$('.completedEvents').text(completedEvents);
		$('.completedEventsPct').text(((completedEvents/totalEvents)*100).toFixed(2)+"%");
		$('.liveEvents').text(liveEvents);
		$('.liveEventsPct').text(((liveEvents / totalEvents) * 100).toFixed(2) + "%");
		$('.achievements').text(achievementEvents);
		$('.achievementsPct').text(((achievementEvents / totalEvents) * 100).toFixed(2) + "%");
		$('.miscellaneous').text(miscellaneousEvents);
		$('.miscellaneousPct').text(((miscellaneousEvents / totalEvents) * 100).toFixed(2) + "%");
		$('.written').text(userWritten);
		$('.writtenPct').text(((userWritten / completedEvents) * 100).toFixed(2) + "%");
	});

}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
