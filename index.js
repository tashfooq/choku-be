require("./configs/dotenv");
const express = require("express");
const app = express();
const json = express.json();
const cors = require("cors");
const port = 3001;

const client = require("./configs/database");
const authRoute = require("./routes/authRoute");
const contentRoute = require("./routes/contentRoute");
const progressRoute = require("./routes/progressRoute");

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database connected");
  }
});

app.use(json);

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.status(200).send("This Worked!");
});

app.use("/auth", authRoute);

app.use("/content", contentRoute);

app.use("/progress", progressRoute);

app.listen(port, () => {
  console.log(`App running on ${port}`);
});
