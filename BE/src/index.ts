import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { env } from "./config";
import routes from "./User";
import middleware from "./User/middleware/error";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const http = require("http");
const socketIo = require("socket.io");

// bodyparser for json to string and cors for frontend backend connection
app.use(bodyParser.json());
app.use(cors());
app.use("/user", routes());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let onlineUsers: any = [];
const addNewUser = (username: any, socketId: any) => {
  !onlineUsers.some((user: any) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId: any) => {
  onlineUsers = onlineUsers.filter((user: any) => user.socketId !== socketId);
};

const getUser = (username: any) => {
  return onlineUsers.find((user: any) => user.username === username);
};

io.on("connection", (socket: any) => {
  console.log("Someone has connected", socket.id);
  socket.emit("from server", "hi");
  socket.on("from client", (username: any) => {
    console.log("hithere", username);
    io.emit("server", username);
    addNewUser(username, socket.id);
  });

  // socket.on("sendNotification", ({ senderName, receiverName }: any) => {
  //   const receiver = getUser(receiverName);
  //   console.log(receiver.socketId);
  //   io.to(receiver.socketId).emit("getNotification", {
  //     senderName,
  //   });
  // });

  socket.on("sendNotification", ({ senderName, receiverName }: any) => {
    console.log("sender and receiver", senderName, receiverName);
    const receiver = getUser(receiverName);
    if (receiver) {
      console.log(receiver.socketId);
      io.to(receiver.socketId).emit("getNotification", {
        senderName,
      });
    } else {
      console.error(`Receiver '${receiverName}' not found`);
    }
  });

  socket.on("disconnect", () => {
    console.log("someone has left");
    removeUser(socket.id);
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Server connected");
});

app.all("*", function (req, res) {
  res.status(404).send("Path not found");
});

app.use(middleware);

// app.listen(port, () => {
server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:4000`);
});
