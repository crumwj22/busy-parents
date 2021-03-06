const router = require("express").Router();
const { Driver } = require("../../models");

// get driver info for my-account addDriver
router.put("/:id", (req, res) => {
  Driver.update(
    { user_id: req.session.user_id },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbDriverData) => res.json(dbDriverData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/removeDriver/:id", (req, res) => {
  Driver.update(
    { user_id: null },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbDriverData) => res.json(dbDriverData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
