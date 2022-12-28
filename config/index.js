const mongoose = require("mongoose");

const connectDB = async () => {
    const connex = await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
    if(connex) {
        console.log(`MongoDB connected`)
    }
}

module.exports = { connectDB }