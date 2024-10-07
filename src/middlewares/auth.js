const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async(req, res, next) => {
    try {

        const { Token } = req.cookies;
        if(!Token)
            throw new Error("Invalid Token")
        const decodeMssg =await  jwt.verify(Token, "DEV@TINDER$2003");
        const { _id } = decodeMssg
        const user = await User.findById(_id);
        if(!user)
            throw new Error("User not found")
        req.user=user
        next()
    } catch (err) { res.status(400).send("ERROR : " + err.message) }
}
module.exports = {
    userAuth
}