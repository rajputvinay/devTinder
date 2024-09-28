const express = require("express")
const connectDB = require("./config/database")
const User = require("./models/user")
const app = express()//creating new express js application
app.use(express.json())
app.post("/signup", async (req, res) => {
    console.log(req.body);

    const user = new User(req.body)
    try{

        await user.save();
        res.send("Saved!!")
    }
    catch(err){
        res.status(400).send("Error Saving the error"+err.message)
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


