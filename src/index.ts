import express, { Response, Request } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/ping", (_: Request, res: Response) => {
  res.send("pong");
});

const start = () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running on http://localhost:${process.env.PORT} 🚀`
      );
    });
  } catch (error) {
    console.error(error);
  }
};

start();
