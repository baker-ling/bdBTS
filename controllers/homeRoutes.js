const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// route for home page with all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
      order: [['id', 'DESC']]
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.json(err);
  }
});

// route to get one post
router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id,
      {
        include: [
          {model: User},
          {model: Comment, include: [User]}
        ]
      });
    if (!postData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }
    const post = postData.get({ plain: true });
    res.render('post', {post, logged_in: req.session.logged_in});
  } catch (err) {
    res.status(500).json(err);
  };
});

//route for login page
router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/');
  }
  res.render('login');
});

module.exports = router;
