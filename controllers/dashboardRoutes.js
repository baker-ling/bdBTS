const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Require authentication for all dashboard related actions
router.use(withAuth);

// dashboard route
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({where: { user_id: req.session.user_id }});
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts });
  } catch (err) {
    res.json(err);
  }
});

// new post page
router.get('/post', async (req, res) => {
  res.render('post_form');
});

// update post page
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }
    const post = postData.get({ plain: true });
    res.render('post_form', post);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
