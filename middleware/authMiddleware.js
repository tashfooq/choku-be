const jwt = require("jsonwebtoken");
const client = require("../configs/database");

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  //only seeing bearer here
  // console.log(token);
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    // console.log("this is the decoded shit", user);

    // make sure this throws some sort of error! (look into package that has preset errors like NEST JS)
    console.log(token);
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    // console.log(user);
    req.user = user;
    next();
  });
};
