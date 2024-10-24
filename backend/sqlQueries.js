const { pool } = require("./db");

// Create a table
const createTable = (schema) => {
  return new Promise((resolve, reject) => {
    pool.query(schema, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Check if a record exists in the database
const checkRecordExists = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results[0] : null);
      }
    });
  });
};

// Insert a record into the database
const insertRecord = (tableName, record) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${tableName} SET ?`;

    pool.query(query, record, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Get all records from the database
const getRecords = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users`;
    pool.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// search user by name
const searchUserByName = (firstName, lastName) => {
  return new Promise((resolve, reject) => {
    const params = [];

    let query = `SELECT * FROM users WHERE 1=1 `;

    if (firstName) {
      query += ` AND firstName= ?`;
      params.push(firstName);
    }
    if (lastName) {
      query += ` AND lastName= ?`;
      params.push(lastName);
    }
    pool.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// search user by id
const searchUserById = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE userId = ?`;
    pool.query(query, userId, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// search user by salary range
const searchBySalaryRange = (minSalary, maxSalary) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE salary BETWEEN ? AND ?`;
    pool.query(query, [minSalary, maxSalary], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
// search user by age range
const searchByAgeRange = (minAge, maxAge) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE age BETWEEN ? AND ?`;
    pool.query(query, [minAge, maxAge], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// search user who registered after a specific user
const searchUserAfterRegistration = (userId) => {
  return new Promise((resolve, reject) => {
    //  get user who registered after a specific user
    const query = `SELECT * FROM users WHERE registerday > (SELECT registerday FROM users WHERE userId= ?)`;

    pool.query(query, [userId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// search users who never signed in
const searchUsersNeverSignedIn = () => {
  return new Promise((resolve, reject) => {
    //  search users whose signintime is null
    const query = `SELECT * FROM users WHERE signintime IS NULL`;
    pool.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

//search users with same registration date
const searchUsersWithSameRegistrationDay = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM users WHERE registerday = (
        SELECT registerday FROM users WHERE userId = ?
      )`;
    pool.query(query, [userId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const searchUsersRegisteredToday = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE DATE(registerday)= CURDATE()`;
    pool.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  createTable,
  checkRecordExists,
  insertRecord,
  getRecords,
  searchUserByName,
  searchUserById,
  searchBySalaryRange,
  searchByAgeRange,
  searchUserAfterRegistration,
  searchUsersNeverSignedIn,
  searchUsersWithSameRegistrationDay,
  searchUsersRegisteredToday,
};
