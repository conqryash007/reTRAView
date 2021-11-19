const httpError = require("./../models/http-error");
const User = require("./../models/user");
const { validationResult } = require("express-validator");

exports.getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(new httpError("Fetching user data failed !", 500));
  }
  res
    .status(200)
    .json({ users: users.map((u) => u.toObject({ getters: true })) });
};

exports.signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new httpError("Something wrong in the input field", 422));
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new httpError("SignUp failed! Try again.", 500));
  }
  if (existingUser) {
    return next(
      new httpError("User already exists. Please check input or login.", 500)
    );
  }

  const newUser = new User({
    name,
    email,
    password,
    places: [],
    image: "https://static.toiimg.com/photo/83890830/83890830.jpg?v=3",
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new httpError("Something went wrong !", 500));
  }

  res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

exports.logIn = async (req, res, next) => {
  const { email, password } = req.body;

  let currUser;
  try {
    currUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new httpError("Loggin in failed! Try again.", 500));
  }

  if (!currUser || currUser.password !== password) {
    return next(new httpError("Invalid credentials. Could not log in."));
  }
  res.json({ message: "Logged In" });
};
