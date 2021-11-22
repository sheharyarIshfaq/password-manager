const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const usersRouter = require("./routers/usersRouter");
const passwordsRouter = require("./routers/passwordsRouter");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/users", usersRouter);
app.use("/api/passwords", passwordsRouter);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@password-manager.sdsoa.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(
    app.listen(port, () => {
      console.log(`Server is listening on ${port}`);
    })
  )
  .catch((error) => {
    console.log(error);
  });
