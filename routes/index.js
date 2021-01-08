const FAILURE = process.env.CODE_FAILURE
const SUCCESS = process.env.CODE_SUCCESS

module.exports = function(app, Post, User)
{
  // GET ALL POSTS
  app.get('/posts', (req, res) => {
    Post.find((err, posts) => {
      if (err) return res.status(500).send({error: '데이터베이스에 접속할 수 없습니다'});
      res.json(posts);
    })
    res.end();
  });

  // GET SINGLE POST
  app.get('/posts/:post_id', (req, res) => {
      Post.findOne({_id: req.params.post_id}, (err, post) => {
        if (err) return res.status(500).json({error: err})
        if (!post) return res.status(404).json({error: '해당 포스트가 존재하지 않습니다'});
        res.json(post);
    })
  });

  // GET POST BY AUTHOR ID
  app.get('/posts/author/:author', function(req, res){
      Post.find({author: req.params.author}, {_id: 0, title: 1, desc: 1, created_at: 1},
        (err, posts) => {
          if (err) return res.status(500).json({error: err})
          if (posts.length == 0) return res.status(404).json({error: '해당 포스트가 존재하지 않습니다'})
          res.json(posts)
        })
      res.end();
  });

  // CREATE POST
  app.post('/posts', (req, res) => {
    var post = new Post()
    post.title = req.body.title
    post.author = req.body.author
    post.created_at = new Date(req.body.created_at)
    
    post.save( (err) => {
      if (err) {
        console.error(err)
        res.json({ resultCode: FAILURE, error: '포스트를 저장할 수 없습니다' })
      }
      res.json({ resultCode: SUCCESS, msg: '포스트를 저장했습니다' })
    })
  });

  // UPDATE THE POST
  app.put('/posts/:post_id', (req, res) => {
    Post.update({ _id: req.params.post_id }, { $set: req.body }, 
      (err, output) => {
        if (err) return res.status(500).send({error: '데이터베이스에 접속할 수 없습니다'});
        console.log(output);
        if(!output.n) return res.status(404).json({resultCode: FAILURE, error: '해당 포스트가 존재하지 않습니다'})
        res.json({ resultCode: SUCCESS, msg: '포스트를 수정했습니다' })
      })
  })

  // DELETE POST
  app.delete('/posts/:post_id', (req, res) => {
    Post.remove({ _id: req.params.post_id }, (err, output) => {
      if (err) return res.status(500).send({error: '데이터베이스에 접속할 수 없습니다'});
      res.status(204).end();
    })
  });

}