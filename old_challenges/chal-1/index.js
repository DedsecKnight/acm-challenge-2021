const mongoose = require("mongoose");
const { app } = require("./src/app");

const start = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
};

start();
