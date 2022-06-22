import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/post.js";

const app = express();
dotenv.config()
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// every route inside the post routes is going to start with posts
app.use("/posts", postRoutes);
app.get("/", (req, res) => {
  res.send("Hello to MangoDB Backend");
});

//mongodb
const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000
//connect to databse
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen( PORT ,() => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
