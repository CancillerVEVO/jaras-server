import express, { Response, Request } from "express";
import config from "./config";
import router from "./routes";
import { errorHandler } from "./utils/error.handler";
const app = express();

// Test route
app.get("/ping", (_: Request, res: Response) => {
  res.send("pong");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);
app.use(errorHandler);

const PORT = config.server.port;

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} 🚀`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
