const mongoose = require('mongoose');
const dbName = process.env.MONGO_COLLECTION || 'financetracker'
const MongoURI = process.env.MONGODB_URI || `mongodb://localhost/${dbName}` 
mongoose.connect( MongoURI , { useNewURLParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    //we're connected!
    console.log("Mongoose online")
         });
