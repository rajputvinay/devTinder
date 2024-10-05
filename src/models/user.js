const mongoose = require("mongoose");
const validator = require("validator")
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error("Invalid Email address " + value)
        }
    },
    age: {
        type: Number,
        min: 18,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        lowercase: true,
        validate(value) {
            if (!(["male", "female", "other"].includes(value)))
                throw new Error("User gender is not valid")
        }
    },
    photoUrl: {
        type: String,
        default: "https://www.realtechnirman.com/wp-content/uploads/2017/02/man-dummy.jpg",
        validate(value) {
            if (!validator.isURL(value))
                throw new Error("Invalid Profile URL")
        }
    },
    about: {
        type: String,
        default: "Hello, i am developer"
    },
    skills: {
        type: [String]
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("User", userSchema)