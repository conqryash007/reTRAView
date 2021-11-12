const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello bsdk");
});

app.listen(3000);
