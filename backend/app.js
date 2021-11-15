const express = require("express");
const app = express();
const placesRoute = require("./routes/places-routes");

app.use("/api/places", placesRoute);
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Something went wrong !" });
});
app.listen(5000);
