const axios = require('axios');
const cheerio = require('cheerio');

async function fetchInstagramAPKVersions() {
  try {
    const response = await axios.get('https://www.apkmirror.com/uploads/?appcategory=instagram-instagram');
    const $ = cheerio.load(response.data);

    // Extract information from the HTML structure
    const versions = [];
    $('article').each((index, element) => {
      const version = {
        name: $(element).find('.fontBlack').text().trim(),
        downloadLink: $(element).find('.downloadButton').attr('href'),
        // Add other fields as needed
      };
      versions.push(version);
    });

    // Log the extracted data
    console.log('Extracted Versions:', versions);

    // Save data to MongoDB (you need to implement this part)
    // saveToMongoDB(versions);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

module.exports = fetchInstagramAPKVersions;
