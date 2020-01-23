const express = require('express');
const session = require('express-session');
const AuthRouter = express.Router();
const userModel = require('../models/User.model')
const bcrypt = require('bcryptjs');

AuthRouter.use(express.json());

AuthRouter.post('/new', async (req, res) => {
    //create new user logic here
    // const salt = bcrypt.genSaltSync(10);
    const salt = process.env.SALT;

    req.body.password = bcrypt.hashSync(req.body.password, salt);
    req.body.token = bcrypt.hashSync(req.body.token, salt);

    const user = await userModel.create(req.body);
    user.save();

    res.json({ status: 'route works', id: user.id })

});

AuthRouter.get('/login', async (req, res) => {
    //login logic here
    const salt = process.env.SALT;

    //check for auth header
    if (!req.headers.authorization) {

        return res.status(400).json();
    }

    //extract user details from request
    const [authType, userPass] = req.headers.authorization.split(" "); //this is valid for bearer or basic auth.
    
    let user = null;


    //check database if user exists
    switch (authType) {
        case 'Basic':
            const userPassDecoded = Buffer.from(userPass, 'base64').toString();
            const [userName, userPassword] = userPassDecoded.split(":");
            user = await userModel.findOne({ login: userName, password: bcrypt.hashSync(userPassword, salt) }); // we need to pass the salted version as we cannot match the input otherwise
            break;
        case 'Bearer':
            user = await userModel.findOne({ token: bcrypt.hashSync(userPass, salt) });
            break;
    }

    if (!user) {
        return res, status(404).json({ status: 'user not found for invalid password' })
    }

    req.session.user = user

    res.json(user);
})

AuthRouter.get('/logout', (req, res) => {
    //logout logic here
    req.session.destroy();
    
    res.json({ status: 'logout route' })
})


module.exports = AuthRouter;