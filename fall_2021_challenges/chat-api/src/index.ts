import "reflect-metadata";
import { createConnection } from "typeorm";
import { app } from "./app";

const checkEnvironmentVariable = () => {
    if (!process.env.MYSQL_HOST) {
        console.log("MYSQL_HOST environment variable not found");
        process.exit(1);
    }
    if (!process.env.MYSQL_USERNAME) {
        console.log("MYSQL_USERNAME environment variable not found");
        process.exit(1);
    }
    if (!process.env.MYSQL_PASSWORD) {
        console.log("MYSQL_PASSWORD environment variable not found");
        process.exit(1);
    }
    if (!process.env.MYSQL_DATABASE) {
        console.log("MYSQL_DATABASE environment variable not found");
        process.exit(1);
    }
};

const bootstrap = async () => {
    checkEnvironmentVariable();
    const connection = await createConnection({
        type: "mysql",
        host: process.env.MYSQL_HOST,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        entities: ["src/entity/**/*.ts"],
        synchronize: true,
    }).catch((error) => {
        console.log("Error connection to database");
        console.log(error);
        process.exit(1);
    });
    console.log("Connected to MySQL database");
    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
};

// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
bootstrap();
