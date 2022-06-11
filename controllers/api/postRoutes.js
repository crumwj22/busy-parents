const router = require('express').Router();
const { Driver, User } = require('../../models');
const withAuth = require('../../utils/auth');

//GET all Driver Posts
router.get('/', (req, res) => {
  Driver.findAll({})
    .then((dbDriverData) => res.json(dbDriverData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
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
//Get a specific Driver Post
router.get('/users/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {});

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Edit a Driver's post
router.put('/:id', withAuth, (req, res) => {
  Driver.update(
    {
      post_content: req.body.post_content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbDriverData) => {
      if (!dbDriverData) {
        res.status(404).json({ message: 'No Driver Post found with this id' });
        return;
      }
      res.json(dbDriverData);
    })
    .catch((err) => {
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
