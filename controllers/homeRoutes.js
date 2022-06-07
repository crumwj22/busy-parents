const router = require('express').Router();
const { User, Rider, Driver } = require('../models');
const withAuth = require('../utils/auth');

// // Prevent non logged in users from viewing the homepage
// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     const users = userData.map((project) => project.get({ plain: true }));

//     res.render('homepage', {
//       users,
//       // Pass the logged in flag to the template
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/signup", (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.render("members");
  }
  res.render("signup");
});

router.get("/", (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.render("members");
  }
  // let them still view homepage even if not logged in
  res.render("members");
  // res.render("login");
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route

  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

//THIS ROUTE DOESNT WORK
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

//renders homepage, limits posts to 10
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      limit: 10,
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
