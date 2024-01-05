
//MongoDB boilerplate - direct copy

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://sertactoroz:<password>@cluster0.y6rtf7p.mongodb.net/?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

/////////////// OPENAI 

const axios = require('axios');
const mongoose = require('mongoose');
module.exports = async () => {
    try {
        await // MongoDB Bağlantısı
            mongoose.connect('mongodb+srv://sertactoroz:ly0ubaUYD4ymqNja@cluster0.y6rtf7p.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
        ;
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
};
// MongoDB Bağlantısı
// mongoose.connect('mongodb+srv://sertactoroz:<password>@cluster0.y6rtf7p.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect('mongodb+srv://sertactoroz:ly0ubaUYD4ymqNja@cluster0.y6rtf7p.mongodb.net/?retryWrites=true&w=majority');

// Veritabanı Şeması
const apkSchema = new mongoose.Schema({
    versionId: String,
    releaseDate: Date,
    variants: [{
        variantId: String,
        architecture: String,
        minAndroidVersion: String,
        dpi: String
    }]
});

const Apk = mongoose.model('Apk', apkSchema);

// APK Bilgilerini Çekme Fonksiyonu
async function fetchApkInfo() {
    try {
        const response = await axios.get('https://www.apkmirror.com/?post_type=app_release&searchtype=apk&s=instagram/');
        // TODO: Response'dan gerekli bilgileri çekme
        // sourcery skip: use-object-destructuring
        const versionId = response.data.versionId;
        // sourcery skip: use-object-destructuring
        const releaseDate = response.data.releaseDate;
        // sourcery skip: use-object-destructuring
        const variants = response.data.variants;

        // TODO: MongoDB'ye kaydetme
        const apk = new Apk({ versionId, releaseDate, variants });
        await apk.save();
    } catch (error) {
        console.error('APK bilgileri çekilirken hata oluştu:', error.message);
    }
}

// Uygulama İlk Çalıştığında Fonksiyonu Çağırma
fetchApkInfo();

// Dışardan Tetiklenebilen Fonksiyon
exports.fetchAndSaveApkInfo = fetchApkInfo;
