const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const User = require("../models/User");

// SIGN UP

async function signUp(req, res) {
  const { username, email, password, image } = req.body;

  try {
    // secure password saved in DB
    const hashedPassword = await bcrypt.hash(password, 8);

    // create new user in DB
    const newUser = new User({
      email,
      hashedPassword,
      username,
      image,
    });

    const response = await newUser.save();

    if (!response) {
      return res.status(500).json({ Error: "Failed to add new user" });
    }

    console.log("New User created successfully!");

    // if user created create JWT
    const token = jwt.sign({ id: response.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });
    console.log("token signup", token);

    return res.status(201).send({ token: token });
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

// SIGN IN

async function signIn(req, res) {
  const { username, email, password } = req.body;

  try {
    // search user in DB
    const user = await User.findOne({ email: email });
    console.log("user", user);
    // handle if no user found
    if (!user) {
      return res.status(404).send({ message: "Incorrect Credentials!" });
    }
    // if user found, check password
    const passwordIsValid = bcrypt.compareSync(password, user.hashedPassword);
    if (!passwordIsValid) {
      return res.status(404).send({ message: "Incorrect Credentials!" });
    }

    // if user exists and password is correct create JWT
    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });
    console.log("token sign in", token);
    return res.status(200).send({ token: token });
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

// SIGN OUT

async function signOut(req, res) {
  console.log(req);
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

module.exports = { signUp, signIn, signOut };
