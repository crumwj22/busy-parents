const router = require('express').Router();
const { User } = require('../../models');

//SIGN-UP
// create a new user
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.create(req.body);
    req.session.user_id = userData.id;
    req.session.logged_in = true;

    req.session.save(() => {
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log('error', err);
    res.status(400).json(err);
  }
});

// log in an existing user
// checks that it is an existing user with matching password
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    req.session.user_id = userData.id;
    req.session.logged_in = true;

    req.session.save(() => {
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// log out current user, destroy the session
router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  }
});

module.exports = router;