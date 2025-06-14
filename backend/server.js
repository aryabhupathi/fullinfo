const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = 1111;
const allowedOrigin = "http://localhost:3000";
app.use(
  cors({
    origin: allowedOrigin,
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/mainp");
const db = mongoose.connection;
db.on("error", (error) => console.error("Error in DB connection:", error));
db.on("open", () => console.log("Connected to MongoDB"));
const Login = require("./routes/LoginRoute");
app.use("/auth", Login);
const NewAdmission = require("./routes/NewAdmissionRoute");
app.use("/admission", NewAdmission);
app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});
