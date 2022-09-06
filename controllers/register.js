const bcrypt = require("bcrypt");
const client = require("../configs/database");
const jwt = require("jsonwebtoken");
const { JsonWebTokenError } = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(process.env.JWT_SECRET_KEY);
  try {
    const data = await client.query(
      `SELECT * FROM users WHERE "email"='${email}'`
    );
    const rows = data.rows;

    if (rows.length !== 0) {
      return res.status(400).json({
        error: "Account already exists with that email.",
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(err).json({
            error: "Server error.",
          });
        }
        const user = {
          firstName,
          lastName,
          email,
          password: hash,
        };

        client.query(
          `INSERT INTO users (first_name, last_name, email, password, created_on) VALUES ('${
            user.firstName
          }', '${user.lastName}', '${user.email}', '${
            user.password
          }', '${new Date().toLocaleString()}');`,
          (err) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                error: "Database error.",
              });
            } else {
              res.status(201).send({ message: "Account created!" });
            }
          }
        );
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error while creating account!" });
  }
};
