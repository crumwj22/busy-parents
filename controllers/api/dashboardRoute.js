const router = require('express').Router();
const { User } = require('../../models');
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
