import express, { Application, Request, Response } from "express";
import { db } from "./database/db";
import { router } from "./routes";
import cors from "cors";

const app: Application = express();
app.use(express.json());
const port = 9000;

app.use(cors());
app.use(router);

try {
  app.listen(port, async () => {
    await db.sync();
    console.log("Server is running on port " + port);
  });
} catch (error) {
  console.log(`Error occurred: ${error}`);
}
