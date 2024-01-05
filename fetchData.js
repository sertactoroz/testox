// fetchData.js
const axios = require('axios');

async function fetchInstagramAPKVersions() {
  try {
    const response = await axios.get('https://www.apkmirror.com/apk/instagram/instagram/');
    // Parse the data and extract the necessary information
    // Save data to MongoDB
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

module.exports = fetchInstagramAPKVersions;
