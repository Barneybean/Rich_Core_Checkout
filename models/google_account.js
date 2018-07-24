const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const googleSchema = new Schema({
    userType: {type: String, required: false},
    googleId: {type: String, required: true},
    googleImage: {type: String, required: true},
    googleEmail: {type: String, match: [/.+@.+\..+/, "Please enter a valid e-mail address"]},
    firstName: { type: String, required: true},
    lastName: {type: String, required: false},
    profileImage: { type: String, required: false },
    phone: { type: Number, required: false },
    birth_date: { type: Date, required: false },
    address: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zip_code: { type: String, required: false },
    courses: [{ type: Schema.Types.ObjectId, required: false, ref: "courses"}],
    richCorePayments:[{type: Schema.Types.ObjectId, required: false, ref: "richCorePayment"}]
})

const Google_Account = mongoose.model("google_account", googleSchema);

module.exports = Google_Account