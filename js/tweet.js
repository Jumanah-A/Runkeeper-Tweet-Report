"use strict";
class Tweet {
    constructor(tweet_text, tweet_time) {
        this.text = tweet_text;
        this.time = new Date(tweet_time); //, "ddd MMM D HH:mm:ss Z YYYY"
    }
    //returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source() {
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
        return this.text.split("http")[0];
    }
    get activityType() {
        if (this.source != 'completed_event') {
            return "unknown";
        }else{
            var extractActivity;
            if (this.text.startsWith("Just completed a")) {
                extractActivity = this.text.split("Just completed a")[1].split(" ");
                return extractActivity[3];
            } else if (this.text.startsWith("Just posted a")) {
                extractActivity = this.text.split("Just posted a")[1].split(" ");
                if (!isNaN(parseFloat(extractActivity[1]))) {
                    return extractActivity[3];
                }else{return "";}
            } else if (this.text.startsWith("Completed a")) {
                extractActivity = this.text.split("Completed a")[1].split(" ");
                return extractActivity[3];
            }
        }
    }
    get distance() {
        if (this.source != 'completed_event') {
            return 0;
        }else
        {
            var distance;
            var extractDistance;
            if (this.text.startsWith("Just completed a")) {
                extractDistance = this.text.split("Just completed a")[1].split(" ");
                distance = extractDistance[2] === "km" ? parseFloat(extractDistance[1]) * 0.621371 : parseFloat(extractDistance[1]);
                return distance.toFixed(2);
            }
            else if (this.text.startsWith("Just posted a")) {
                extractDistance = this.text.split("Just posted a")[1].split(" ");
                if (!isNaN(parseFloat(extractDistance[1]))) {
                    distance = extractDistance[2] === "km" ? parseFloat(extractDistance[1]) * 0.621371 : parseFloat(extractDistance[1]);
                    return distance.toFixed(2);
                } else { return ""; }
            } else if (this.text.startsWith("Completed a")) {
                extractDistance = this.text.split("Completed a")[1].split(" ");
                distance = extractDistance[2] === "km" ? parseFloat(extractDistance[1]) * 0.621371 : parseFloat(extractDistance[1]);
                return distance.toFixed(2);
            }
        }
    }
    getHTMLTableRow(rowNumber) {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}
