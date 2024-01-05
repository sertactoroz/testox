// api.js
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs'); // Set the view engine to EJS

const uri = "mongodb+srv://oxotest:Of5ZMdA53IMqmPzv@cluster0.veoxdfh.mongodb.net/";

app.get('/versions', async (req, res) => {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('oxo');
        const collection = database.collection('versions');

        // Fetch all versions
        const versions = await collection.find({}).toArray();

        // Render the HTML page with the versions data
        res.render('versions', { versions });
    } finally {
        await client.close();
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
