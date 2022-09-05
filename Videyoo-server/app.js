require("./DB/connectToDb");
const express = require("express");
const app = express();
const serveIndex = require('serve-index')
const usersRouter = require("./Routes/Users/userRouter");
const videosRouter = require("./Routes/vi/videosRouter");
const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");

app.use('/uploads', express.static(__dirname + '/uploads'),serveIndex(__dirname + "/uploads"));
app.use(morgan(chalk.cyan(":method :url :status :response-time ms")));
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/videos", videosRouter);

const PORT = 8181;
app.listen(PORT, () =>
  console.log(chalk.blueBright.bold(`server run on: http://:localhost:${PORT}`))
);
