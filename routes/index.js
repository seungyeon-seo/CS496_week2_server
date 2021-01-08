var express = require('express');
var router = express.Router();

// router.use((err, req, res, next) => {
//   return res.status(err.status || 400).json({
//     status: err.status || 400,
//     message: err.message || "there was an error processing request"
//   });
// });

// router.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
// });

router.get('/', function (req, res) {
  res.redirect('/posts');
});

module.exports = router;