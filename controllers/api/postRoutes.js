const router = require('express').Router();
const { Driver, User, Rider } = require('../../models');
const withAuth = require('../../utils/auth');

//GET all users-Driver's post
router.get('/', async (req, res) => {
  try {
    // Get all driver posts and JOIN with user data
    const userData = await User.findAll({});

    // Serialize data so the template can read it
    const user = userData.map((user) => user.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('signup', {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create a new-Driver's post
router.post('/', withAuth, async (req, res) => {
  try {
    const newDriver = await Driver.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newDriver);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Edit a Driver's post
router.put('/:id', withAuth, (req, res) => {
  Driver.update({
    post_content: req.body.post_content
  }, {
    where: {
      id: req.params.id
    }
  }).then(dbDriverData => {
    if (!dbDriverData) {
      res.status(404).json({ message: 'No Driver Post found with this id' });
      return;
    }
    res.json(dbDriverData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//Delete a Driver's post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const driverData = await Driver.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!driverData) {
      res.status(404).json({ message: 'No driver found with this id!' });
      return;
    }

    res.status(200).json(driverData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
