const express = require('express');
const cashflowApiRouter = express.Router();
const cashflowModel = require('../models/Cashflow.model');

cashflowApiRouter.use((req,res,next) =>{

    if(req.session.user && req.session.user)
    next();
    else
    res.status(401).send('Forbidden! Maybe Login')
})
cashflowApiRouter.get('/', (req,res) => {
    res.send("You are logged in and can access dasboard" + req.session.user);
});

cashflowApiRouter.post('/new', async (req, res) => {
    req.body.user_id = req.session.user.id;
    const newCashflow = await cashflowModel.create(req.body);
    newCashflow.save();
    res.json({ status: 'cashflow data created', newCashflow });
});

cashflowApiRouter.get('/view/:month', async (req, res) => {
    req.body.user_id = req.session.user.id;
    const cashflowInfo = await cashflowModel.find({month: req.params.month, user_id: req.session.user.id });
    console.log(cashflowInfo);
    res.send(cashflowInfo);
});

cashflowApiRouter.put('/update/:id', async (req, res) => {
    req.body.user_id = req.session.user.id;
    const updateMortgageInfo = await cashflowModel.findOneAndUpdate(({ _id: req.params.id, user_id: req.session.user.id }), req.body, { new: true });
    res.send(updateMortgageInfo);
});

cashflowApiRouter.delete('/:id', async (req, res) => {
    // req.body.user_id = req.session.user.id;
    await cashflowModel.findOneAndDelete({ _id: req.params.id, user_id: req.session.user.id });
    res.status(200).json({ msg: 'Removed: ' + req.params.id })
});


module.exports = cashflowApiRouter;