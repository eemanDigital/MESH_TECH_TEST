const {
  getRecords,
  searchUserByName,
  searchUserById,
  searchBySalaryRange,
  searchByAgeRange,
  searchUserAfterRegistration,
  searchUsersNeverSignedIn,
  searchUsersWithSameRegistrationDay,
  searchUsersRegisteredToday,
} = require("../sqlQueries");
const catchAsyn = require("../utils/catchAsync");

// get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await getRecords();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ error: "Failed to get users" });
  }
};

// get users by name
exports.getUsersByName = async (req, res) => {
  const { firstName, lastName } = req.query;
  try {
    const users = await searchUserByName(firstName, lastName);
    res.status(200).json({ users });
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ error: "Failed to get users" });
  }
};

// get user by id
exports.getUserById = async (req, res) => {
  const { userId } = req.query;
  try {
    const users = await searchUserById(userId);
    res.status(200).json({ users });
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ error: "Failed to get users" });
  }
};

// get users by salary range
exports.getUsersBySalaryRange = async (req, res) => {
  const { min, max } = req.query;

  console.log(min, max);

  try {
    const users = await searchBySalaryRange(min, max);
    res.status(200).json({ users });
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ error: "Failed to get users" });
  }
};

// get users by age range
exports.getUsersByAgeRange = async (req, res) => {
  const { min, max } = req.query;

  try {
    const users = await searchByAgeRange(min, max);
    res.status(200).json({ users });
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ error: "Failed to get users" });
  }
};

// get users who registered after a specific user
exports.getUserRegisterAfter = async (req, res) => {
  const { userId } = req.params;

  try {
    const users = await searchUserAfterRegistration(userId);
    res.status(200).json({ users });
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ error: "Failed to get users" });
  }
};

// get users who registered after a specific user
exports.getUserNeverSignedIn = async (req, res) => {
  try {
    const users = await searchUsersNeverSignedIn();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ error: "Failed to get users" });
  }
};

// get users who registered on the same date
exports.getUserWithSameRegistrationDay = async (req, res) => {
  const { userId } = req.params;

  try {
    const users = await searchUsersWithSameRegistrationDay(userId);
    res.status(200).json({ users });
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ error: "Failed to get users" });
  }
};

// get users who registered after a specific user
exports.getUserRegisteredToday = async (req, res) => {
  try {
    const users = await searchUsersRegisteredToday();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ error: "Failed to get users" });
  }
};
