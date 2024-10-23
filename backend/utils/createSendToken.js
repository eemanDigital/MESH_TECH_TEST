const jwt = require("jsonwebtoken");
const { pool } = require("../db");

// generate access token handler
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// send token handler to client after successful login
exports.createSendToken = async (user, statusCode, res) => {
  const token = generateToken(user.userId);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // update signintime in database
  const signInTime = new Date().toISOString().slice(0, 19).replace("T", " "); // format date to mysql datetime
  const query = `UPDATE users SET signintime = ? WHERE userId = ?`;
  await pool.query(query, [signInTime, user.userId]);

  user.password = undefined; // remove password from output
  res.status(statusCode).json({
    message: "success",
    token,
    data: {
      ...user,
      signintime: signInTime,
    },
  });
};
