const { getFormattedDate } = require("./date");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const logItem = `${(getFormattedDate())}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.error(err);
  }
};

const logger = (socket, next) => {
  logEvents(`Socket connected: ${socket.id}`, "server.txt");

  socket.onAny((event, ...args) => {
    logEvents(`Event: ${event}\tData: ${JSON.stringify(args)}`, "client.txt");
  });

  socket.on("disconnect", () => {
    logEvents(`Socket disconnected: ${socket.id}`, "server.txt");
  });

  next();
};

module.exports = logger;
