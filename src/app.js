const express = require("express")

const app = express()//creating new express js application

//Request Handler
app.use("/test", (req, res) => {
    res.send("Hello from the ")
})

app.listen(7717, () => {
    console.log("Server is successfully listening on port 7717...");

});
