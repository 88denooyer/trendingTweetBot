/*
If you're reading this please consider the fact that I have never touched anything with
node or javascript before. This is my first attempt at something after reading
a few startup guides. Feel free to simplify this code and point out any mistakes or bugs.
*/


const twit = require('twit');
const T = new twit(require('./config.js'));
const fs = require('fs');
const util = require('util');
var schedule = require('node-schedule');

const endTweet = '\n\n\n\nThis is an automatically generated tweet using NodeJS \n\n#nodejs #tweetbot #computerscience';
// WOEID param for US
var params = { id: '23424977'}


/*
Posting job wouldnt work with the T.get inside so I moved them outside.
This will cause the trends file to write one minute before the file
is parsed by the post jobs. This surprisingly works...
*/
var getMorning = schedule.scheduleJob('1 0 9 * * *', function(){
	T.get('trends/place', params, morningData);
});

var getAfternoon = schedule.scheduleJob('1 42 14 * * *', function(){
	T.get('trends/place', params, afternoonData);
});

var getEvening = schedule.scheduleJob('1 0 18 * * *', function(){
	T.get('trends/place', params, eveningData);
});

var getNight = schedule.scheduleJob('1 0 22 * * *', function(){
	T.get('trends/place', params, nightData);
});


var morningPost = schedule.scheduleJob('1 1 9 * * *', function(){
	//T.get('trends/place', params, morningData);
	var myFile = require('./morningData.json');
	var profile = JSON.parse(JSON.stringify(myFile, undefined, 2));
	var trendId = profile[0].trends;
	var names = trendId[0];

	T.post('statuses/update', {status: 'This morning\'s trending topic is\n ' + '\'' + names.name + '\'' + endTweet}, function(err, data, response){
		console.log(data)
	})
});

var afternoonPost = schedule.scheduleJob('1 1 12 * * *', function(){
	//T.get('trends/place', params, afternoonData);
	var myFile = require('./afternoonData.json');
	var profile = JSON.parse(JSON.stringify(myFile, undefined, 2));
	var trendId = profile[0].trends;
	var names = trendId[0];

	T.post('statuses/update', {status: 'This afternoon\'s trending topic is\n ' + '\'' + names.name + '\'' + endTweet}, function(err, data, response){
		console.log(data)
	})
});

var eveningPost = schedule.scheduleJob('1 1 18 * * *', function(){
	//T.get('trends/place', params, eveningData);
	var myFile = require('./eveningData.json');
	var profile = JSON.parse(JSON.stringify(myFile, undefined, 2));
	var trendId = profile[0].trends;
	var names = trendId[0];

	T.post('statuses/update', {status: 'This evening\'s trending topic is\n ' + '\'' + names.name + '\'' + endTweet}, function(err, data, response){
		console.log(data)
	})
});

var nightPost = schedule.scheduleJob('1 1 22 * * *', function(){
	//T.get('trends/place', params, nightData);
	var myFile = require('./nightData.json');
	var profile = JSON.parse(JSON.stringify(myFile, undefined, 2));
	var trendId = profile[0].trends;
	var names = trendId[0];

	T.post('statuses/update', {status: 'Tonight\'s trending topis is\n ' + '\'' + names.name + '\'' + endTweet}, function(err, data, response){
		console.log(data)
	})
});


function morningData(err, data, response){
	var tweets = data;
	var json = JSON.stringify(tweets, undefined, 2);
	fs.writeFile('morningData.json', json, (err) => {
		if(err) throw err;
	});
}

function afternoonData(err, data, response){
	var tweets = data;
	var json = JSON.stringify(tweets, undefined, 2);
	fs.writeFile('afternoonData.json', json, (err) => {
		if(err) throw err;
	});
}

function eveningData(err, data, response){
	var tweets = data;
	var json = JSON.stringify(tweets, undefined, 2);
	fs.writeFile('eveningData.json', json, (err) => {
		if(err) throw err;
	});
}

function nightData(err, data, response){
	var tweets = data;
	var json = JSON.stringify(tweets, undefined, 2);
	fs.writeFile('nightData.json', json, (err) => {
		if(err) throw err;
	});
}


// 															TESTING GARBAGE
// ============================================================================
//																			IGNORE

// get('some twit function', some parameter, some function)
//T.get('trends/place', params, writeData);
//T.get('trends/place', params, morningData);
//T.get('trends/place', params, afternoonData);
//T.get('trends/place', params, eveningData);
//T.get('trends/place', params, nightData);

//T.get('trends/place', params, returnData);
// Prints to console
/*
function returnData(err, data, response){
	var tweets = data;
	console.log("THREE");
	return console.log(JSON.stringify(tweets, undefined));
}
*/
/*
// Writes to JSON File
function writeData(err, data, response){
	var tweets = data;
	var json = JSON.stringify(tweets, undefined, 2);
	fs.writeFile('firstJSONFile.json', json, (err) => {
		if(err) throw err;
		console.log('File saved');
	});
}
*/

/*
var myFile = require('./afternoonData.json');
var profile = JSON.parse(JSON.stringify(myFile, undefined, 2));
//console.log(profile[0].trends);
var trendId = profile[0].trends;
//console.log(trendId[0]);
var names = trendId[0];
console.log(names.name);
*/

//var index = profile[0].trends;
//var names = index[0];

/*
// Reading the file
var myFile = require('./firstJSONFile.json');
var profile = JSON.parse(JSON.stringify(myFile, undefined, 2));
//console.log(profile[0].trends);
var trendsInd = profile[0].trends;	// Lists all contents in trends
//console.log(trends[0]);
var names = trendsInd[0];	// Gets first value
*/
