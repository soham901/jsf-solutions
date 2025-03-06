const express = require("express");

const app = express();

const users = [1, 2, 3, 5];

app.get("/", (req, res) => {
  res.send("Welcome to our courses site");
});

function checkIfPremiumUser(req, res, next) {
  if (users.find((u) => req.query.uid == u)) {
    next();
  } else {
    res.send("PELA COURSE LYO");
  }
}

app.get("/courses", checkIfPremiumUser, (req, res) => {
  res.send("THE MOST VALUABLE CONTENT OUT THERE ON THE EARTH");
});

app.get("/materials", checkIfPremiumUser, (req, res) => {
  res.send("THE MOST VALUABLE MATERIALS OUT THERE ON THE EARTH");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// npm init -y
// npm i express

// http://localhost:3000/courses?uid=1
