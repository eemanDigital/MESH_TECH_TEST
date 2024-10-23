exports.registerUser = async (req, res) => {
  const sql =
    "INSERT INTO users ('username', 'password', 'firstname', 'lastname', 'salary', 'age', 'registerday', 'signintime') VALUES (?, ?, ?,?,?,?,?,?)";
};
