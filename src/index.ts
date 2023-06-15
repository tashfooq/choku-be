import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import createServer from "./utils/server";

// get this port from env
const port = process.env.PORT;

const app = createServer();

app.listen(port, () => {
  console.log(`App running on ${port}`);
});
