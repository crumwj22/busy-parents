const router = require('express').Router();
const { resolveConfig } = require('prettier');
const { User, Rider, Driver, Comment } = require('../models');
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
      console.log('test');
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
  res.render('my-account');
});
// where: {
//   user_id: req.session.user_id,
// },
// });
// console.log(Comment.findAll());
// const comments = commentData.map((comments) => comments.get({ plain: true }));
// If the user is already logged in, redirect the request to another route

// if (req.session.logged_in) {
//   res.redirect('/dashboard');
//   return;
// }
//   console.log('test');
//   res.render('my-account', comments);
// });

// route doesnt work
// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;
