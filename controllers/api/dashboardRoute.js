const router = require('express').Router();
const { Driver, Comment } = require('../../models');

//GET all Driver Posts
router.get('/', (req, res) => {
  Driver.findAll({})
    .then((dbDriverData) => res.json(dbDriverData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get('/', async (req, res) => {
//   try {
//     // Get all Driver Posts
//     const driverData = await Driver.findAll({
//       include: [
//         {
//           model: Driver,
//           attributes: ['name'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const drivers = driverData.map((driver) => driver.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('dashboard', {
//       drivers,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//Get Comments
router.get('/', (req, res) => {
  Comment.findAll({})
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
