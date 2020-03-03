const express = require('express');
const session = require('express-session');
const AuthRouter = express.Router();
const userModel = require('../models/User.model');
const bcrypt = require('bcryptjs');

//JSON paring Middleware.
AuthRouter.use(express.json());

AuthRouter.post('/login', async (req, res) => {
    //login logic here
    const {username, password} = req.body; //we are destructuring the req.body to get th user and password.
    
    const user = await userModel.findOne({username});
    if(user){
        const passwordCheck = await bcrypt.compare(password, user.password)//check password matches with user input
        if(passwordCheck) {
            console.log("valid user profile");
            req.session.user = {id: user.id};
            res.status(201).send({profile: {username: user.username, firstName: user.firstName}})
    } else {
        res.status(404).send({error: "Authentication Error"})
    }
}
});

AuthRouter.get('/logout', (req, res) => {
    const destory = req.session.destroy();
    if (destory) {
        console.log("session destoryed")
        res.status(200).send({ status: "user logged out succesfully" })
    } else
    res.status(400).send("unable to log user out")
});


module.exports = AuthRouter;