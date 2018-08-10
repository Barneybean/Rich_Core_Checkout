const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const refNoSchema = new Schema({
    refNo: { type: Number, required: true },
})

const RefNo = mongoose.model("refNo", refNoSchema);

module.exports = RefNo