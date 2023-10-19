const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const coreJs = require("core-js");
const app = express();

const {
  categoryRouter,
  topicRouter,
  userRouter,
  authRoutes,
  contentRoutes,
  roleRouter,
} = require("../v1/routes");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/topics", topicRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/contents", contentRoutes);
app.use("/api/v1/roles", roleRouter);

module.exports = app;
