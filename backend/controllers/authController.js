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

// generate access token handler
const generateToken = (userId) => {
  return jwt.sign({ userId }), process.env.JWT_SECRET, { expiresIn: "7d" };
};

console.log(process.env.JWT_SECRET);
// ********************************
// Register a new user
// ********************************
exports.registerUser = async (req, res) => {
  // get user details from request body
  const { username, firstName, lastName, password, salary, age } = req.body;

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
      res.status(201).json({ message: "User created!", data: newUser });
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
        message: "User not found",
      });
    }

    // Compare password
    const checkPasswordMatch = await bcrypt.compare(password, user.password);

    console.log(checkPasswordMatch);

    if (checkPasswordMatch) {
      return res.status(200).json({
        message: "Login successful",
        token: generateToken(user.userId),
      });
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
