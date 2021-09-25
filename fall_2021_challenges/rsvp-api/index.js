const { app } = require("./src/app");
const mongoose = require("mongoose");
const { oAuth2Client } = require("./src/google/auth");

const checkEnvironmentVariable = () => {
    if (!process.env.CLIENT_ID) {
        console.error("CLIENT_ID not found");
        process.exit(1);
    } else if (process.env.CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID") {
        console.error("CLIENT_ID is not initialized");
        process.exit(1);
    }

    if (!process.env.CLIENT_SECRET) {
        console.error("CLIENT_SECRET not found");
        process.exit(1);
    } else if (process.env.CLIENT_SECRET === "YOUR_GOOGLE_CLIENT_SECRET") {
        console.error("CLIENT_SECRET is not initialized");
        process.exit(1);
    }

    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET not found");
        process.exit(1);
    } else if (process.env.JWT_SECRET === "YOUR_JWT_SECRET") {
        console.error("JWT_SECRET is not initialized");
        process.exit(1);
    }

    if (!process.env.REDIRECT_URI) {
        console.error("REDIRECT_URI not found");
        process.exit(1);
    }
};

const bootstrap = async () => {
    checkEnvironmentVariable();

    process.env.AUTH_URL = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/calendar",
            "https://www.googleapis.com/auth/calendar.events",
        ],
    });

    await mongoose.connect("mongodb://db:27017/events").catch((err) => {
        console.log("Error connecting to DB");
        console.log(err);
        process.exit(1);
    });

    console.log("Connected to MongoDB");
    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
};

bootstrap();
