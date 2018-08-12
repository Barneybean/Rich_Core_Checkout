const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const richCoreOrdersSchema = new Schema({
    refNo: {type: Number, required: true},
    serialNumber: {type: String, required: false},
    amount: {type: Number, required: false},
    coin: {type: String, required: false}, 
    comment: {type: String, required: false}, 
    payState: {type: String, required: false}, 
    tradeState: {type: String, required: false}, 
    sign: {type: String, required: false}, 
    firstName: { type: String, required: true},
    lastName: {type: String, required: false},
    email: {type: String, required: true, match: [/.+@.+\..+/, "Please enter a valid e-mail address"]},
    courseIds: [{ type: Schema.Types.ObjectId, required: false, ref: "courses"}],
    address: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    province: { type: String, required: false },
    zip_code: { type: String, required: false },
    time : { type : Date, default: Date.now }
});

const RichCoreOrders = mongoose.model("richCoreOrders", richCoreOrdersSchema);

module.exports = RichCoreOrders;