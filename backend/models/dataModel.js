const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema (
    {
        licensePlate : {type: String, require: true},
        make : {type: String, require: true },
        vin : {type: String, require: true },
        model : {type: String, require: true },
        type : {type: String, require: true },
        date : {type: Date , require: true },
        milesDriven : {type: Number, require: true },
    },
    {
        timestamps: true
    }
)


const Data = mongoose.model("Data", dataSchema);
module.exports = Data;