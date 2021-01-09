// dependency 불러오기
const express = require("express");
const bodyParser = require("body-parser");
const env = require('dotenv')

// env 사용
env.config()

const app = express();
const db = require("./models/");

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
const PORT = process.env.PORT || 3000;

// [CONFIGURE ROUTER]
var authRouter = require('./routes/user')(app)
// var router = require('./routes')(app, db.Post, db.User)

// [RUN SERVER]
var server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});