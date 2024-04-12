const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dataRouter = require("./routes/DataRouter");
const methodOverride = require("method-override");
const cors = require('cors');

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())  

mongoose.connect("mongodb://localhost/electrifylt")
.then(() => console.log('DB connected'))
.catch((err) => { console.log(err.message) });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/api/data", dataRouter)


app.listen(9000, ()=>{
    console.log(`server running at http://localhost:${9000}`)
})