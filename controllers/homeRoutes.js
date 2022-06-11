const router = require('express').Router();
const { Driver, Comment } = require('../models');
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

  if (req.session.logged_in) {
    res.render('members');
    return;
  }

  res.render('login');
});

// router.get('/my-account', async (req, res) => {
//   if (req.session.user_id) {
//     try {
//       const commentData = await Comment.findAll({});
//       //Issue
//       console.log(commentData);
//       const comments = commentData.map((comments) =>
//         comments.get({ plain: true })
//       );

//       res.render('my-account', { comments });
//       return;
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// });
router.get('/my-account', async (req, res) => {
  // Let the user in of they are already logged in. If Else, redirect the request login route.

  if (req.session.logged_in) {
    res.redirect('members');
    return;
  }

  res.render('login');
});

module.exports = router;