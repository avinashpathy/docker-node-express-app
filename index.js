const express = require("express");
const mongoose = require("mongoose");
const {MONGO_USER, MONGO_PASSWORD, MONGO_PORT, MONGO_IP} = require('./config/config');

const postRouter = require("./routes/postRoutes");

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
    mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("successfully connected to database"))
  .catch((e) => {
    console.log(e)
    setTimeout(connectWithRetry, 5000)
});
}

connectWithRetry();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h2>Hi there!!!</h2>");
});

app.use("/api/v1/posts", postRouter);

const port = process.env.port || 4000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
