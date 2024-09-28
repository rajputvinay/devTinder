const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://vinayrajput77175:VinayRajput%407717570080@vinayrajput.e9pnk.mongodb.net/devTinder"
    )
}

module.exports=connectDB
