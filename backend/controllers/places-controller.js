const httpError = require("./../models/http-error");
const { validationResult } = require("express-validator");
const Place = require("./../models/place");
const User = require("./../models/user");

const mongoose = require("mongoose");

// function to get places by id

exports.getPlaceById = async (req, res, next) => {
  let sendData;
  try {
    sendData = await Place.findById(req.params.pid);
  } catch (err) {
    return next(new httpError("Something went wrong!", 500));
  }

  if (!sendData) {
    return next(new httpError("Cannot find place id.", 404));
  }

  res.json({ place: sendData.toObject({ getters: true }) });
};

// function to get places by id

exports.getPlacesByUser = async (req, res, next) => {
  let sendData;
  try {
    sendData = await Place.find({ creator: req.params.uid });
  } catch (err) {
    return next(new httpError("Something went wrong!", 500));
  }

  if (!sendData || sendData.length === 0) {
    return next(new httpError("Cannot find place user id.", 404));
  }

  res.json({ place: sendData.map((p) => p.toObject({ getters: true })) });
};

// function to create place on db

exports.createPlace = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("Invalid input ,please check your data", 422));
  }
  const { title, description, address, creator } = req.body;

  const coordinate = {
    lat: 41.890251,
    lng: 12.492373,
  };

  //coordinates will come from react
  // const { title, description, address, creator,cord } = req.body;
  // const coordinate = cord ;

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    return next(
      new httpError("Something wen wrong with creation of place", 500)
    );
  }

  if (!user) {
    return next(new httpError("No creator found !", 500));
  }

  const createdPlace = new Place({
    title,
    description,
    location: coordinate,
    address,
    creator,
    image: "https://en.wikipedia.org/wiki/Colosseum#/media/File:Roma06(js).jpg",
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    await user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new httpError(err.message, 500));
  }

  res.status(201).json({ place: createdPlace });
};

// function to update place on db

exports.updatePlaceById = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("Invalid input ,please check your data", 422));
  }
  const id = req.params.pid;
  const incData = req.body;

  let place;
  try {
    place = await Place.findById(id);
  } catch (err) {
    return next(new httpError("Something went wrong!", 500));
  }
  place.description = incData.description;
  place.title = incData.title;

  try {
    await place.save();
  } catch (err) {
    return next(
      new httpError("Something went wrong!, Couldn't update place", 500)
    );
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

//function to delete place by id

exports.deletePlaceById = async (req, res, next) => {
  const id = req.params.pid;
  let place;
  try {
    place = await Place.findById(id).populate("creator");
  } catch (err) {
    return next(new httpError("Something went wrong!", 500));
  }

  if (!place) {
    return next(new httpError("Could not find the place !", 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new httpError("Something went wrong!, Couldn't update place", 500)
    );
  }

  res.status(200).json({ message: "deletion successful" });
};
