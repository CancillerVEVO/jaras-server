import express, { Response, Request } from "express";
import config from "./config";

const app = express();

app.get("/ping", (_: Request, res: Response) => {
  res.send("pong");
});

const PORT = config.server.port;

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT} 🚀`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
