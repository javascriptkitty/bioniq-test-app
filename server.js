const express = require("express");
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

// Connect to the Mongo DB
mongoose.connect("mongodb://127.0.0.1:27017/todo-db", {
  useCreateIndex: true,
  useNewUrlParser: true,
});

// Start the API server
http.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
