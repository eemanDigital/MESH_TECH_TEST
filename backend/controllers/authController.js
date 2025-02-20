// require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  createTable,
  checkRecordExists,
  insertRecord,
} = require("../sqlQueries");
const userSchema = require("../userSchema");
const { createSendToken } = require("../utils/createSendToken");

// ********************************
// Register a new user
// ********************************
exports.registerUser = async (req, res) => {
  // get user details from request body and trim inputs
  const username = req.body.username.trim();
  const firstName = req.body.firstName.trim();
  const lastName = req.body.lastName.trim();
  const password = req.body.password.trim();
  const salary = parseInt(req.body.salary, 10); // Ensure salary is an integer
  const age = parseInt(req.body.age, 10); // Ensure age is an integer

  //  check if all fields are provided
  if (!username || !firstName || !lastName || !password || !salary || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //  hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //  create new user object
  const newUser = {
    userId: uuidv4(),
    username,
    password: hashedPassword,
    firstName,
    lastName,
    salary,
    age,
    registerday: new Date().toISOString().slice(0, 19).replace("T", " "), // format date to mysql datetime
  };

  try {
    //create table with userschema value
    await createTable(userSchema);

    // check if user already registered
    const userExist = await checkRecordExists("users", "username", username);
    if (userExist) {
      res.status(409).json({ error: "User already exists" });
    } else {
      // insert user into record if not already existing
      await insertRecord("users", newUser);
      res.status(201).json({ message: "success", data: newUser });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ********************************
// Login User
// ********************************

exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Please, provide both your username and password",
    });
  }

  try {
    // Check if user exists
    const user = await checkRecordExists("users", "username", username);
    // If user does not exist
    if (!user) {
      return res.status(404).json({
        message: "User not found, register to gain access",
      });
    }

    // Compare password
    const checkPasswordMatch = await bcrypt.compare(password, user.password);

    // If password match is successful generate token and return response
    if (checkPasswordMatch) {
      // Generate token
      createSendToken(user, 200, res);
    } else {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

// get user login status
exports.isLoggedIn = (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "You are not logged in" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Invalid token. Please log in again." });
    }

    req.user = decoded; // Store the decoded user information in the request object
    return res.status(200).json({ isLoggedIn: true });
  });
};

// logout user
exports.logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // Set the cookie to expire immediately
  });
  res.status(200).json({ message: "Logout successful" });
};
