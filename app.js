const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const db = require("./models/");

app.use(bodyParser.json());

function success(res, payload) {
  return res.status(200).json(payload);
}

const postRouter = require("./routes/post")
const indexRouter = require("./routes/index")
const userRouter = require("./routes/userry")

app.use('/', indexRouter)
app.use('/posts', postRouter)
app.use('/user', userRouter)

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "요청(request)을 처리하는데 오류가 발생했습니다"
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});