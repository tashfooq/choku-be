const jwt = require("jsonwebtoken");
const client = require("../configs/database");

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    console.log("this is the decoded shit", user);
    // const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [
    //   email,
    // ]); //Verifying if the user exists in the database
    if (err) req.user = undefined;
    req.user = user;
    next();
  });
};
