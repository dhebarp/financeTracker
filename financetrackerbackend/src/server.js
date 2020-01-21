require('dotenv').config();
const express = require('express')
const app = express()
require('./mongo');
// const session = require('express-session');
const mortgageApi = require('./routes/mortgageApi.route');

//cookie setup. 
// app.use(session({
//     secret: 'FinanceTracker cat on windowsill', //this is now our salt.
//     name: 'ga_cookie_ftw',
//     cookie: { maxAge: 60000 }, //this is in seconds
//     resave: false,
//     saveUninitialized: false,
//     rolling: true
// }));

app.use('/api', mortgageApi);

const port = process.env.EXPRESS_PORT || 4000;
app.listen(port, () => {
    console.log("port" + port);
});