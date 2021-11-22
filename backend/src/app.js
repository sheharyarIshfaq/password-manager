const express = require("express");
const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Password Manager app listening at http://localhost:${port}`);
});
