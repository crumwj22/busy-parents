const router = require('express').Router();
<<<<<<< HEAD
const { User, Rider, Driver } = require('../models');
=======
const { Driver, Comment } = require('../models');
>>>>>>> 9d232945c78a961adf91cffb8e61b6f66f3116d6
const withAuth = require('../utils/auth');

router.get('/signup', (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    console.log('test');
    res.render('members');
  }
  res.render('signup');
});

router.get('/', async (req, res) => {
  // If the user already has an account send them to the members page
  console.log(req.session.user_id);
  if (req.session.user_id) {
    try {
      const dbDriverData = await Driver.findAll({});
      console.log(dbDriverData);
      // Serialize user data so templates can read it
      const posts = dbDriverData.map((driverpost) =>
        driverpost.get({ plain: true })
      );

      // Pass serialized data into Handlebars.js template
      console.log('test');
      res.render('members', { posts });
      return;
    } catch (err) {
      res.status(500).json(err);
    }
  }
  res.render('login');
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  console.log('test1');
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  console.log('test');
  res.render('members');
});

router.get('/my-account', async (req, res) => {
  if (req.session.user_id) {
    try {
      const commentData = await Comment.findAll({});
      const comments = commentData.map((comments) =>
        comments.get({ plain: true })
      );

      res.render('my-account', { comments });
      return;
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

module.exports = router;