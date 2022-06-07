const router = require('express').Router();
const { User, Rider, Driver } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const user = userData.map((User) => User.get({ plain: true }));

    res.render('homepage', {
      user,
      // TODO: Add a comment describing the functionality of this property
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // TODO: Add a comment describing the functionality of this if statement
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// check to see if users logged in, if not logged in prompt the user to login
// router.get('/', async (req, res) => {
//   try {
//     // Get all projects and JOIN with user data
//     const userData = await User.findAll({});

//     // Serialize data so the template can read it
//     const user = userData.map((user) => user.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('login');
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/user/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {});

    const user = userData.get({ plain: true });

    res.render('user', {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
// need to add driver and rider
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

// //Create a new Blog Post
// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newUser = await User.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });
//     res.status(200).json(newUser);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });
// //Edit a Blog Post
// router.put('/:id', withAuth, (req, res) => {
//   User.update(
//     {
//       post_content: req.body.post_content,
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//     .then((dbUserData) => {
//       if (!dbUserData) {
//         res.status(404).json({ message: 'No User found with this id' });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });
// //Delete a Blog Post
// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const UserData = await User.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });
//     if (!UserData) {
//       res.status(404).json({ message: 'No User found with this id!' });
//       return;
//     }
//     res.status(200).json(UserData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
