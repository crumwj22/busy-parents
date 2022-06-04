const router = require('express').Router();
const { Driver } = require('../../models');
const withAuth = require('../../utils/auth');

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
