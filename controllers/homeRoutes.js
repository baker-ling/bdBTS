const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// route for home page with all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({include: [User]});
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('all', { posts });
  } catch (err) {
    res.json(err);
  }
});

// route to get one post
router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id,
      {include: [User, Comment]});
    if (!postData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }
    const post = postData.get({ plain: true });
    res.render('post', post);
  } catch (err) {
    res.status(500).json(err);
  };
});


module.exports = router;
