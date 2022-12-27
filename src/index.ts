import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import createServer from "./utils/server";
import { client } from "./configs/database";

// get this port from env
const port = 3001;

const app = createServer();

client.connect((err: string) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database connected");
  }
});

app.listen(port, () => {
  console.log(`App running on ${port}`);
});
