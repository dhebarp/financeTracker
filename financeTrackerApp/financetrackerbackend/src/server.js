require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');
const dbName = process.env.MONGO_COLLECTION || 'financetracker'
const MongoURI = process.env.MONGODB_URI || `mongodb://localhost/${dbName}` 
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mortgageApi = require('./routes/mortgageApi.route');
const AuthRouter = require('./routes/Auth.route');
const PublicRouter = require('./routes/Public.route');
const cashflowApi = require('./routes/chashflowApi.route');

app.use(cookieParser());
app.use(cors());
app.use(express.static('./financetrackerbackend/frontend'));
app.use(express.json())
app.use(express.urlencoded({extended: false}));

mongoose.Promise = global.Promise;
mongoose.connect( MongoURI , { useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    //we're connected!
    console.log("Mongoose online")
         });

app.use(session({
    secret: 'FinanceTracker cat on windowsill', //this is now our salt.
    name: 'cookie_crisp',
    cookie: { maxAge: 60000 }, //this is in seconds
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db })
}));

app.use('/public', PublicRouter);
app.use('/auth', AuthRouter);
app.use('/mortgage', mortgageApi);
app.use('/cashflow', cashflowApi);


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("port" + port);
});