const httpError = require("./../models/http-error");
const User = require("./../models/user");
const { validationResult } = require("express-validator");

let USER_DUMMY = [
  {
    name: "Yash",
    email: "ajsh@gmail.com",
    password: "1234",
  },
  {
    name: "Tinku",
    email: "aasasjsh@gmail.com",
    password: "4321",
  },
];

exports.getUsers = (req, res) => {
  res.status(200).json({ users: USER_DUMMY });
};

exports.signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new httpError("Something wrong in the input field", 422));
  }
  const { name, email, password, places } = req.body;

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
    places,
    image: "https://static.toiimg.com/photo/83890830/83890830.jpg?v=3",
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new httpError("Something went wrong !", 500));
  }

  res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

exports.logIn = (req, res, next) => {
  const { email, password } = req.body;
  const currUser = USER_DUMMY.find((curr) => curr.email === email);
  if (!currUser || currUser.password !== password) {
    return next(new httpError("Could not identify user !"));
  }
  res.json({ message: "Logged In" });
};
