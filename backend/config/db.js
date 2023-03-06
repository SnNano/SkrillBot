const mongoose = require("mongoose");

const connectDB = async () => {
    // process.env.MONGO_URI
    var uri = `mongodb+srv://${process.env.MONGO_URL_NAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL_CLUSTER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
    try {
        const conn = await mongoose.connect(uri);
        console.log(`mongodb connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;
