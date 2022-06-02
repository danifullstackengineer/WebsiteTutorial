// --- 3rd party or built-in imports --- //

// This is our express dependency to create an express app.
import express from "express";
// This is for cors middleware for development only
import cors from "cors";
// This is for MongoDB
import mongoose from "mongoose";
// This is middleware for body. Serves the purpose of validating the body
import bodyParser from "body-parser";
// Import dotenv and initialize it so we can use it throughout our server.
import dotenv from "dotenv";
dotenv.config();
// Import path so we can set up the directory from where to serve our app.
import path from "path";
// Used to setup graphql middleware
import { graphqlHTTP } from "express-graphql";

// --- Owned imports --- //

// Importing our schema so we can set up the graphql middleware
import schema from "./GraphQL/schema";
// Import the router to handle all app routing.
import router from "./routes/router";

// Initialize the app.
const app = express();

// Use bodyParser middleware to check body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use router
app.use("/", router);
// Set up our GraphQL middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV !== "production",
  })
);
// Do middleware based on if in production or not.
if (process.env.NODE_ENV === "production") {
  // Sets up the build dir for our app
  app.use(path.join(__dirname, "..", "client", "build"));
  app.get("*", async (_: express.Request, res: express.Response) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
} else {
  // Sets up cors
  app.use(cors());
}

// Create a constant for our port, can be almost anythig. If in production, let heroku choose the port
const PORT = process.env.PORT || 5000;

// Set up our mongodb connection using mongoose.
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(`Connected to database...`);
      // Make our app listen to incoming data streams on PORT 5000
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}...`);
      });
    })
    .catch((err: unknown) => {
      // Handle the error. Since we only initialize our server once, after the build/compilation
      // this is enough to prevent any errors during production.
      console.log(`Mongoose responded with error: ${err}`);
    });
} else {
  // Throw error since we have not set up our ENV file properly.
  throw new Error("Please make sure you have a MONGO_URI environment value.");
}
