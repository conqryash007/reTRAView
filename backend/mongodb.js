const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect("")
  .then(() => {
    app.listen(5000);
    console.log("Server started successfully👍");
  })
  .catch((err) => {
    console.log(err.message);
  });
