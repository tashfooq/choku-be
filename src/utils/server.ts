import express from "express";
import cors from "cors";
import authRoute from "../routes/authRoute";
import contentRoute from "../routes/contentRoute";
import progressRoute from "../routes/progressRoute";

const createServer = () => {
  const app = express();
  const json = express.json();

  app.use(json);

  app.use(cors({ origin: "*" }));

  app.get("/", (req, res) => {
    res.status(200).send("This Worked!");
  });

  app.use("/auth", authRoute);

  app.use("/content", contentRoute);

  app.use("/progress", progressRoute);

  return app;
};

export default createServer;
