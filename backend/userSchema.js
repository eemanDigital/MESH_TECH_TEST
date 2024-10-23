const userSchema = `
CREATE TABLE IF NOT EXISTS users (
    userId VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    salary INT NOT NULL,
    age INT NOT NULL,
    registerday DATE NOT NULL,
    signintime DATETIME NULL
);
`;

module.exports = userSchema;
