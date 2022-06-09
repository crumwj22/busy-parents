// const router = require('express').Router();
// const { User, Rider, Driver } = require('../models');
// const withAuth = require('../utils/auth');

// // check to see if users logged in, if not logged in prompt the user to login
// router.get('/', async (req, res) => {
//   try {
//     // Get all projects and JOIN with user data
//     const userData = await User.findAll({});

//     // Serialize data so the template can read it
//     const user = userData.map((user) => user.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage', {
//       user,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/user/:id', async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.params.id, {});

//     const user = userData.get({ plain: true });

//     res.render('user', {
//       ...user,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Use withAuth middleware to prevent access to route
// // need to add driver and rider
// router.get('/rider', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await Rider.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: User }],
//     });

//     const rider = riderData.get({ plain: true });

//     res.render('profile', {
//       ...rider,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/driver', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await Driver.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: User }],
//     });

//     const driver = driverData.get({ plain: true });

//     res.render('profile', {
//       ...driver,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route

//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });

// module.exports = router;
