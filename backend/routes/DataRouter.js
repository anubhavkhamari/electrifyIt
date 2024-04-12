const express = require("express");
const Data = require("../models/dataModel")

const DataRouter = express.Router();

DataRouter.get('/', async (req, res) => {
    try {
        const data = await Data.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send("There's some error in Data Fetching", error.message);
    }

})

DataRouter.post("/", async (req, res) => {
    try {
        const data = new Data({
            licensePlate: req.body.licensePlate,
            make: req.body.make,
            vin: req.body.vin,
            model: req.body.model,
            type: req.body.type,
            date: req.body.date,
            milesDriven: req.body.milesDriven,
        })

        data.save();

        console.log(req.body.date)

        res.status(201).send("Data has been saved successfully");
    } catch (error) {
        console.log(error);
        res.status(404).send("Error : ", error.message)
    }
})

DataRouter.post("/specificdata", async (req, res) => {
    try {
        const data = await Data.find( { date: { $gte: new Date(`${req.body.gt}`), $lte: new Date(`${req.body.lt}`) } } )
        res.send(data)
    } catch (error) {
        console.log(error.message)
    }
})
module.exports = DataRouter;