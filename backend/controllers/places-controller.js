const httpError = require("./../models/http-error");
const { validationResult } = require("express-validator");

let USERS_DATA = [
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

exports.getPlaceById = (req, res, next) => {
  const sendData = USERS_DATA.find((data) => {
    return data.id === req.params.pid;
  });

  if (!sendData) {
    return next(new httpError("Cannot find place id.", 404));
  }

  res.json({ sendData });
};

exports.getPlacesByUser = (req, res, next) => {
  const sendData = USERS_DATA.filter((data) => {
    return data.creator === req.params.uid;
  });

  if (!sendData || sendData.length === 0) {
    return next(new httpError("Cannot find place user id.", 404));
  }

  res.json({ sendData });
};

exports.createPlace = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("Invalid input ,please check your data", 422));
  }
  const { id, title, description, coordinate, address, creator } = req.body;
  const data = {
    title,
    description,
    location: coordinate,
    address,
    creator,
    id,
  };

  USERS_DATA.push(data);

  res.status(201).json({ data });
};

exports.updatePlaceById = (req, res) => {
  const id = req.params.uid;
  const incData = req.body;

  const place = {
    ...USERS_DATA.find((curr) => {
      return curr.id === id;
    }),
  };
  const indx = USERS_DATA.findIndex((curr) => curr.id === id);
  place.description = incData.description;
  place.title = incData.title;
  USERS_DATA[indx] = place;

  res.status(200).json({ place });
};

exports.deletePlaceById = (req, res) => {
  const id = req.params.uid;
  const indx = USERS_DATA.findIndex((curr) => curr.id === id);

  USERS_DATA.splice(indx, 1);
  res.status(200).json({ message: "deletion successful" });
};
