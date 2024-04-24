import express from "express";
import dotenv from "dotenv";

import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";
import { connectDb } from "./db/config";
import http from "http";
import { Server } from "socket.io";
import { UsersRouter } from "./routes/users";

dotenv.config();

export const app = express();
const httpServer = http.createServer(app);

export const io = new Server(httpServer);

io.on("connection", (socket) => {
  socket.emit("newConnection", { message: "a new client connected" });
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/user", UsersRouter);
app.get("/", (req: Request, res: Response) => {
  res.status(200).send(`app is working`);
});
const connectToDB = async () => {
  try {
    if (process.env.NODE_ENV === "test") {
      return null;
    }
    if (process.env.NODE_ENV === "remote") {
      await connectDb(
        process.env.REMOTE_MONGO ??
          "mongodb+srv://nichlabs:4JsAR0yT34fUO1Iq@nichlabsapp.thoorlb.mongodb.net/?retryWrites=true&w=majority&appName=NichlabsApp"
      );
      console.log("DB connected successfully! yes");
      httpServer.listen(process.env.PORT, () => {
        console.log(`Server up and running on ${process.env.PORT}`);
      });
      return;
    }

    await connectDb(
      process.env.MONGO ??
        "mongodb+srv://nichlabs:4JsAR0yT34fUO1Iq@nichlabsapp.thoorlb.mongodb.net/?retryWrites=true&w=majority&appName=NichlabsApp"
    );
    console.log("DB connected successfully");
    const used = process.memoryUsage();
    console.log(`Heap memory used ${JSON.stringify(used)}`);
    httpServer.listen(process.env.PORT, () => {
      console.log(`Server up and running on ${process.env.PORT} `);
    });
  } catch (err: any) {
    console.log(
      `Connection on ${process.env.REMOTE_MONGO} failed: ${err.message}`
    );
    console.log("Retrying connection...");

    setTimeout(connectToDB, 5000);
  }
};

connectToDB();
