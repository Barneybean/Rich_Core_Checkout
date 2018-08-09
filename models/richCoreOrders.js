const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const richCoreOrdersSchema = new Schema({
    refNo: {type: Number, required: true},
    serialNumber: {type: String, required: true},
    amount: {type: Number, required: true},
    coin: {type: String, required: true}, 
    comment: {type: String, required: true}, 
    payState: {type: String, required: false}, 
    tradeState: {type: String, required: false}, 
    sign: {type: String, required: true}, 
    email: {type: String, required: true},
    courseCode: [{type: String, required: false}]
});

const RichCoreOrders = mongoose.model("richCoreOrders", richCoreOrdersSchema);

module.exports = RichCoreOrders;