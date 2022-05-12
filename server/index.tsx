// --- 3rd party or built-in imports --- //

// This is our express dependency to create an express app.
const express = require("express");
// This is for cors middleware for development only
const cors = require("cors");
// This is for MongoDB
const mongoose = require("mongoose");
// This is middleware for body. Serves the purpose of validating the body
const bodyParser = require("body-parser");
// Import dotenv and initialize it so we can use it throughout our server.
const dotenv = require("dotenv").config();
// Import path so we can set up the directory from where to serve our app.
const path = require("path");
// Used to setup graphql middleware
const {graphqlHTTP} = require("express-graphql");

// --- Owned imports --- //

// Importing our schema so we can set up the graphql middleware
const schema = require("./GraphQL/schema");

// Initialize the app.
const app = express();

// Use bodyParser middleware to check body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Do middleware based on if in production or not.
if (process.env.NODE_ENV === "production") {
  // Sets up cors
  app.use(cors());

  // Sets up the build dir for our app
  app.use(path.join(__dirname, "..", "client", "build"));
  app.get("*", (_:any, res:any) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

// Create a constant for our port, can be almost anythig.
const PORT = 5000;

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
    .catch((err:any) => {
      // Handle the error. Since we only initialize our server once, after the build/compilation
      // this is enough to prevent any errors during production.
      console.log(`Mongoose responded with error: ${err}`);
    });
} else {
  // Throw error since we have not set up our ENV file properly.
  throw new Error("Please make sure you have a MONGO_URI environment value.");
}

// Set up our GraphQL middleware
app.use(
  "/graphql",
  graphqlHTTP({
    // Had to ignore the TS error. It works fine, but not sure why it gives this error?
    // @ts-ignore
    schema: schema,
    graphiql: process.env.NODE_ENV !== "production",
  })
);
