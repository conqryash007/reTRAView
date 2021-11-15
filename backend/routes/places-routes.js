const express = require("express");
const router = express.Router();
const httpError = require("./../models/http-error");

const USERS_DATA = [
  {
    name: "yash",
    description: "fukachand",
    id: "p1",
    creator: "c1",
  },
  {
    name: "ravan",
    description: "",
    id: "p2",
    creator: "c2",
  },
];

router.get("/:pid", (req, res, next) => {
  const sendData = USERS_DATA.find((data) => {
    return data.id === req.params.pid;
  });

  if (!sendData) {
    return next(new httpError("Cannot find place id.", 404));
  }

  res.json({ sendData });
});

router.get("/users/:uid", (req, res, next) => {
  const sendData = USERS_DATA.find((data) => {
    return data.creator === req.params.uid;
  });

  if (!sendData) {
    return next(new httpError("Cannot find place user id.", 404));
  }

  res.json({ sendData });
});

module.exports = router;
