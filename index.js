// index.js
const fetchData = require('./fetchData');
const saveToMongoDB = require('./mongoDB');
const api = require('./api');
// const checkCompatibility = require('./optionalControl.js');

// Fetch data and save to MongoDB
fetchData().then(data => saveToMongoDB(data));

// Optional - Check compatibility
const requestData = {
    agent: 'Instagram 263.2.0.19.104 Android (21/5; 280dpi; 720x1382; samsung; SM-A105F; a10; exynos7884B; en_IN; 366308842)'
};
// checkCompatibility(requestData);
