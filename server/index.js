// import express library, still needs to do that, although installed with npm in terminal
const express = require("express");
const cors = require("cors");
const monk = require("monk");

// Creating an express application
const app = express();

// Connect to db
const db = monk("localhost/meower");
const mews = db.get("mews");

// Cors is another middleware that adds those cors headers to it
app.use(cors());

// Sever needs to understand Json so get express json body parser, everything that has "content-type": "application/json" will be parsed this way
app.use(express.json());

// Creating home route
app.get("/", (req, res) => {
  res.json({
    message: "Meower! 😆",
  });
});

// If client calls the route /mews
app.get("/mews", (req, res) => {
  mews.find().then((mews) => {
    res.json(mews);
  });
});

// Validation
function isValidMew(mew) {
  return (
    mew.name &&
    mew.name.toString().trim() !== "" &&
    mew.content &&
    mew.content.toString().trim() !== ""
  );
}

app.post("/mews", (req, res) => {
  // Validate input, toString() is required for preventing injections
  if (isValidMew(req.body)) {
    const mew = {
      name: req.body.name.toString(),
      content: req.body.content.toString(),
      created: new Date(),
    };
    mews.insert(mew).then((createdMew) => {
      res.json(createdMew);
    });
  } else {
    res.status(422);
    res.json({
      message: "Hey! Name and Content are required!",
    });
  }
});

// Listening
app.listen(5000, () => {
  console.log("Listening on http://localhost:5000");
});
