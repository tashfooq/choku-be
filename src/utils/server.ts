import express from "express";
import cors from "cors";
import contentRoute from "../routes/contentRoute";
import progressRoute from "../routes/progressRoute";
import feedbackRoute from "../routes/feedbackRoute";

const createServer = () => {
  const app = express();
  const json = express.json();

  app.use(json);

  app.use(cors({ origin: "*" }));

  app.get("/", (req, res) => {
    res.status(200).send("This Worked!");
  });

  app.use("/content", contentRoute);

  app.use("/progress", progressRoute);

  app.use("/feedback", feedbackRoute);

  return app;
};

export default createServer;
