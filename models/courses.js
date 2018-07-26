const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
});

const User = mongoose.model("user", usersSchema);

module.exports = User;