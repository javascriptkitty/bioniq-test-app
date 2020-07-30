const express = require("express");
const WebSocket = require("ws");
const mongoose = require("mongoose");

const app = express();
const http = require("http").createServer(app);
require("./io")(http);
const routes = require("./routes");
const PORT = process.env.PORT || 8080;

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

//initialize the WebSocket server instance
// const wss = new WebSocket.Server({ app });
// wss.on("connection", (ws) => {
//   //connection is up, let's add a simple simple event
//   ws.on("message", (message) => {
//     //log the received message and send it back to the client
//     console.log("received: %s", message);
//     ws.send(`Hello, you sent -> ${message}`);
//   });

//   //send immediatly a feedback to the incoming connection
//   ws.send("Hi there, I am a WebSocket server");
// });

// Connect to the Mongo DB
mongoose.connect("mongodb://127.0.0.1:27017/todo-db", {
  useCreateIndex: true,
  useNewUrlParser: true,
});

// Start the API server
http.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
