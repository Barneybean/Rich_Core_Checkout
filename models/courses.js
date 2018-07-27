const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursesSchema = new Schema({
    name: {type: String, required: true},
    courseCode: {type: String, required: true},
    tokenValue: {type: Number, required: true},
    courseImage: {type: String, required: false}
});

const Courses = mongoose.model("courses", coursesSchema);

module.exports = Courses;