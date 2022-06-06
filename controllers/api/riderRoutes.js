const router = require('express').Router();
const { Driver, User, Rider } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const userData = await User.findAll({});

    // Serialize data so the template can read it
    const user = userData.map((user) => user.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newRider = await Rider.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRider);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const riderData = await Rider.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!riderData) {
      res.status(404).json({ message: 'No rider found with this id!' });
      return;
    }

    res.status(200).json(riderData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
