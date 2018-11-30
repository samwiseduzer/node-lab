const mongoose = require("mongoose");
const Models = require("../models");

// use built-in promises
mongoose.Promise = global.Promise;

module.exports = new Promise((resolve, reject) => {
  console.log("Connecting to DB: ", process.env.NODE_ENV);
  try {
    if (![1, 2].includes(mongoose.connection.readyState)) {
      console.log("connecting to db...");
      mongoose.connect(
        "mongodb://admin:MMvNX68sGb5pkCIj@cluster0-shard-00-00-ms4lz.mongodb.net:27017,cluster0-shard-00-01-ms4lz.mongodb.net:27017,cluster0-shard-00-02-ms4lz.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
        { autoIndex: !!process.env.ADDING_INDICES },
        err => {
          if (err) {
            console.log("Failed to connect:", err);
            reject(err);
          }
        }
      );
    } else {
      console.log("reusing old db connection...");
      resolve("connected");
    }
  } catch (err) {
    console.log("Failed to connect:", err);
    reject(err);
  }

  mongoose.connection.once("open", function() {
    // mongoose.set('debug', true);
    console.log("connected to DB");
    mongoose.connection.on("error", err => {
      console.log("Mongoose Error:");
      console.log(JSON.stringify(err));
    });
    mongoose.connection.on("disconnected", () => {
      console.log("-> lost connection");
    });
    mongoose.connection.on("index", err => {
      if (err) console.log("ERROR CREATING INDEXES:", err);
      else console.log("Successfully created indexes");
    });
    resolve("connected");
  });
});
