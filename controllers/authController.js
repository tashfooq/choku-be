const bcrypt = require("bcrypt");
const client = require("../configs/database");
const jwt = require("jsonwebtoken");
const { JsonWebTokenError } = require("jsonwebtoken");

const register = async (req, res) => {
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

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]); //Verifying if the user exists in the database
    const user = data.rows;
    if (user.length === 0) {
      res.status(400).json({
        error: "User is not registered, Sign Up first.",
      });
    } else {
      bcrypt.compare(password, user[0].password, (err, result) => {
        //Comparing the hashed password
        if (err) {
          res.status(500).json({
            error: "Server error.",
          });
        } else if (result === true) {
          //Checking if credentials match

          const token = jwt.sign(
            {
              id: user[0].id,
              fistName: user[0].first_name,
              lastName: user[0].last_name,
              email: user[0].email,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "4h" }
          );
          res
            .status(200)
            .cookie("access_token", "Bearer " + token, {
              expires: new Date(Date.now() + 1 * 1800000), // cookie will be removed after 4 hours
              httpOnly: true,
            })
            .json({
              message: "User signed in!",
              accessToken: token,
            });
        } else {
          //Declaring the errors
          if (result !== true)
            res.status(400).json({
              error: "Enter correct password!",
            });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

const getUser = async (req, res) => {
  // console.log("THIS IS THE USER FROM /USER", req.user);
  console.log("OBJECT CONVERSION /USE", req.user);
  return res.status(200).json(req.user);
};

module.exports = { register, login, getUser };
