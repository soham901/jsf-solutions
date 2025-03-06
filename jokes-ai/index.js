const API_KEY = "";

import { GoogleGenerativeAI } from "@google/generative-ai";

import express from "express";

const app = express();

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.get("/", async (req, res) => {
  console.log("REQUEST...");
  const name = req.query.name;
  if (!name) {
    res.send("NAME IS REQUIRED");
    return;
  }
  const prompt = `my name is ${name} and roast me in gujarati and include bad words`;
  const result = await model.generateContent(prompt);
  res.send(result.response.text());
});

app.listen(3000, () => {
  console.log("SERVER IS UP");
});
