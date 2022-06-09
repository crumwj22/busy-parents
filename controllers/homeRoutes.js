const router = require('express').Router();
const { User, Rider, Driver } = require('../models');
const withAuth = require('../utils/auth');

router.get('/signup', (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.render('members');
  }
  res.render('signup');
});

router.get('/', async (req, res) => {
  // If the user already has an account send them to the members page
  // if (req.user) {
  try {
    const dbDriverData = await Driver.findAll({});
    console.log(dbDriverData);
    // Serialize user data so templates can read it
    const posts = dbDriverData.map((driverpost) =>
      driverpost.get({ plain: true })
    );

    // Pass serialized data into Handlebars.js template
    res.render('members', { posts });
  } catch (err) {
    //   res.status(500).json(err);
    // }
  }
  res.render('login');
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route

  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('members');
});

//route doesnt work
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
