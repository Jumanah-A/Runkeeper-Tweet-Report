function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	var activities = {};
	var freq = {};
	var longestDistance=0;
	var longestDistanceActivity;
	var shortestDistanceActivity;
	var shortestDistance = tweet_array.length;
	var activitiesFreq= Object.keys(activities);
	for(var i=0;i<tweet_array.length;i++)
	{
		var current = tweet_array[i];

		if(current.activityType !== 'unknown' && current.activityType !== '')
		{
			activities[current.activityType] ? activities[current.activityType]++ : activities[current.activityType] = 1;
			var distance = current.activityType;
			distance+="Dist";
			var weekend = current.activityType;
			weekend += "Weekend";
			var weekday = current.activityType;
			weekday += "Weekday";
			freq[distance] ? freq[distance] += parseFloat(current.distance) : freq[distance] = parseFloat(current.distance);
			if(current.time.getDay() === 6 || current.time.getDay()=== 7)
			{
				freq[weekend] ? freq[weekend]++ : freq[weekend] = 1;
			}
			else{
				freq[weekday] ? freq[weekday]++ : freq[weekday] = 1;

			}
		}
	}

	var activitiesFreq = Object.values(activities);
	var firstMost;
	var secondMost;
	var thirdMost;
	activitiesFreq.sort(function (a, b) { return b-a });
	for(var key in activities)
	{
		if (activities[key] === activitiesFreq[0])
		{
			firstMost = key;

		}else if (activities[key] === activitiesFreq[1]) {
			secondMost = key;

		}else if (activities[key] === activitiesFreq[2]) {
			thirdMost = key;
		}
	}
	for(key in freq)
	{
		if(key.endsWith("Dist"))
		{
			if (freq[key] > longestDistance) {
				longestDistance = freq[key];
				longestDistanceActivity = key.split("Dist")[0];
			} else if (freq[key] < shortestDistance) {
				shortestDistance = freq[key];
				shortestDistanceActivity = key.split("Dist")[0];
			}
		}
	}
	var weekLonger = freq[longestDistanceActivity + "Weekday"] > freq[longestDistanceActivity + "Weekend"] ? "Weekdays":"Weekends";
	$(document).ready(function () {
		$('#numberActivities').text(activitiesFreq.length);
		$('#firstMost').text(firstMost);
		$('#secondMost').text(secondMost);
		$('#thirdMost').text(thirdMost);
		$('#longestActivityType').text(longestDistanceActivity);
		$('#shortestActivityType').text(shortestDistanceActivity);
		$('#weekdayOrWeekendLonger').text(weekLonger);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_array
	  }
	  //TODO: Add mark and encoding
	};
	// vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
