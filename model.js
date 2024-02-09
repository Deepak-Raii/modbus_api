const mongoose = require("mongoose");
const modbusModel = mongoose.Schema({
    portName:{
        type:String
    },
    startAddress:{
        type:Number
    },
    quantity:{
        type:Number
    },
    meterId:{
        type:Number
    }
});

module.exports = mongoose.model("meter",modbusModel);