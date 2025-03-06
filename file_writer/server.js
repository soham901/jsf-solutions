const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
      "Access-Control-Max-Age": 2592000,
    };

    res.writeHead(200, headers);

    try {
      const text = req.url.split("=")[1];
      fs.appendFileSync("abc.txt", text.toString().replace("%20", " ") + "\n");
      res.end("Your file got written to our FS");
    } catch (e) {
      res.end("ERROR");
    }
  })
  .listen(3000, () => {
    console.log("Server is started");
  });
