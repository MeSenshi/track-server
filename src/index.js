require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const trackRouts = require("./routes/trackRouts");
const requiredAuth = require("./middlewares/requireAuth");

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRouts);

mongoose.connect(
  "mongodb+srv://admin:admin@tracker.xdk16.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

app.get("/", requiredAuth, (req, res) => {
  res.send(`you email: ${req.user.email}`);
});

mongoose.connection.on("error", (err) => {
  console.error("Error connected to mongo", err);
});

app.listen(3001, () => {
  console.log("im on port 3000");
});
