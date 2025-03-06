// 14.1 : npm i mongoose

// 14.2
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test");

// 14.3
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test");
const Faculty = mongoose.model("Faculty", {
  name: String,
  age: Number,
  gender: String,
  department: String,
  phoneno: String,
});

const faculty = new Faculty({
  name: "Abc",
  age: 22,
  gender: "FEMALE",
  department: "CE",
  phoneno: "9999999999",
});

faculty.save().then(() => console.log("saved"));
