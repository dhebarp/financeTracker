const express = require('express');
const mortgageApiRouter = express.Router();
require('../mongo');
const Mortgage = require('../models/mortgageSchema');

mortgageApiRouter.use(express.json());

//create
mortgageApiRouter.post('/new', async (req, res) => {
const newMortgage = await Mortgage.create(req.body);
newMortgage.save();
res.json({ status: 'mortgage created', newMortgage})
});

//read
mortgageApiRouter.get('/view/:id', async (req,res) => {
    console.log("ID TEXT: " , req.params.id)
    const mortgageInfo = await Mortgage.findById(req.params.id);
    console.log(mortgageInfo);
    res.send(mortgageInfo);
})
//update

//delete



module.exports = mortgageApiRouter;