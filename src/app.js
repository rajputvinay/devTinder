const express = require("express")

const app = express()//creating new express js application

//Request Handler
app.get("/user", (req, res) => {
    res.send({firstname:"Vinay",lastname:"Rajput"})
})
app.post("/user", (req, res) => {
    res.send("Data Added Successfully!!");
})
app.use("/test/34", (req, res) => {
    res.send("Hello from the /test34")
})
app.use("/test", (req, res) => {
    res.send("Hello from the /test")
})

app.use("/", (req, res) => {
    res.send("Hello from the / ")
})
app.listen(7717, () => {
    console.log("Server is successfully listening on port 7717...");

});
