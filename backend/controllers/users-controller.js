const httpError = require("./../models/http-error");
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

exports.signUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new httpError("Something wrong in the input field", 422));
  }
  const { name, email, password } = req.body;
  const p = {
    name,
    email,
    password,
    id: "u3",
  };
  USER_DUMMY.push(p);
  res.status(201).json({ createdUser: p });
};

exports.logIn = (req, res, next) => {
  const { email, password } = req.body;
  const currUser = USER_DUMMY.find((curr) => curr.email === email);
  if (!currUser || currUser.password !== password) {
    return next(new httpError("Could not identify user !"));
  }
  res.json({ message: "Logged In" });
};
