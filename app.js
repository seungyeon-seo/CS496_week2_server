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

// [CONFIGURE APP TO USE Static File Service]
app.use(express.static('public'))


// [CONFIGURE SERVER PORT]
const PORT = process.env.PORT || 3000;

// [CONFIGURE ROUTER]
// TODO move to index router
var authRouter = require('./routes/user')(app)
var imageRouter = require('./routes/image')(app)
var groupRouter = require('./routes/group')(app)
var contactRouter = require('./routes/contact')(app)

// [RUN SERVER]
var server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});