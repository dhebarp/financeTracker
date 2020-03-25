const express = require('express');
const mortgageApiRouter = express.Router();
const Mortgage = require('../models/Mortgage.model');

mortgageApiRouter.use(express.json());

//check for authentication.
mortgageApiRouter.use((req,res,next) =>{


    if(req.session.user && req.session.user)
    next();
    else
    res.status(401).send('Forbidden! Maybe Login')
})
mortgageApiRouter.get('/', (req,res) => {
    res.status(200).send("You are logged in and can access dasboard");
});


//create
mortgageApiRouter.post('/new', async (req, res) => {
     req.body.user_id = req.session.user.id;
const newMortgage = await Mortgage.create(req.body);
newMortgage.save();
res.json({ status: 'mortgage created', newMortgage});
});

//read
mortgageApiRouter.get('/view/:id', async (req,res) => {
    // console.log("ID TEXT: " , req.params.id)
    // console.log(req.session.user.id);
    const mortgageInfo = await Mortgage.findOne({_id: req.params.id, user_id: req.session.user.id});
    console.log(mortgageInfo);
    res.send(mortgageInfo);
})
//update
mortgageApiRouter.put('/update/:id', async (req, res) =>{
    req.body.user_id = req.session.user.id;
    const updateMortgageInfo = await Mortgage.findOneAndUpdate(({_id: req.params.id, user_id: req.session.user.id}), req.body, {new: true} );
    res.send(updateMortgageInfo);
})

//delete
mortgageApiRouter.delete('/delete/:id', async (req,res) =>{
    req.body.user_id = req.session.user.id;
    await Mortgage.findOneAndDelete({_id: req.params.id, user_id: req.session.user.id});
    res.status(200).json({msg: 'Removed: ' + req.params.id})
})


module.exports = mortgageApiRouter;