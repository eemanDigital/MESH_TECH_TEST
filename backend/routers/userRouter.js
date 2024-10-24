const express = require("express");
const {
  registerUser,
  loginUser,
  isLoggedIn,
  logoutUser,
} = require("../controllers/authController");
const {
  getUsers,
  getUsersByName,
  getUserById,
  getUsersBySalaryRange,
  getUsersByAgeRange,
  getUserRegisterAfter,
  getUserNeverSignedIn,
  getUserWithSameRegistrationDay,
  getUserRegisteredToday,
} = require("../controllers/usersController");

const router = express.Router();

router.get("/", getUsers);
router.get("/search-by-name", getUsersByName);
router.get("/search-by-id", getUserById);
router.get("/search-by-salaryRange", getUsersBySalaryRange);
router.get("/search-by-ageRange", getUsersByAgeRange);
router.get("/never-signedIn", getUserNeverSignedIn);
router.get("/register-today", getUserRegisteredToday);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/isLoggedIn", isLoggedIn);
router.get("/logout", logoutUser);
router.get("/registeredafter/:userId", getUserRegisterAfter);
router.get(
  "/user-with-same-registration/:userId",
  getUserWithSameRegistrationDay
);

module.exports = router;
