const express = require("express")
const connectDB = require("./config/database")
const User = require("./models/user")
const app = express()//creating new express js application
app.use(express.json())

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
        const user = await User.findByIdAndUpdate( userId, data, {
            returnDocument: "after"
        })
        res.send({ status: 200, message: "User Updated Successfully!!", data: [user] })
    }
    catch (err) {
        res.status(400).send("Something went Wrong")
    }
})

app.post("/signup", async (req, res) => {
    const user = new User(req.body)
    try {

        await user.save();
        res.send("Saved!!")
    }
    catch (err) {
        res.status(400).send("Error Saving the error" + err.message)
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


