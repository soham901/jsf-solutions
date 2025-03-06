const express = require("express");

const app = express();

app.use((req, res, next) => {
  if (req.query.userId == "1") {
    next();
  } else {
    res.send("UNAUTHORIZED");
  }
});

app.get("/courses", (req, res) => {
  res.send("COURSES");
});

app.get("/materials", (req, res) => {
  res.send("Materials");
});

app.listen(3000, () => {
  console.log("SERVER IS UP");
});

// http://localhost:3000/pdfd1.pdf
// http://localhost:3000/first.png

// MIDDLEWARE
