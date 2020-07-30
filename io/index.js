let io;

function initIo(http) {
  if (io == null) {
    io = require("socket.io")(http);
    io.on("connection", (socket) => {
      console.log("a user connected");
    });
  }
  return io;
}

module.exports = initIo;
