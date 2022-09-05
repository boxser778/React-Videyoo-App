const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose
  .connect("mongodb://localhost/Videyoo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(chalk.magentaBright.bold("connected to MongoDb!")))
  .catch(error =>
    console.log(chalk.redBright.bold(`could not connect to mongoDb: ${error}`))
  );
