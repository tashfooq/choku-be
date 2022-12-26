require("./configs/dotenv");
import express from "express";
import cors from "cors";
import { client } from "./configs/database";
import authRoute from "./routes/authRoute";
import contentRoute from "./routes/contentRoute";
import progressRoute from "./routes/progressRoute";

const app = express();
const json = express.json();
const port = 3001;

client.connect((err: string) => {
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
