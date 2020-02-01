const express = require('express');
const PublicRouter = express.Router();
const userModel = require('../models/User.model')
const bcrypt = require('bcryptjs');

PublicRouter.use(express.json());

PublicRouter.post('/newuser', async (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password);
    const userCurrent = await userModel.findOne({username: req.body.username });
    if (userCurrent) {
        res.status(400).send({ message: 'User Already Exists' });
    } else {
        const { username, password, firstName, lastName, email } = req.body;
        const user = await userModel.create({ username, password, firstName, lastName, email });
        if (user) {
            res.status(201).send({ message: "user created, you may now sign in", userID: user.id })
        } else
        res.status(500).send("could not create user")
    }

});

module.exports = PublicRouter;