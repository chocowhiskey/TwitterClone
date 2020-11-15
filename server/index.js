// import express library, still needs to do that, although installed with npm in terminal
const express = require("express");
const cors = require("cors");

// Creating an express application
const app = express();

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

app.post("/mews", (req, res) => {
  console.log(req.body);
});

// Listening
app.listen(5000, () => {
  console.log("Listening on http://localhost:5000");
});
