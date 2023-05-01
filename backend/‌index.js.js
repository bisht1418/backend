const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { connectDB } = require("./config/db");
const { auth } = require("./middleware/auth.middleware");
const { userRouter } = require("./routers/user.routers");
const { noteRouter } = require("./routers/notes.routes");
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);

//Procted Routes
app.use(auth);

app.use("/notes", noteRouter);

app.get("/movies", (req, res) => {
  res.status(200).send("Movie Data");
});

app.get("/series", (req, res) => {
  res.status(200).send("Series Data");
});

app.listen(port, async () => {
  try {
    await connectDB();
  } catch (error) {
    console.log({ error });
  }
  console.log(`connected to the port : ${port}`);
});
