const express = require("express")
const connectDB = require("./config/database")
const User = require("./models/user")
const { validateSignupData } = require("./utils/validation")
const brcypt = require("bcrypt")
const app = express()//creating new express js application
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const { userAuth } = require("./middlewares/auth")
app.use(express.json())
app.use(cookieParser())
app.post("/signup", async (req, res) => {
    try {
        validateSignupData(req)
        const { firstName, lastName, emailId, password, ...rest } = req.body;
        const passwordHash = await brcypt.hash(password, 10);
        console.log(passwordHash);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
            ...rest
        })
        await user.save()
        res.send("Signup Successfully")
    }
    catch (err) {
        res.status(400).send("Error:" + err.message)
    }
})

app.post("/login", async (req, res) => {
    try {

        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId });
        if (!user) {
            throw new Error("Login Credentials is not valid :Email")
        }
        const isPasswordValid = await brcypt.compare(password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign({ _id: user._id }, "DEV@TINDER$2003", { expiresIn: "0d" });
            res.cookie("Token", token)
            res.send("Login Successfully!!")
        }
        else {
            throw new Error("Login Credentials is not valid:password")
        }
    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
})

app.get("/profile", userAuth, async (req, res) => {
    try {

        const user = req.user
        res.send(user)

    }
    catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

app.delete("/user/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        await User.findByIdAndDelete(userId)
        res.send("User Deleted Successfully!!")
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }
})
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.find({ emailId: userEmail });
        if (user.length == 0)
            res.status(404).send("User not found");
        else
            res.send(user)
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }
})

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }
})
app.delete("/user/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        await User.findByIdAndDelete(userId)
        res.send("User Deleted Successfully!!")
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }
})

app.patch("/user/:id", async (req, res) => {
    const userId = req.params.id;
    const data = req.body;
    try {
        const allowed_updates = ["fristName", "lastName", "age", "skills", "gender", "about", "photoUrl"]
        const isUpdateAllow = Object.keys(data).every(key => allowed_updates.includes(key))
        if (!isUpdateAllow)
            throw new Error("Update not allowed")
        if (data?.skills?.length > 10)
            throw new Error("Skill should be less than 10 or 10")

        const user = await User.findByIdAndUpdate(userId, data, {
            returnDocument: "after",
            runValidators: true
        })
        res.send({ status: 200, message: "User Updated Successfully!!", data: [user] })
    }
    catch (err) {
        res.status(400).send("Error:  " + err.message)
    }
})



connectDB()
    .then(() => {
        console.log("Database Connected Successfully!!");
        app.listen(7717, () => {
            console.log("Server is successfully listening on port 7717...");
        });
    })
    .catch((err) => {
        console.error("Database can not be connected!!", err);
    });

