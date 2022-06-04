const router = require('express').Router();
const { Driver, User, Rider } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const userData = await User.findAll({
      //   include: [
      //     {
      //       model: Rider,
      //       attributes: ['name'],
      //     },
      //   ],
    });

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
    const newDriver = await Driver.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newDriver);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const driverData = await Driver.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!driverData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(driverData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
