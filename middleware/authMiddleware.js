const jwt = require("jsonwebtoken");
const client = require("../configs/database");

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    // console.log("this is the decoded shit", user);

    // make sure this throws some sort of error! (look into package that has preset errors like NEST JS)
    if (err) req.user = undefined;
    req.user = user;
    next();
  });
};
