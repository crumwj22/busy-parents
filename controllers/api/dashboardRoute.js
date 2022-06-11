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

//Get Comments
router.get('/', (req, res) => {
  Comment.findAll({})
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// If a user sends data to add a new character...
router.post("/api/new", (req, res) => {
  // Take the request...
  const driver = req.body;

  // Create a routeName

  // Using a RegEx Pattern to remove spaces from character.name
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  const routeName = driver.name.replace(/\s+/g, "").toLowerCase();

  // Then add the character to the database using sequelize
  db.Driver.create({
    routeName: routeName,
    name: pet.name,
    pickup_Location: Driver.pickup_Location,
    dropoff_Location: Driver.dropoff_Location,
    date_created: Driver.date_created,
    availability: Driver.availability,
    user_id: Driver.user_id,
  }).catch(err => {
    res.status(401).json(err);
  });
});

router.get("/dashboard", (req, res) => {
  db.Driver.findAll({}).then(results => {
    res.json(results);
  });
});



module.exports = router;
