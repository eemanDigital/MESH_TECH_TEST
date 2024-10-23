const mysql = require("mysql");
const dbConfig = require("./dbConfig");

const pool = mysql.createPool(dbConfig); // Create a connection pool

// Connect to the database
const connectDB = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log({ error: err.message });
        return reject(err);
      }
      console.log("DataBase Connected");
      connection.release(); //  Release the connection back to the pool after getting the connection
      resolve();
    });
  });
};

module.exports = {
  pool,
  connectDB,
};
