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
	for(var i=0;i<tweet_array.length;i++)
	{
		if (tweet_array[i].source === 'completed_event')
		{
			completedEvents++;
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
	document.querySelector('.completedEvents').innerText = completedEvents;
	document.querySelector('.completedEventsPct').innerText = completedEvents;
	document.querySelector('.liveEvents').innerText = completedEvents;
	document.querySelector('.liveEventsPct').innerText = completedEvents;
	document.querySelector('.achievements').innerText = completedEvents;
	document.querySelector('.achievementsPct').innerText = completedEvents;
	document.querySelector('.miscellaneous').innerText = completedEvents;
	document.querySelector('.miscellaneousPct').innerText = completedEvents;

	// $(document).ready(function () {
	// 	var objects = $(".main-class");
	// 	for (var obj of objects) {
	// 		console.log(obj);
	// 	}
	// });

}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
