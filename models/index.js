const mongoose = require("mongoose");

mongoose.connect('mongodb://retroinspect:1234@localhost:27017', {
    dbName: 'immersion',
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // DB 연결 됨
  console.log("DB connected!")
});

// 디버그 모드로 설정
mongoose.set('debug', true);
mongoose.Promise = Promise;

module.exports.Post = require("./post");
module.exports.User = require("./user");