const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    _id: { type: Number, required: true },

    firstname: {
        type: String,
        required: [true, "Please enter your firstname!"],
    },

    lastname: {
        type: String,
        required: [true, "Please enter your lastname!"],
    },
    emailid: {
        type: String,
        unique: false,
        required: [true, "Please enter your email!"],
    },

    Postdate: { type: String },

}, { timestamps: false })


const Employee = mongoose.model("employee", EmployeeSchema);
module.exports = (Employee);