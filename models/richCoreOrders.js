const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const richCoreOrdersSchema = new Schema({
    refNo: {type: Number, required: true},
    amount: {type: Number, required: true},
    serialNumber: {type: String, required: false},
    courseCode: [{type: String, required: true}]    
});

const RichCoreOrders = mongoose.model("richCoreOrders", richCoreOrdersSchema);

module.exports = RichCoreOrders;