# trendingTweetBot
Tweets the trending topic at a given time of the day.


## Requirements
- Twitter Dev Account
  - Apply for one [here](https://developer.twitter.com/)
- NodeJS
  - Download for your machine [here](https://nodejs.org/en/download/)

## How to Run!

```
mkdir <folder name>
cd <folder name>
vi config.js
```
Add the following lines to the `config.js` file
```
module.exports = {
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: '',
}
```

Initialize and Download node modules

```
npm init
// Run through the json setup...

npm install twit
npm install node-schedule
```


Get your keys and tokens from your Dev account

run `node bot.js`

# Issues
There might be an issue where the bot will not run if the json files for morning, afternoon, evening, and night haven't been created.

If that happens, either create your own files with the appropriate names (they'll get overwritten each time the cron job occurs) or just use the json files I've included in the repo when you clone.
