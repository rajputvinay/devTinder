const express = require("express")

const app = express()//creating new express js application

//Request Handler
app.use("/user", [(req, res, next) => {
    // res.send("Hello from the / ")
    console.log("hello");
    next()
    res.send("Response1")
}, [(req, res, next) => {
    console.log("res2");
    next()
    res.send("Response2")
}], (req, res, next) => {
    console.log("res3");
    res.send("Response3")

}])

app.listen(7717, () => {
    console.log("Server is successfully listening on port 7717...");

});
