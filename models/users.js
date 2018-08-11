const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    userType: {type: String, required: false},
    firstName: { type: String, required: true},
    lastName: {type: String, required: false},
    email: {type: String, match: [/.+@.+\..+/, "Please enter a valid e-mail address"]},
    password: { type: String, required: true },
    imageUrl: {type: String, required: false},
    phone: { type: Number, required: false },
    birth_date: { type: Date, required: false },
    address: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    province: { type: String, required: false },
    zip_code: { type: String, required: false },
    // courses: [{ type: Schema.Types.ObjectId, required: false, ref: "courses"}],
    // richCorePayments:[{type: Schema.Types.ObjectId, required: false, ref: "richCorePayment"}]
});

const User = mongoose.model("user", usersSchema);

module.exports = User;