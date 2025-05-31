const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const nodemailer = require("nodemailer");
const app = express();
const PORT = 1111;
const allowedOrigin = "http://localhost:3000";
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);
app.use(
  cors({
    origin: allowedOrigin,
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/infocampus");
const db = mongoose.connection;
db.on("error", (error) => console.error("Error in DB connection:", error));
db.on("open", () => console.log("Connected to MongoDB"));
// app.get("/", (req, res) => {
//   res.send("abc");
// });
// app.get("/one", (req, res) => {
//   const list = ["water", "milk", "sugar"];
//   res.send(list);
// });
// app.get("/two", (req, res) => {
//   const obj = [{ num: "1", alpha: "a" }];
//   res.send(obj);
// });
// app.get("/customer", (req, res) => {
//   const allCustomers = [
//     { city: "banglore", userList: ["Alex", "Blex", "clex"] },
//     { city: "chennai", userList: ["dlex", "elex", "flex"] },
//     { city: "hyderabad", userList: ["glex", "hlex", "ilex", "jlex"] },
//   ];
//   res.send(allCustomers);
// });
// app.get("/messages", (req, res) => {
//   fs.readFile("message.txt", (error, fileData) => {
//     if (error) {
//       return res.send("error");
//     }
//     const msgArray = fileData.toString().split("#");
//     msgArray.pop();
//     res.send(msgArray);
//   });
// });
// app.post("/savefile", (req, res) => {
//   const message = req.body.newmessage + "#\n";
//   fs.appendFile("message.txt", message, (error) => {
//     if (error) {
//       res.send("error");
//     } else {
//       res.send("saved");
//     }
//   });
// });
// app.post("/saveemail", (req, res) => {
//   const { newmessage, sub, email } = req.body;
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "bhupathikonduru@gmail.com",
//       pass: "lylb nozq ueej eogh",
//     },
//   });
//   const mailOptions = {
//     from: "bhupathikonduru@gmail.com",
//     to: email,
//     subject: sub,
//     text: newmessage,
//   };
//   transporter.sendMail(mailOptions, (error) => {
//     if (error) {
//       res.json({ status: "FAIL", message: "fail" });
//     } else {
//       res.json({ status: "PASS", message: "pass" });
//     }
//   });
// });
// const UserApi = require("./userApi");
// app.use("/manageUser", UserApi);
// const Login = require("./loginApi");
// app.use("/auth", Login);
// const imageApi = require("./imageapi");
// app.use("/uploadimage", imageApi);
app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});
