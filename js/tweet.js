"use strict";
class Tweet {
    constructor(tweet_text, tweet_time) {
        this.text = tweet_text;
        this.time = new Date(tweet_time); //, "ddd MMM D HH:mm:ss Z YYYY"
    }
    //returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source() {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        var current = this.text;
        if (current.startsWith("Just posted") || current.toLowerCase().includes("completed")) {
            return 'completed_event';
        }
        else if (current.startsWith("Achieved") || current.includes("goal")) {
            return 'achievement';
        }
        else if (current.includes("now")) {
            return 'live_event';
        }
        else {
            return 'miscellaneous';
        }
    }
    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written() {
        //TODO: identify whether the tweet is written
        var current = this.text.split('https')[0];
        if (current.endsWith("@Runkeeper. Check it out! ")) {
            return false;
        }
        else {
            return true;
        }
    }
    get writtenText() {
        if (!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        return this.text.split("http")[0];
    }
    get activityType() {
        if (this.source != 'completed_event') {
            return "unknown";
        }else{
            if (this.text.startsWith("Just completed a")) {
                var extractActivity = this.text.split("Just completed a")[1].split(" ");

                // console.log(parseFloat(x[1]))
                // console.log(x[1]);
                // console.log(x[2])
                return extractActivity[3];
            } else if (this.text.startsWith("Just posted a")) {
                console.log("posted")
            } else if (this.text.startsWith("Completed a")) {

            }
        }
        return "";
    }
    get distance() {
        if (this.source != 'completed_event') {
            return 0;
        }else
        {
            if (tweet_array[i].text.startsWith("Just completed a")) {
                var extractDistance = tweet_array[i].text.split("Just completed a")[1].split(" ");
                var distance = extractDistance[2] === "km" ? parseFloat(extractDistance[1]) * 0.621371 : parseFloat(extractDistance[1]);
                return distance;
            }
            else if (tweet_array[i].text.startsWith("Just posted a")) {
                console.log("posted")
            } else if (tweet_array[i].text.startsWith("Completed a")) {
                console.log("hi")
            }

        }
        //TODO: prase the distance from the text of the tweet
        return 0;
    }
    getHTMLTableRow(rowNumber) {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}
