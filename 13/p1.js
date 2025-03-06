const express = require("express");
const app = express();

app.use((req, res, next) => {
  if (req.query.username == "abc") {
    next();
  } else {
    res.send("Not Authorized");
  }
});

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.listen(3000);

// MIDDLEWARE

// [ CLIENT ] -> [ MIDDLEWARE 1 ] -> [ SERVER ]
// [ CLIENT ] <- [ SERVER ]

// http://localhost:3000/
// http://localhost:3000?username=abc
