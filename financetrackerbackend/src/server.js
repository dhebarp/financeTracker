require('dotenv').config();
const express = require('express')
const app = express()
require('./mongo');
const session = require('express-session');
const mortgageApi = require('./routes/mortgageApi.route');
const AuthRouter = require('./routes/Auth.route');
const PublicRouter = require('./routes/Public.route');
const cashflowApi = require('./routes/chashflowApi.route');

app.use(express.static('./financetrackerbackend/frontend'));
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'FinanceTracker cat on windowsill', //this is now our salt.
    name: 'cookie_crisp',
    cookie: { maxAge: 60000 }, //this is in seconds
    resave: false,
    saveUninitialized: false,
    rolling: true
}));

app.use('/public', PublicRouter);
app.use('/auth', AuthRouter);
app.use('/mortgage', mortgageApi);
app.use('/cashflow', cashflowApi);


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("port" + port);
});