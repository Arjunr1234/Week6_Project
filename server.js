const express = require("express");
const path = require("path");
const nocache = require("nocache");
const userauthRoute = require("./routes/userAuth");
const userfeatRoute = require("./routes/userfeat");
const adminfeatRoute = require("./routes/adminfeat");

const session = require("express-session");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/logSignApp ");

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
})

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB");
})

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
})

const app = express();
const PORT = 3002;

app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "1231fdsdfssg33435",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", nocache());

app.use("/", userauthRoute);
app.use("/userhome", userfeatRoute);
app.use("/adminhome", adminfeatRoute);

app.listen(PORT, () => {
  console.log("Server started on http://localhost:3002");
});
